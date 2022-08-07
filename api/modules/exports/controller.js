const XLSX = require('xlsx')
const auth = require('../../../auth/index');
const bcrypt = require('bcrypt');
const errors = require('../../../utils/error')
const tokenList = {}

module.exports = function(injectedStore) {
    if (!injectedStore) {
        throw new Error('Db error');
    }

    async function list() {
        
        return injectedStore.listClientsExport();

    }

    
   
    return {

        list

    }

}