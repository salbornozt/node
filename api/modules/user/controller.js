const bodyParser = require('body-parser');
var { nanoid } = require('nanoid');
const auth = require('../auth')
const bcrypt = require('bcrypt');

module.exports = function(injectedStore) {
    if (!injectedStore) {
        throw new Error('Db error');
    }

    async function list() {

        return injectedStore.list();
    }

    async function get(id) {
        return injectedStore.get(id);
    }

    async function insert(body) {
        let user = {
            id: nanoid(),
            name: body.name,
            lastname: body.lastname,
            email: body.email,
            document: body.document
        }
        if (body.password) {
            const pss = await bcrypt.hash(body.password, 6);
            await auth.insert({
                user_id: user.id,
                email: user.email,
                password: pss
            })
        }
        console.log(user);

        return injectedStore.insert(user);
    }

    async function update(body) {
        let user = {
            id: body.id,
            name: body.name,
            lastname: body.lastname,
            email: body.email,
            document: body.document
        }

        return injectedStore.update(user);

    }
    async function remove(id) {
        return injectedStore.removeUser(id);
    }

    return {
        list,
        insert,
        update,
        remove,
        get
    }

}