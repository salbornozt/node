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

    async function list(pageNumber) {
        console.log('pgd '+pageNumber);

        
        let lengthResult = await injectedStore.countProcesos();
        let length = parseInt(lengthResult[0].count);
        let pageSize =  10;
        let page = parseInt(pageNumber);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
        let lastPage =Math.max(Math.round(length/pageSize), 1);
        let nextPage = (page + 1);
        let end =Math.min((pageSize * nextPage), length);
        let begin = page * pageSize;
        console.log((pageSize * (page + 1))+' '+pageSize+' '+nextPage+' peprpep');

       
       
        let cmpReq = []
        let cmpLlenos = []
        let porcentajes = []

        let listaProcesos = await injectedStore.listProcesos(begin + 1,end);

        let listCodProcesos = await injectedStore.listProcesos(begin + 1,end);

        let listaSeguros = await injectedStore.listSeguros();



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

        

        /*console.log(cmpLlenos);
        console.log(cmpReq);      
        console.log(porcentajes); 
        console.log(listaProcesos)*/
        let results = {
            pagination : {
                length :  length,
                size : pageSize,
                page : page,
                lastPage : lastPage,
                startIndex : begin,
                endIndex : end - 1
            },
            process : listaProcesos
        }


        return results;
    }

    async function getResume(){
        return injectedStore.listProcesosPorVencerce();
    }

    async function get(id) {
        console.log('myID '+id);

        let proceso = await injectedStore.getProcesoById(id);
        let camposReq = await injectedStore.getNumeroCamposSeguro(proceso.cod_seguro)
        let camposllenos = await injectedStore.getNCamposListosProceso(proceso.cod_proceso);
        let porcj = camposllenos/camposReq.length;                     
        proceso.porcentaje=porcj.toFixed(2); 

        let results = {
            category : "abierto",
            proceso : proceso,
            id : "3",
            progress :  {
                completed : 3,
                currentStep : proceso.cod_status
            },
            steps :[
                {
                    order   : 0,
                    title   : 'Resumen',
                    subtitle: 'Vista general del proceso',
                    content : ''
                },
                {
                    order   : 1,
                    title   : 'Iniciación',
                    subtitle: 'Información ',
                    content : ''
                },
                {
                    order   : 2,
                    title   : 'Cotización',
                    subtitle: 'How to create a basic Firebase project and how to run it locally',
                    content : ''
                },
                {
                    order   : 3,
                    title   : 'Recabación de los documentos',
                    subtitle: 'How to build, push and run the project remotely',
                    content : ''
                },
                {
                    order   : 4,
                    title   : 'Seguimiento',
                    subtitle: 'Introducing the Functions and Functions Directory',
                    content : ''
                }
            ],
            totalSteps : 5
        }
        return results;
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

    async function getPannelData(){
        let procesoActual = await injectedStore.countProcesosMesActual();
        let procesoPasado = await injectedStore.countProcesosMesPasado();
        let cotiActual = await injectedStore.countCotizacionesMesActual();
        let cotiPasado = await injectedStore.countCotizacionesMesPasado();
        let seguiActual = await injectedStore.countSeguimientoMesActual();
        let seguiPasado = await injectedStore.countSeguimientoMesPasado();
        let clienteActual = await injectedStore.countClientesMesActual();
        let clientePasado = await injectedStore.countClientesMesPasado();
        const result = {
            proceso_actual : procesoActual,
            proceso_pasado : procesoPasado,
            cotizacion_actual : cotiActual,
            cotizacion_pasado : cotiPasado,
            seguimiento_actual : seguiActual,
            seguimiento_pasado : seguiPasado,
            clientes_actual : clienteActual,
            clientes_pasado : clientePasado
        }

        return result;
    }

    async function updateStatus(body){
        return injectedStore.updateStatus(body.cod_status, body.cod_proceso);

    }

    return {
        list,
        insert,
        update,
        remove,
        search,
        get,
        getResume,
        getPannelData,
        updateStatus
    }

}
