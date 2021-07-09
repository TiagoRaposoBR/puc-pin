const db = require('../database/database-driver');

module.exports.listTelemetry = function (page, pageSize, sucesso, erro) {
    db.executeQuery("SELECT * FROM telemetry ORDER BY date_time ASC LIMIT "+pageSize+" OFFSET "+(page * pageSize), (rows) => {
        sucesso(rows);
    }, erro);
}