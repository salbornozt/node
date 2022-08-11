const bodyParser = require("body-parser");
var { nanoid } = require("nanoid");
const auth = require("../auth");
const bcrypt = require("bcrypt");

module.exports = function (injectedStore) {
  if (!injectedStore) {
    throw new Error("Db error");
  }

  async function list() {
    return injectedStore.listAnexoProceso();
  }

  async function get(id) {
    return injectedStore.getAnexoByProceso(id);
  }

  async function insert(body) {
    console.log(body.cod_proceso);
    let seguro = {
      cod_tipo_seguro: body.cod_tipo_seguro,
      vigencia: body.vigencia,
      cod_compania: body.cod_compania,
      precio: body.precio,
    };
    return injectedStore.insertProceso(seguro);
  }

  async function update(body) {
    const campos = body.campos;
    try {
      await campos.forEach(function (item, index) {
        injectedStore.updateAnexoProceso(item);
      });
      let respuesta = {
        isupdated: true,
      };
      return respuesta;
    } catch (error) {
      let respuesta = {
        isupdated: false,
      };
      return respuesta;
    }
  }
  async function remove(id) {
    return injectedStore.deleteSeguro(id);
  }

  return {
    list,
    insert,
    update,
    remove,
    get,
  };
};
