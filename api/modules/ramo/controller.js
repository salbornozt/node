
module.exports = function(injectedStore) {
    if (!injectedStore) {
        throw new Error('Db error');
    }

    async function list() {

        return injectedStore.listRamo();
    }

    async function get(id) {
        return injectedStore.getRamoByCompany(id);
    }


    async function insert(body) {
        console.log(body.cod_proceso);
        let ramo = {
            nom_ramo: body.nom_ramo,
            cod_compania : body.cod_compania
        }
        return injectedStore.insertRamo(ramo);
    }

    async function update(body) {              
        let ramo = {
            nom_ramo: body.nom_ramo
        }
        return injectedStore.updateCompania(ramo);

    }
    async function remove(id) {
        //return injectedStore.deleteSeguro(id);
    }

    return {
        list,
        insert,
        update,
        remove,
        get
    }

}
