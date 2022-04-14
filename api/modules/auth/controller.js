const auth = require('../../../auth/index');
const bcrypt = require('bcrypt');

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
                    return auth.signUser(data);
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

    async function insert(authData) {
        console.log(authData);

        return injectedStore.insertAuth(authData);
    }

    return {

        insert,
        login

    }

}