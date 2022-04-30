const { Pool, Client } = require('pg')
const pgp = require('pg-promise')
const error = require('../network/errors')

const client = new Client({
  user: 'sqeksiepwqosov',
  host: 'ec2-52-71-69-66.compute-1.amazonaws.com',
  database: 'dedicjaogenj88',
  password: '9ed468ee5c00a70c7beb002e880f3548026b5489fdddb7a922a48bfbf3e0fd15',
  port: 5432,
  ssl: {
    rejectUnauthorized: false
  }
})

client.connect(function (err) {
  if (err) {
    console.error(err);
    throw error('Internal Server Error', 500);
  }
  console.log("Connected!");
});

function list() {
  var data = "*"
  var table = "usuario"
  return new Promise((resolve, reject) => {
    client.query(`select ${data} from ${table}`, [email], (err, res) => {
      if (err) {
        console.error(err);
        reject(err);

      }
      resolve(res.rows[0]);
    })
  })
}


function get(id) {
  var data = "usuario.cod_usuario, email, contrasena, nom_usuario, apellido_usuario, tipo_usuario, documento, celular"
  return new Promise((resolve, reject) => {
    client.query(`select ${data} from auth inner join usuario on auth.cod_usuario = usuario.cod_usuario WHERE usuario.cod_usuario = $1`, [id], (err, res) => {
      if (err) {
        console.error(err);
        reject(err);

      }

      resolve(res.rows[0]);
    })
  });
}

function getUserByEmail(email) {

  var data = "usuario.cod_usuario, email, contrasena, nom_usuario, apellido_usuario, tipo_usuario, documento, celular"
  return new Promise((resolve, reject) => {
    client.query(`select ${data} from auth inner join usuario on auth.cod_usuario = usuario.cod_usuario WHERE email = $1`, [email], (err, res) => {
      if (err) {
        console.error(err);
        reject(err);

      }
      console.log("sucees");

      console.log(res.rows[0]);
      resolve(res.rows[0]);
    })



  })

}

function insertUser(data) {

  return new Promise((resolve, reject) => {
    let query = `insert into usuario(nom_usuario,tipo_usuario,apellido_usuario,documento) values ($1,$2,$3,$4) RETURNING cod_usuario`
    client.query(query, [data.name, data.user_type, data.lastname, data.document], (err, res) => {
      if (err) {
        console.error(err);
        reject(err);
      }
      console.log("user inserted");
      console.log(res.rows[0]);
      resolve(res.rows[0]);
    })

  });
}

function updateUser(data) {
  console.log(data)

  return new Promise((resolve, reject) => {
    let query = `UPDATE usuario SET nom_usuario = $1, apellido_usuario = $2, documento = $3, celular = $4, tipo_usuario= $5 WHERE cod_usuario =$6 RETURNING nom_usuario as new_usuario`
    client.query(query, [data.name, data.lastname, data.document, data.mobile, data.user_type, data.id], (err, res) => {
      if (err) {
        console.log('error aqui' + err.message);
        console.error(err);
        reject(err);
      }
      console.log("user updated" + res.rows[0]);
      resolve(res.rows[0]);
    })

  });
}

function insertAuth(data) {
  return new Promise((resolve, reject) => {
    let query = `insert into auth(cod_usuario,email,contrasena) values ($1,$2,$3) `
    client.query(query, [data.user_id, data.email, data.password], (err, res) => {
      if (err) {
        console.error(err);
        reject(err);
      }
      console.log("auth inserted");
      resolve(res.rows[0]);
    })

  });
}


/***
 * CLIENTES
 */


function listClients() {
  var data = "*"
  var table = "cliente"
  return new Promise((resolve, reject) => {
    client.query(`select ${data} from ${table}`, (err, res) => {
      if (err) {
        console.error(err);
        reject(err);

      }
      console.log('cliets fetched');

      resolve(res.rows);
    })
  })
}

function getClient(id) {
  var data = "*"
  var table = "cliente"
  return new Promise((resolve, reject) => {
    client.query(`select ${data} from ${table} where cod_cliente = $1`, [id], (err, res) => {
      if (err) {
        console.error(err);
        reject(err);

      }
      resolve(res.rows[0]);
    })
  })
}

function getClientByDocument(cedula) {
  var data = "*"
  var table = "cliente"
  return new Promise((resolve, reject) => {
    client.query(`select ${data} from ${table} where cedula = $1`, [cedula], (err, res) => {
      if (err) {
        console.error(err);
        reject(err);

      }
      resolve(res.rows[0]);
    })
  })
}

function getClientEmails(id) {
  var data = "*"
  var table = "email_cliente"
  return new Promise((resolve, reject) => {
    client.query(`select ${data} from ${table} where cod_cliente = $1`, [id], (err, res) => {
      if (err) {
        console.error(err);
        reject(err);

      }
      resolve(res.rows);
    })
  })

}

function getClientPhones(id) {
  var data = "*"
  var table = "celular_cliente"
  return new Promise((resolve, reject) => {
    client.query(`select ${data} from ${table} where cod_cliente = $1`, [id], (err, res) => {
      if (err) {
        console.error(err);
        reject(err);

      }
      resolve(res.rows);
    })
  })

}


function insertClient(data) {

  return new Promise((resolve, reject) => {
    let query = `insert into cliente(nom_cliente,ocupacion,ciudad,cedula,direccion,cod_naturaleza,cod_tipo_cliente,sexo,birth_date,company) values ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING cod_cliente`
    client.query(query, [data.nom_cliente, data.ocupacion, data.ciudad, data.cedula, data.direccion, data.cod_naturaleza, data.cod_tipo_cliente, data.sexo, data.birth_date, data.company], (err, res) => {
      if (err) {
        console.error(err);
        reject(err);
      }
      console.log("client inserted");
      console.log(res.rows[0]);
      resolve(res.rows[0]);
    })

  });
}

function insertClientToGetId() {

  let name = "Nuevo Cliente";
  return new Promise((resolve, reject) => {
    let query = `insert into cliente(nom_cliente) values ($1) RETURNING cod_cliente`
    client.query(query, [name], (err, res) => {
      if (err) {
        console.error(err);
        reject(err);
      }
      console.log("client inserted");
      res.rows[0].nom_cliente = name
      console.log(res.rows[0]);

      resolve(res.rows[0]);
    })

  });
}

function removeClient(id) {

  
  return new Promise((resolve, reject) => {
    let query = `delete from cliente where cod_cliente = $1`
    client.query(query, [id], (err, res) => {
      let respuesta = {
        isDeleted : true
      }
      if (err) {
        console.error(err);
        reject(err);
      }
      console.log("client removed");
      

      resolve(respuesta);
    })

  });
}

function insertEmails(data) {


  return new Promise((resolve, reject) => {
    let query = `insert into email_cliente(email,label,cod_cliente) values ($1,$2,$3)`
    client.query(query, [data.email, data.label, data.cod_cliente], (err, res) => {
      if (err) {
        console.error(err);
        reject(err);
      }

      resolve(res);
      console.log("emails inserted");
    })

  });
}

function insertCelulares(data) {

  return new Promise((resolve, reject) => {
    let query = `insert into celular_cliente(numero,label,cod_cliente) values ($1,$2,$3)`
    client.query(query, [data.numero, data.label, data.cod_cliente], (err, res) => {
      if (err) {
        console.error(err);
        reject(err);
      }
      console.log("celulares inserted");
      resolve(res);
    })

  });
}

function getNaturaleza() {
  var data = "*"
  var table = "naturaleza"
  return new Promise((resolve, reject) => {
    client.query(`select ${data} from ${table}`,[], (err, res) => {
      if (err) {
        console.error(err);
        reject(err);

      }
      resolve(res.rows);
    })
  })

}

function getNaturalezaById(id) {
  var data = "*"
  var table = "naturaleza"
  return new Promise((resolve, reject) => {
    client.query(`select ${data} from ${table} where cod_naturaleza = $1`, [id], (err, res) => {
      if (err) {
        console.error(err);
        reject(err);

      }
      resolve(res.rows);
    })
  })

}

/**
  Campos

 */

  function insertDocumento(data) {
    console.log(data);
    return new Promise((resolve, reject) => {
      let query = `insert into documento(nom_documento,cod_seguro,obligatorio) values ($1,$2,$3) RETURNING cod_documento`
      client.query(query, [data.nom_documento, data.cod_seguro, data.obligatorio], (err, res) => {
        if (err) {
          console.error(err);
          reject(err);
        }
        console.log("document inserted");
        console.log(res.rows[0]);
        resolve(res.rows[0]);
      })
  
    });
  }

  function updateDocumento(data) {
    console.log(data)  
    return new Promise((resolve, reject) => {
      let query = `UPDATE documento SET nom_documento = $1, cod_seguro = $2, obligatorio = $3 WHERE cod_documento =$4 RETURNING cod_documento`
      client.query(query, [data.nom_documento, data.cod_seguro, data.obligatorio, data.id], (err, res) => {
        if (err) {
          console.log('error aqui' + err.message);
          console.error(err);
          reject(err);
        }
        console.log("Document updated" + res.rows[0]);
        resolve(res.rows[0]);
      })
  
    });
  }

  function deleteDocumento(id) {
    console.log(id)  
    return new Promise(( reject) => {
      let query = `delete from documento WHERE cod_documento =$1 RETURNING cod_documento`
      client.query(query, [id], (err) => {
        if (err) {
          console.log('error aqui' + err.message);
          console.error(err);
          reject(err);
        }
        console.log("Document deleted");
        
      })
  
    });
  }
 
  function getDocumento(id) {    
    return new Promise((resolve, reject) => {
      client.query(`select * from documento WHERE cod_documento = $1`, [id], (err, res) => {
        if (err) {
          console.error(err);
          reject(err);  
        }  
        resolve(res.rows[0]);
      })
    });
  }

  function listCampos() {    
    return new Promise((resolve, reject) => {
      client.query(`SELECT campo_seguro.cod_campo_seguro, campo_seguro.cod_campo, campo_seguro.cod_seguro, campo.cod_campo, campo.nom_campo   
      FROM campo  
      INNER JOIN campo_seguro  
      ON campo.cod_campo = campo_seguro.cod_campo  
      ORDER BY cod_campo_seguro;  `, (err, res) => {
        if (err) {
          console.error(err);
          reject(err);
  
        }
        console.log('campos fetched');
  
        resolve(res.rows);
      })
    })
  }
  
  /**
  Seguros

 */

  function insertSeguro(data) {
    console.log(data);
    return new Promise((resolve, reject) => {
      let query = `insert into seguro(cod_tipo_seguro,vigencia,cod_compania,precio) values ($1,$2,$3,$4) RETURNING cod_tipo_seguro`
      client.query(query, [data.cod_tipo_seguro, data.vigencia, data.cod_compania, data.precio], (err, res) => {
        if (err) {
          console.error(err);
          reject(err);
        }
        console.log("Insurance inserted");
        console.log(res.rows[0]);
        resolve(res.rows[0]);
      })
  
    });
  }

  function updateSeguro(data) {
    console.log(data)  
    return new Promise((resolve, reject) => {
      let query = `UPDATE seguro SET cod_tipo_seguro = $1, vigencia = $2, cod_compania = $3, precio=$4 WHERE cod_seguro =$5 RETURNING cod_tipo_seguro`
      client.query(query, [data.cod_tipo_seguro, data.vigencia, data.cod_compania, data.precio,data.id], (err, res) => {
        if (err) {
          console.log('error aqui' + err.message);
          console.error(err);
          reject(err);
        }
        console.log("Insurance updated" + res.rows[0]);
        resolve(res.rows[0]);
      })
  
    });
  }

  function deleteSeguro(id) {
    console.log(id)  
    return new Promise(( reject) => {
      let query = `delete from seguro WHERE cod_seguro =$1 RETURNING cod_seguro`
      client.query(query, [id], (err) => {
        if (err) {
          console.log('error aqui' + err.message);
          console.error(err);
          reject(err);
        }
        console.log("Insurance deleted");
        
      })
  
    });
  }

  function getSeguro(id) {    
    return new Promise((resolve, reject) => {
      client.query(`select * from seguro WHERE cod_seguro = $1`, [id], (err, res) => {
        if (err) {
          console.error(err);
          reject(err);  
        }  
        resolve(res.rows[0]);
      })
    });
  }

  function listSeguros() {    
    return new Promise((resolve, reject) => {
      client.query(`select * from seguros`, (err, res) => {
        if (err) {
          console.error(err);
          reject(err);
  
        }
        console.log('insurance fetched');
  
        resolve(res.rows);
      })
    })
  }

  /*

  Procesos

  */

  function listProcesos() {    
    return new Promise((resolve, reject) => {
      client.query(`select * from proceso`, (err, res) => {
        if (err) {
          console.error(err);
          reject(err);
  
        }
        console.log('processs fetched');
  
        resolve(res.rows);
      })
    })
  }

  /*

  Anexos Procesos

  */

  function listAnexoProcesos() {    
    return new Promise((resolve, reject) => {
      client.query(`select * from anexo_proceso`, (err, res) => {
        if (err) {
          console.error(err);
          reject(err);
  
        }
        console.log('Anex processs fetched');
  
        resolve(res.rows);
      })
    })
  }
 
  

module.exports = {
  list,
  get,
  getUserByEmail,
  insertUser,
  updateUser,
  insertAuth,
  listClients,
  getClient,
  getClientEmails,
  getClientPhones,
  insertClient,
  insertEmails,
  insertCelulares,
  getClientByDocument,
  getNaturaleza,
  getNaturalezaById,

  insertDocumento,
  updateDocumento,
  deleteDocumento,
  getDocumento,
  listCampos,
  insertSeguro,
  updateSeguro,
  deleteSeguro,
  getSeguro,
  listSeguros,
  insertClientToGetId,
  removeClient,
  listProcesos,
  listAnexoProcesos

}