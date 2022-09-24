const jwt = require('jsonwebtoken');
const { Error } = require('../network/response');
const error = require('../utils/error')
function signUser(user) {
    return jwt.sign(user, process.env.TOKEN_KEY,{expiresIn: "14m"});
}

function refreshToken(user) {
    return jwt.sign(user, process.env.TOKEN_REFRESH_KEY,{expiresIn: "30d"});
}


function verify(req) {
    console.log('hola');
    let authorization = req.header('authorization') || '';
    console.log('sad ' + authorization);

    if (authorization.includes('Bearer')) {
        try {
            let token = authorization.replace('Bearer ', '');
            return jwt.verify(token, 'mykey');
        } catch (err) {
            throw error('Jwt Invalido', 401)
        }
    } else {
        throw error('you need a token', 401);
    }
}


module.exports = {
    signUser,
    verify,
    refreshToken
}