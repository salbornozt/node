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
        if (data) {
            return bcrypt.compare(password, data.PASSWORD).then((equal) => {

                if (equal) {
                    return auth.signUser(data);
                } else {
                    throw new Error('User not found');
                }
            }).catch((err) => {
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