
module.exports = function(injectedStore) {
    if (!injectedStore) {
        throw new Error('Db error');
    }

    async function list() {

        return injectedStore.listProducto();
    }

    async function get(id) {
        console.log('listado por '+id);
        return injectedStore.listCotizacionPorProceso(id);
    }


    async function insert(body) {
        console.log(body.cod_proceso);
        let cotizacion = {
            cod_proceso: body.cod_proceso,
            cod_compania : body.cod_compania,
            cod_ramo : body.cod_ramo,
            cod_producto : body.cod_producto,
            numero_cotizacion : body.numero_cotizacion,
            fecha_creada : body.fecha_creada,
            valor : body.valor
        }
        return injectedStore.insertCotizacion(cotizacion);
    }

    async function update(body) {     
        console.log('que pista pa '+ body.numero_cotizacion);         
        let cotizacion = {
            cod_proceso: body.cod_proceso,
            cod_compania : body.cod_compania,
            cod_ramo : body.cod_ramo,
            cod_producto : body.cod_producto,
            numero_cotizacion : body.numero_cotizacion,
            fecha_creada : body.fecha_creada,
            valor : body.valor,
            cod_cotizacion : body.cod_cotizacion
        }
        return injectedStore.updateCotizacion(cotizacion);

    }
    async function remove(id) {
        return injectedStore.deleteCotizacion(id);
    }

    return {
        list,
        insert,
        update,
        remove,
        get
    }

}
