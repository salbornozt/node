const bodyParser = require('body-parser');
var { nanoid } = require('nanoid');
const auth = require('../auth')
const bcrypt = require('bcrypt');
const { listProcesos } = require('../../../store/postgres');
const { login } = require('../auth');

module.exports = function (injectedStore) {
    if (!injectedStore) {
        throw new Error('Db error');
    }

    async function list() {

        let listaProcesos = await injectedStore.listProcesos();

        let listCodProcesos = await injectedStore.getAllCodProcesos();

        let listaSeguros = await injectedStore.listSeguros();
       
        let cmpReq = []
        let cmpLlenos = []
        let porcentajes = []


        for (let index = 0; index < listaSeguros.length; index++) {
            let camposReq = await injectedStore.getNumeroCamposSeguro(listaSeguros[index].cod_seguro)
            cmpReq.push(camposReq.length);            
        }

        for (let index = 0; index < listaProcesos.length; index++) {               
            
            let camposllenos = await injectedStore.getNCamposListosProceso(listaProcesos[index].cod_proceso);
                      
            cmpLlenos.push(Number(camposllenos));
            
        } 

        for (let x = 0; x < listCodProcesos.length; x++) {
            let a = cmpLlenos[x];
            
            for (let y = 0; y < listaSeguros.length; y++) {                               
                let b = cmpReq[y];                               
                if (listCodProcesos[x].cod_seguro==listaSeguros[y].cod_seguro) {                     
                    let porcj = a/b;
                    porcentajes.push(porcj);  
                         
                    listaProcesos[x].porcentaje=porcj.toFixed(2);             
                }
                
            }            
        }

        

        console.log(cmpLlenos);
        console.log(cmpReq);      
        console.log(porcentajes); 
        console.log(listaProcesos)


        return listaProcesos;
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
    async function search(key){
        return injectedStore.searchProcesos(key);
    }

    return {
        list,
        insert,
        update,
        remove,
        search,
        get
    }

}
