const crypto = require("crypto");
const moment = require("moment");
const sendError = require("../model/ErrorResponse").sendErrorResponse;

const expireQuant = 1;
const expireUnit = 'day';
const tokenCache = {};

module.exports.isAuthorized = function(req, res, next) {
    if (req.headers.authorization) {
        const splitAuth = req.headers.authorization.split(' ');
        if (splitAuth.length == 2 && splitAuth[0].toLowerCase() == 'basic') {
            const token = splitAuth[1];
            const expires = tokenCache[token];
            // Se tem no cache
            if (expires) {
                if (!isExpired(expires)) {
                    next();
                } else {
                    sendError(res, 401, 'Token expirado');
                }
            } else {
                // pegar token no banco
                require("../service/sensorService").getExpiresByToken(token, (expiresDb) => {
                    // se tem, achou no banco
                    if (expiresDb) {
                        if (!isExpired(expiresDb)) {
                            next();
                        } else {
                            sendError(res, 401, 'Token expirado');
                        }
                    } else {
                        sendError(res, 401, 'Token inválido');
                    }
                }, (erro) => {
                    sendError(res, 401, 'Token inválido');
                });
            }
        } else {
            sendError(res, 401, 'Cabeçalho authorization inválido (use Basic)');
        }
    } else {
        sendError(res, 401, 'Sem cabeçalho authorization');
    }
}


module.exports.isAdmin = function(req, res, next) {
    const adminToken = req.headers['admin'];
    if (adminToken) {
        require("../service/sensorService").isAdminToken(adminToken, (isAuthorized) => {
            if (isAuthorized) {
                next();
            } else {
                sendError(res, 401, 'Não autorizado');
            }
        });
    } else {
        sendError(res, 401, 'Não autorizado');
    }
}

/** encoding: 'hex' ou 'base64' */
module.exports.gerarChaveAleatoria = function(encoding) {
    const str = Math.random().toString(30).substr(2);
    const secret = Math.random().toString(29).substr(2);
    const md5Hasher = crypto.createHmac('md5', secret);
    return md5Hasher.update(str).digest(encoding);
}

module.exports.createToken = function() {
    const token = this.gerarChaveAleatoria('base64');
    const expires = moment().add(expireQuant, expireUnit).utc().toISOString();

    tokenCache[token] = expires;

    return {
        token: token,
        expires: expires
    };
}

const isExpired = function(tokenExpires) {
    return moment(tokenExpires).isBefore(moment().utc());
}