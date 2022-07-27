
module.exports = function(injectedStore) {
    if (!injectedStore) {
        throw new Error('Db error');
    }

    async function list() {

        return injectedStore.listProducto();
    }

    async function get(id) {
        return injectedStore.getProductoByRamo(id);
    }


    async function insert(body) {
        console.log(body.cod_proceso);
        let producto = {
            nom_producto: body.nom_producto,
            cod_ramo : body.cod_ramo
        }
        return injectedStore.insertProducto(producto);
    }

    async function update(body) {              
        let producto = {
            nom_producto: body.nom_producto
        }
        return injectedStore.updateProducto(producto);

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
