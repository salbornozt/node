const bodyParser = require('body-parser');
var { nanoid } = require('nanoid');
const auth = require('../auth')
const bcrypt = require('bcrypt');

module.exports = function (injectedStore) {
    if (!injectedStore) {
        throw new Error('Db error');
    }

    async function list() {

        return injectedStore.listProcesos();
    }

    async function get(id) {
        return injectedStore.getSeguro(id);
    }


    async function insert(body) {
        console.log(body);
        let processResult = await injectedStore.insertProceso(body.proceso);
        let campos = body.campos;
        await campos.forEach(function (item, index) {
            item.cod_proceso = processResult.cod_proceso;
            injectedStore.insertAnexoProceso(item);
        });

        return processResult;
    }

    async function update(body) {
        let seguro = {
            cod_tipo_seguro: body.cod_tipo_seguro,
            vigencia: body.vigencia,
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
