const addToCache = require('../middleware/cacheRequests').add;
const service = require('../service/telemetryService');

module.exports.listTelemetry = function(req, res) {
    const page = req.query.page || 0;
    const pageSize = req.query.pageSize || 10;

    service.listTelemetry(page, pageSize, (retorno) => {
        addToCache(req, retorno);
        res.status(200).json(retorno);
    }, (status, mensagem) => {
        res.status(status).json(mensagem);
    });
}