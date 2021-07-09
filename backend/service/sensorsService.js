const SensorObject = require('../model/SensorObject');
const persist = require('../persistence/sensorsPersistence');

module.exports.listSensors = function(page, pageSize, retorno, erro) {
    persist.listSensors(page, pageSize, (sensorsList) => {
        sensorsList.forEach(sensor => {
            sensor = SensorObject.parse(sensor);
        });
        retorno(sensorsList);
    }, erro);
}

module.exports.getSensor = function(id, retorno, erro) {
    persist.getSensor(id, (sensor) => {
        if (sensor) {
            sensor = new SensorObject(sensor.id, sensor.name);
        }
        retorno(sensor);
    }, erro);
}