const TelemetryObject = require('../model/TelemetryObject');
const persist = require('../persistence/telemetryPersistence');

module.exports.listTelemetry = function(page, pageSize, retorno, erro) {
    persist.listTelemetry(page, pageSize, (telemetryList) => {
        telemetryList.forEach(telemetry => {
            telemetry = TelemetryObject.parse(telemetry);
        });
        retorno(telemetryList);
    }, erro);
}