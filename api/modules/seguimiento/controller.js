
module.exports = function(injectedStore) {
    if (!injectedStore) {
        throw new Error('Db error');
    }

    async function list() {

        return injectedStore.listProducto();
    }

    async function get(id) {
        console.log('listado por '+id);
        return injectedStore.getPolizaByProceso(id);
    }


    async function insert(body) {
        console.log(body.cod_proceso);
        const seguimiento = {
            cod_proceso: body.cod_proceso
        }
        const insertResult = await injectedStore.insertSeguimiento(seguimiento);
        const bodyResult ={
            cod_seguimiento :insertResult.cod_seguimiento
        }
        if(insertResult){
            const poliza = {
                cod_seguimiento : insertResult.cod_seguimiento,
                fecha_creada:  new Date().toLocaleDateString('en-US'),
                fecha_expedicion: body.fecha_expedicion,
                fecha_vigencia_hasta: body.fecha_vigencia_hasta,
                fecha_vigencia_desde: body.fecha_vigencia_desde,
                link : body.link,
                cod_compania : body.cod_compania,
                cod_ramo : body.cod_ramo,
                cod_producto : body.cod_producto,
                numero_poliza : body.numero_poliza,
                valor_total : body.valor_total
            }
            console.log(poliza);
            const polizaResult = await injectedStore.insertPoliza(poliza);
            bodyResult.cod_poliza = polizaResult.cod_poliza;
        }
        
        return bodyResult;
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
