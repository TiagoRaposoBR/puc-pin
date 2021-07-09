const UserCredentials = require('../model/UserCredentials');
const service = require('../service/usersService');

module.exports.createUser = function(req, res) {
    let user = UserCredentials.parse(req.body);

    if (user == null) {
        res.status(400).json('Email e password precisam estar no corpo da requisição');
    } else {
        service.createUser(user, () => {
            res.status(201).send('Usuário criado');
        }, (status, mensagem) => {
            res.status(status).json(mensagem);
        });
    }
}

module.exports.getToken = function(req, res) {
    const credentials = UserCredentials.parse(req.body);

    if (credentials == null) {
        res.status(400).json('Email e password precisam estar no corpo da requisição');
    } else {
        service.getToken(credentials, (retorno) => {
            res.status(200).json(retorno);
        }, (status, mensagem) => {
            res.status(status).json(mensagem);
        });
    }
}