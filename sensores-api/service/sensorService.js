const TokenData = require('../model/TokenData');
const auth = require('../security/auth');
const persist = require('../persistence/sensorPersistence');

module.exports.createSensor = function(sensor, retorno, erro) {
    persist.createSensor(sensor, (id) => {
        this.getNewToken(id, (newToken) => {
            retorno(TokenData.parse(newToken));
        });
    }, erro);
}

module.exports.getNewToken = function(id, retorno, erro) {
    const tokenData = auth.createToken();

    persist.saveToken(id, tokenData.token, tokenData.expires, () => {
        retorno(new TokenData(id, tokenData.token, tokenData.expires));
    }, erro);
}

module.exports.getExpiresByToken = function(token, retorno, erro) {
    persist.getExpiresByToken(token, retorno, erro);
}

module.exports.isAdminToken = function(token, retorno, erro) {
    persist.isAdminToken(token, retorno, erro);
}