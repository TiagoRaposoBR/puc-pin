const NewSensor = require('../model/NewSensor');
const service = require('../service/sensorService');

module.exports.createSensor = function(req, res) {
    let sensor = NewSensor.parse(req.body);

    if (sensor == null) {
        res.status(400).json('Informações do usuário precisam estar no corpo da requisição');
    } else {
        service.createSensor(sensor, (retorno) => {
            res.status(201).json(retorno);
        }, (status, mensagem) => {
            res.status(status).json(mensagem);
        });
    }
}