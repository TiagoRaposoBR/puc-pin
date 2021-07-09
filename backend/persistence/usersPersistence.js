const db = require('../database/database-driver');
const dateFormat = require("dateformat");

module.exports.createUser = function(email, pass_word, sucesso, erro) {
    db.executeQuery("INSERT INTO users (email, pass_word) VALUES ('"
        + email + "', '"
        + pass_word + "')", (rows) => {
            sucesso();
        }, erro);
}

module.exports.saveToken = function(userId, token, expires, result, errorMessage) {
    db.executeQuery("UPDATE users SET access_token = '"+token+"', token_expire = '"
        +dateFormat(expires, 'yyyy-mm-dd HH:MM:ss')+"' WHERE id = "+userId, result, errorMessage);
}

module.exports.getUserByCredentials = function(email, pass_word, result, errorMessage) {
    db.executeQuery("SELECT * FROM users WHERE email LIKE '"+email+"' AND pass_word LIKE '"+pass_word+"'", (users) => {
        if (users && users.length == 1) {
            result(users[0]);
        } else {
            result(null);
        }
    }, errorMessage);
}

module.exports.getExpiresByToken = function(token, result, errorMessage) {
    db.executeQuery("SELECT token_expire FROM users WHERE access_token LIKE '"+token+"'", (queryResult) => {
        if (queryResult && queryResult.length == 1) {
            result(queryResult[0].token_expire);
        } else {
            result(null);
        }
    }, errorMessage);
}

module.exports.isAdminToken = function(token, result, errorMessage) {
    db.executeQuery("SELECT COUNT(id) FROM users WHERE access_token LIKE '"+token+"'", (queryResult) => {
        result(queryResult && queryResult.length == 1 && queryResult[0].count == 1);
    }, errorMessage);
}
