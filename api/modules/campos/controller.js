const bodyParser = require('body-parser');
var { nanoid } = require('nanoid');
const auth = require('../auth')
const bcrypt = require('bcrypt');

module.exports = function(injectedStore) {
    if (!injectedStore) {
        throw new Error('Db error');
    }

    async function list() {

        return injectedStore.listDocumentos();
    }

    async function get(id) {
        return injectedStore.getCamposPorSeguro(id);
    }


    async function insert(body) {
        console.log(body.nom_documento);
        let item = {
            nom_documento: body.nom_documento,
            cod_seguro : body.cod_seguro,
            obligatorio: body.obligatorio
        }
        return injectedStore.insertDocumento(item);
    }

    async function update(body) {
        console.log(body.nom_documento);        
        let documento = {
            nom_documento: body.nom_documento,
            cod_seguro: body.cod_seguro,
            obligatorio: body.obligatorio,
            id: body.id
        }
        return injectedStore.updateDocumento(documento);

    }
    async function remove(id) {
        return injectedStore.deleteDocumento(id);
    }

    return {
        list,
        insert,
        update,
        remove,
        get
    }

}
