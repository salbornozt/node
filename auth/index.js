const jwt = require('jsonwebtoken');
const { Error } = require('../network/response');

function signUser(user) {
    return jwt.sign(user, 'mykey');
}


function verify(req) {
    console.log('hola');
    let authorization = req.header('authorization') || '';
    console.log('sad ' + authorization);

    if (authorization.includes('Bearer')) {

        let token = authorization.replace('Bearer ', '');
        return jwt.verify(token, 'mykey');
    } else {
        throw new Error('you need a token');
    }
}


module.exports = {
    signUser,
    verify
}