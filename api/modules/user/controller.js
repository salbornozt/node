const bodyParser = require('body-parser');
var { nanoid } = require('nanoid');
const auth = require('../auth')
const bcrypt = require('bcrypt');

module.exports = function (injectedStore) {
    if (!injectedStore) {
        throw new Error('Db error');
    }

    async function list() {

        return injectedStore.list();
    }

    async function get(id) {
        return injectedStore.get(id);
    }

    async function getEmpleadoById(id) {
        return injectedStore.getEmpleadoById(id);
    }

    async function getEmpleados() {
        return injectedStore.getEmpleados();
    }

    async function insertEmpleadoById() {
        let result = await injectedStore.insertEmpleadoById();
        let email = "empleado@gmail.com";
        let password = "1234";        
        const pss = await bcrypt.hash(password, 6);
        await auth.insert({
            user_id: result.cod_usuario,
            email: email,
            password: pss
        });
        

        return result;
    }

    async function insert(body) {
        let user = {
            name: body.name,
            user_type: body.user_type,
            lastname: body.lastname,
            document: body.document
        }
        const userInsertResult = await injectedStore.insertUser(user);
        console.log("inserting : " + userInsertResult)
        if (body.password) {
            const pss = await bcrypt.hash(body.password, 6);
            await auth.insert({
                user_id: userInsertResult.cod_usuario,
                email: body.email,
                password: pss
            })
        }
        console.log(user);

        return userInsertResult;
    }

    async function update(body) {
        console.log(body);
        let userBody = body.user;
        let usuario = {
            id: userBody.cod_usuario,
            name: userBody.nom_usuario,
            lastname: userBody.apellido_usuario,
            email: userBody.email,
            user_type: userBody.tipo_usuario,
            document: userBody.documento,
            mobile: userBody.celular
        }

        return injectedStore.updateUser(usuario);

    }
    async function remove(id) {
        return injectedStore.removeUser(id);
    }

    return {
        list,
        insert,
        update,
        remove,
        get,
        getEmpleados,
        getEmpleadoById,
        insertEmpleadoById
    }

}