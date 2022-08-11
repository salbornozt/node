const bodyParser = require('body-parser');
var { nanoid } = require('nanoid');
const auth = require('../auth')
const bcrypt = require('bcrypt');

module.exports = function(injectedStore) {
    if (!injectedStore) {
        throw new Error('Db error');
    }

    async function listRelatives(id) {

        return injectedStore.listRelatives(id);
    }

    async function deleteRelatives(){
        return injectedStore.deleteRelatives();
    }
    
    async function updateRelative(relative) {
    
        injectedStore.updateRelatives1(relative);
        injectedStore.updateRelatives2(relative);
        injectedStore.updateRelatives3(relative);
    }


    async function insertRelative(body) {
        console.log(body.cod_cliente+"cliente");
        let pariente = {
            cod_cliente: body.cod_cliente,
            nom_pariente : body.nom_pariente,
            apellido_pariente: body.apellido_pariente,
            telefono_pariente: body.telefono_pariente,
            //relacion: body.relacion
        }
        return injectedStore.insertRelatives(pariente);
    }



    return {
        listRelatives,
        //listTipoSeguro,
        insertRelative,
        updateRelative,
        deleteRelatives
        // update,
        // remove,
        //get
    }

}
