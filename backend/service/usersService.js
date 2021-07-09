const auth = require('../security/auth');
const persist = require('../persistence/usersPersistence');

module.exports.createUser = function(user, retorno, erro) {
    persist.createUser(user.email, user.pass_word, () => {
        retorno();
    }, erro);
}

module.exports.getToken = function(credentials, retorno, erro) {
    persist.getUserByCredentials(credentials.email, credentials.pass_word, (user) => {
        if (user) {
            const tokenData = auth.createToken();
        
            persist.saveToken(user.id, tokenData.token, tokenData.expires, () => {
                retorno(tokenData);
            }, erro);
        } else {
            erro(401, "Credenciais inválidas");
        }
    }, erro);
}

module.exports.getExpiresByToken = function(token, retorno, erro) {
    persist.getExpiresByToken(token, retorno, erro);
}

module.exports.isAdminToken = function(token, retorno, erro) {
    persist.isAdminToken(token, retorno, erro);
}