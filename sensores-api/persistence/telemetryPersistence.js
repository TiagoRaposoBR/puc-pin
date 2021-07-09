const db = require('../database/database-driver');

module.exports.addTelemetryData = function (telemetryData, sucesso, erro) {
    db.executeQuery("INSERT INTO telemetry (sensor_id, temperature, humidity, date_time) VALUES ("
        + telemetryData.id + ", "
        + telemetryData.temperature + ", "
        + telemetryData.humidity + ", '"
        + telemetryData.dateTime + "')", (rows) => {
        sucesso();
    }, erro);
}
