const moment = require("moment");
const sendError = require("../model/ErrorResponse").sendErrorResponse;

const initialBudget = 100;
const timeQuant = 1;
const timeUnit = 'minute';
const connectionCache = {};

module.exports = function(req, res, next) {
    const conn = connectionCache[req.ip];

    if (!conn) {
        connectionCache[req.ip] = getNewBudget();
        next();
    
    } else {
        if (isExpired(conn.expires)) {
            connectionCache[req.ip] = getNewBudget();
            next();
        } else {
            conn.budget--;
            if (conn.budget > 0) {
                next();
            } else {
                sendError(res, 403, 'Excedeu o limite de conexões. O contador se reinicia em ' + getExpireSeconds(conn) + ' segundos');
            }
        }
    }
}

const getNewBudget = function() {
    return {
        budget: initialBudget,
        expires: moment().add(timeQuant, timeUnit).toISOString()
    };
}

const isExpired = function(expiresDate) {
    return moment(expiresDate).isBefore(moment());
}

const getExpireSeconds = function(conn) {
    return (moment(conn.expires).diff(moment()) / 1000).toFixed(0);
}