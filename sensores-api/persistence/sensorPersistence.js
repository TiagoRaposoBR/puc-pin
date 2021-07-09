const db = require('../database/database-driver');
const dateFormat = require("dateformat");

module.exports.createSensor = function(sensorData, sucesso, erro) {
    db.executeQuery("INSERT INTO sensors (latitude, longitude) VALUES ("
        + sensorData.latitude + ", "
        + sensorData.longitude + ") RETURNING id", (rows) => {
            if (rows && rows.length == 1) {
                sucesso(rows[0].id);
            } else {
                erro(500, 'Não conseguiu inserir usuário');
            }
        }, (errorMsg) => {
            erro(500, errorMsg);
        });
}

module.exports.saveToken = function(sensorId, token, expires, result, errorMessage) {
    db.executeQuery("UPDATE sensors SET access_token = '"+token+"', token_expire = '"
        +dateFormat(expires, 'yyyy-mm-dd HH:MM:ss')+"' WHERE id = "+sensorId, result, errorMessage);
}

module.exports.getExpiresByToken = function(token, result, errorMessage) {
    db.executeQuery("SELECT token_expire FROM sensors WHERE access_token LIKE '"+token+"'", (queryResult) => {
        if (queryResult && queryResult.length == 1) {
            result(queryResult[0].token_expire);
        } else {
            result(null);
        }
    }, errorMessage);
}

module.exports.isAdminToken = function(token, result, errorMessage) {
    db.executeQuery("SELECT COUNT(id) FROM sensors WHERE access_token LIKE '"+token+"'", (queryResult) => {
        result(queryResult && queryResult.length == 1 && queryResult[0].count == 1);
    }, errorMessage);
}
