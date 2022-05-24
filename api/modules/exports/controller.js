const XLSX = require('xlsx')
const auth = require('../../../auth/index');
const bcrypt = require('bcrypt');
const errors = require('../../../utils/error')
const tokenList = {}

module.exports = function(injectedStore) {
    if (!injectedStore) {
        throw new Error('Db error');
    }

    
    async function excel(body) {
        
        console.log(body)       

    const covertJsonToExcel=()=>{
        const workSheet = XLSX.utils.json_to_sheet(body);
        const workBook = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(workBook,workSheet,"Empleados");
        
        XLSX.write(workBook,{bookType:'xlsx',type:"buffer"});

        XLSX.write(workBook,{bookType:'xlsx',type:"binary"});
        XLSX.writeFile(workBook,"ListaEmpleados.xlsx");
    }

    covertJsonToExcel();
    console.log("Datos exportados....");

    }

    return {

        excel

    }

}