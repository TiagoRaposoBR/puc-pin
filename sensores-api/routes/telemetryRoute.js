const service = require('../service/telemetryService');

module.exports.addTelemetryData = function(req, res) {
    service.addTelemetryData(req.body, (newTokens) => {
        res.status(201).json(newTokens);
    }, (status, mensagem) => {
        res.status(status).json(mensagem);
    });
}
