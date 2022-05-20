const auth = require('../../../auth/index');
const bcrypt = require('bcrypt');
const errors = require('../../../utils/error')
const tokenList = {}

module.exports = function(injectedStore) {
    if (!injectedStore) {
        throw new Error('Db error');
    }

    async function login(body) {
        var email = body.email;
        var password = body.password;

        const data = await injectedStore.getUserByEmail(email);
        console.log(data.contrasena+'<-');
        if (data) {
            //return auth.signUser(data);
            
            return bcrypt.compare(password, data.contrasena).then((equal) => {

                if (equal) {
                    const token = auth.signUser(data);
                    const refreshToken = auth.refreshToken(data);
                    
                    const authResult = {
                        "status" : "Logged In",
                        "token" : token,
                        "refreshToken" : refreshToken
                    }
                    tokenList[refreshToken] = authResult;
                    return authResult
                } else {
                    throw new Error('User not found');
                }
            }).catch((err) => {
                console.error(err)
                throw new Error('User not found')
            })
        

        } else {
            throw new Error('User not found')
        }

    }
    async function refresh(body){
        console.log('Sup  '+body.refreshToken);
        const refreshToken = body.refreshToken;
        console.log(refreshToken);
        let formatedToken = refreshToken.replace('Bearer ', '');
        if((formatedToken) && (formatedToken in tokenList)){
            const user = body.user;
            const data = await injectedStore.getUserByEmail(user.email);
            if(data){
                const token = auth.signUser(data);
                const refreshResult = {
                    "status" : "Logged In",
                    "token" : token,
                    "refreshToken" : refreshToken
                }
                return refreshResult;
            }else{
                throw errors('Jwt Invalido', 401)
            }
            
        }else{
            throw errors('Invalid Request', 404);
        }
    }

    async function insert(authData) {
        console.log(authData);

        return injectedStore.insertAuth(authData);
    }

    return {

        insert,
        login, refresh

    }

}