const addToCache = require('../middleware/cacheRequests').add;
const service = require('../service/sensorsService');

module.exports.listSensors = function(req, res) {
    const page = req.query.page || 0;
    const pageSize = req.query.pageSize || 10;

    service.listSensors(page, pageSize, (retorno) => {
        addToCache(req, retorno);
        res.status(200).json(retorno);
    }, (status, mensagem) => {
        res.status(status).json(mensagem);
    });
}

module.exports.getSensor = function(req, res) {
    if (!req.id) {
        res.status(400).send('Envie o id na requisição');
    } else {
        service.getSensor(req.id, (retorno) => {
            if (retorno) {
                addToCache(req, retorno);
                res.status(200).json(retorno);
            } else {
                res.status(204).send('Sensor não encontrado');
            }
        });
    }
}