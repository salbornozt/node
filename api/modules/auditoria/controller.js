const bodyParser = require('body-parser');
var { nanoid } = require('nanoid');
const auth = require('../auth')
const bcrypt = require('bcrypt');

module.exports = function(injectedStore) {
    if (!injectedStore) {
        throw new Error('Db error');
    }

    async function listAud() {

        return injectedStore.listAud();
    }


    async function insertAud(body) {
        console.log("hola >>>");
        console.log(body);
              
        let nomCotizador = await injectedStore.getEmpAud(body.idEmpCotizacion);
        let nomAsigando = await injectedStore.getEmpAud(body.idEmpAsignado);
        console.log(">>>>>>>"+nomCotizador.nom_usuario);
        console.log(">>>>>>>"+nomAsigando.nom_usuario);

        let date = new Date();

        let aud = {
            id_cotizador: body.idEmpCotizacion,
            id_modificador: body.idEmpAsignado,
            fecha: date,
            nom_cotizador: nomCotizador.nom_usuario,
            nomAsigando: nomAsigando.nom_usuario,
            cod_proceso: body.cod_proceso,       
            numero_cotizacion: body.numero_cotizacion            
        } 

        return injectedStore.addAud(aud);

    
    }



    return {
        listAud,
        insertAud,
    }

}
