
module.exports.sendErrorResponse = function(res, status, message) {
    res.status(status).json({
        errorStatus: status,
        message: message
    });
}