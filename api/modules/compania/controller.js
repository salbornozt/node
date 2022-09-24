
module.exports = function(injectedStore) {
    if (!injectedStore) {
        throw new Error('Db error');
    }

    async function list() {

        return injectedStore.listCompania();
    }

    async function get(id) {
        return injectedStore.getCompaniaById(id);
    }


    async function insert(body) {
        console.log(body.cod_proceso);
        let compania = {
            nom_compania: body.nom_compania,
            direccion_compania : body.direccion_compania
        }
        return injectedStore.insertCompania(compania);
    }

    async function update(body) {              
        let compania = {
            nom_compania: body.nom_compania
        }
        return injectedStore.updateCompania(compania);

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
