const bodyParser = require('body-parser');
var { nanoid } = require('nanoid');
const auth = require('../auth')
const bcrypt = require('bcrypt');

module.exports = function (injectedStore) {
    if (!injectedStore) {
        throw new Error('Db error');
    }

    async function list() {

        return injectedStore.listClients();
    }

    async function get(id) {
        let customer = await injectedStore.getClient(id);
        let emails = await injectedStore.getClientEmails(customer.cod_cliente);
        let phones = await injectedStore.getClientPhones(customer.cod_cliente);
        customer.correos = emails;
        customer.celulares = phones;
        return customer
    }

    async function insert(body) {
        let customer = {
            nom_cliente: body.nom_cliente,
            ocupacion: body.ocupacion,
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
        console.log("inserting : " + customerInsertResult)
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

    async function insertToGetId() {

        return injectedStore.insertClientToGetId();
    }

    async function update(body) {
        console.log(body);
        let contactBody = body.contact;
        let cod_cliente = body.id;
        let customer = {
            nom_cliente: contactBody.nom_cliente,
            ocupacion: contactBody.ocupacion,
            ciudad: contactBody.ciudad,
            direccion: contactBody.direccion,
            cod_naturaleza: contactBody.cod_naturaleza,
            cod_tipo_cliente: contactBody.cod_tipo_cliente,
            sexo: contactBody.sexo,
            birth_date: contactBody.birth_date,
            company: contactBody.company,
            cedula: contactBody.cedula
        };
        let customerEmails = contactBody.correos;
        let customerPhones = contactBody.celulares;
        let updateResult = await injectedStore.updateClient(cod_cliente, customer);
        if(customerEmails.length > 0){
            injectedStore.deleteEmails(cod_cliente);
            customerEmails.forEach(function (item, index) {
                item.cod_cliente = cod_cliente;
                injectedStore.insertEmails(item);
            });
        }
        if(customerPhones.length > 0){
            injectedStore.deleteCelulares(cod_cliente);
            customerPhones.forEach(function (item, index) {
                item.cod_cliente = cod_cliente;
                injectedStore.insertCelulares(item);
            });
        }
        let customerUpdated = await this.get(cod_cliente);
        


        return customerUpdated;

    }
    async function remove(id) {
        return injectedStore.removeClient(id);
    }

    return {
        list,
        insert,
        update,
        remove,
        get, insertToGetId
    }

}
