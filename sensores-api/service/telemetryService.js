const TelemetryObject = require('../model/TelemetryObject');
const persist = require('../persistence/telemetryPersistence');
const sensorService = require('./sensorService');

module.exports.addTelemetryData = function(reqBody, retorno, erro) {
    if (!Array.isArray(reqBody)) {
        reqBody = [reqBody];
    }
    
    const tokensList = [];

    reqBody.forEach(telemetry => {
        let data;
        try {
            data = new TelemetryObject(telemetry);
        } catch (e) {
            erro(400, e.message);
        }
        persist.addTelemetryData(data, () => {
            sensorService.getNewToken(data.id, (newToken) => {
                tokensList.push(newToken);
                if (tokensList.length >= reqBody.length) {
                    retorno(tokensList);
                }
            });
        }, erro);
    });
}
