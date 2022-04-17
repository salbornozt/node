const bodyParser = require('body-parser');
var { nanoid } = require('nanoid');
const auth = require('../auth')
const bcrypt = require('bcrypt');

module.exports = function(injectedStore) {
    if (!injectedStore) {
        throw new Error('Db error');
    }

    async function list() {

        return injectedStore.getNaturaleza();
    }

    async function get(id) {
        
        return injectedStore.getNaturalezaById(id);
    }

    async function insert(body) {
        let customer = {
            nom_cliente: body.nom_cliente,
            ocupacion : body.ocupacion,
            ciudad: body.ciudad,
            direccion: body.direccion,
            cod_naturaleza: body.cod_naturaleza,
            cod_tipo_cliente: body.cod_tipo_cliente,
            sexo: body.sexo,
            birth_date: body.birth_date,
            company: body.company,
            cedula: body.cedula
        }
        const customerInsertResult = await injectedStore.insertClient(customer);
        console.log("inserting : "+customerInsertResult)
        if (body.correos) {
            let correos = body.correos;
            await correos.forEach(function (item, index) {
                item.cod_cliente = customerInsertResult.cod_cliente;
                 injectedStore.insertEmails(item);
              });
            
            
        }

        if (body.celulares) {
            let celulares = body.celulares;
            await celulares.forEach(function (item, index) {
                item.cod_cliente = customerInsertResult.cod_cliente;
                injectedStore.insertCelulares(item);
              });
            
            
        }
        

        return customerInsertResult;
    }

    async function update(body) {
        console.log(body);
        let userBody = body.user;
        let usuario = {
            id: userBody.cod_usuario,
            name: userBody.nom_usuario,
            lastname: userBody.apellido_usuario,
            email: userBody.email,
            user_type : userBody.tipo_usuario,   
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
        get
    }

}
