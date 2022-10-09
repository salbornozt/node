const XLSX = require('xlsx')
const auth = require('../../../auth/index');
const bcrypt = require('bcrypt');
const errors = require('../../../utils/error')
const tokenList = {}

module.exports = function(injectedStore) {
    if (!injectedStore) {
        throw new Error('Db error');
    }

    async function list() {
        const clientes = await injectedStore.listClientsExport();


        for (let index = 0; index < clientes.length; index++) {
            //let camposReq = await injectedStore.getNumeroCamposSeguro(listaSeguros[index].cod_seguro)
            //cmpReq.push(camposReq.length);     
            let item = clientes[index]       
            let emails = await injectedStore.getClientEmails(item.cod_cliente);
            let phones = await injectedStore.getClientPhones(item.cod_cliente);
            let relative = await injectedStore.listRelatives(item.cod_cliente);

            item.correos = emails;
            item.celulares = phones;    
            item.relative = relative;    

        }

        
        console.log(clientes);

        
        return clientes

    }

    
   
    return {

        list

    }

}