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
        return injectedStore.getSeguro(id);
    }


    async function insert(body) {
        console.log(body.cod_tipo_seguro);
        let seguro = {
            cod_tipo_seguro: body.cod_tipo_seguro,
            vigencia : body.vigencia,
            cod_compania: body.cod_compania,
            precio: body.precio
        }
        return injectedStore.insertSeguro(seguro);
    }

    async function update(body) {              
        let seguro = {
            cod_tipo_seguro: body.cod_tipo_seguro,
            vigencia : body.vigencia,
            cod_compania: body.cod_compania,
            precio: body.precio,
            id: body.id
        }
        return injectedStore.updateSeguro(seguro);

    }
    async function remove(id) {
        return injectedStore.deleteSeguro(id);
    }

    return {
        list,
        insert,
        update,
        remove,
        get
    }

}
