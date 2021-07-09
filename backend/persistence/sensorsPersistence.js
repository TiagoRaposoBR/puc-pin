const db = require('../database/database-driver');
const baseConstructor = "id, latitude, longitude";

module.exports.listSensors = function (page, pageSize, sucesso, erro) {
    db.executeQuery("SELECT "+baseConstructor+" FROM sensors LIMIT "+pageSize+" OFFSET "+(page * pageSize), (rows) => {
        sucesso(rows);
    }, erro);
}

module.exports.getSensor = function (id, sucesso, erro) {
    db.executeQuery("SELECT "+baseConstructor+" FROM sensors WHERE id = " + id, (rows) => {
        if (rows.length > 0) {
            sucesso(rows);
        } else {
            sucesso(undefined);
        }
    }, erro);
}