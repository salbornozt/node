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
        let email = "empleado"+result.cod_usuario+"@gmail.com";
        let password = "12345678";        
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
        console.log("entra antes del postgres")
        console.log(body);
        let contactBody = body.contact;
        let cod_usuario = body.cod_usuario;
        let empleado = {
            cod_usuario: contactBody.cod_usuario,
            email: contactBody.email,
            celular: contactBody.celular,
            nom_usuario: contactBody.nom_usuario,  
            apellido_usuario: contactBody.apellido_usuario
                              
        };
     
        

        await injectedStore.updateUser(empleado);

        await injectedStore.updateAuth(empleado);
       

        let customerUpdated = await this.get(cod_usuario);

        return customerUpdated;

    }
    async function updatePerfil(body) {
        console.log("entra antes del postgres")
        console.log(body);
        let contactBody = body.user;
        let cod_usuario = body.cod_usuario;
        let empleado = {
            cod_usuario: contactBody.cod_usuario,
            email: contactBody.email,
            celular: contactBody.celular,
            nom_usuario: contactBody.nom_usuario,  
            apellido_usuario: contactBody.apellido_usuario
                              
        };
     
        

        let updateResult = await injectedStore.updateUser(empleado);

        console.log('here');
        let authUpdateResult = await injectedStore.updateAuth(empleado);

        //let customerUpdated = await this.get(cod_usuario);

        return updateResult;

    }

    async function updatePassword(body){
        const mPss = body.req.password
        const user = body.req.cod_usuario
        const pss = await bcrypt.hash(mPss, 6);

        return auth.updatePassword(user,pss)
    }
    async function remove(id) {
        return injectedStore.removeUser(id);
    }


    return {
        list,
        insert,
        update,
        updatePerfil,
        remove,
        get,
        getEmpleados,
        getEmpleadoById,
        insertEmpleadoById,
        updatePassword
    }

}