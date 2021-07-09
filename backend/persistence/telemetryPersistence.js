const db = require('../database/database-driver');

module.exports.listTelemetry = function (page, pageSize, sucesso, erro) {
    db.executeQuery("SELECT * FROM telemetry LIMIT "+pageSize+" OFFSET "+(page * pageSize)+" ORDER BY date_time ASC", (rows) => {
        sucesso(rows);
    }, erro);
}