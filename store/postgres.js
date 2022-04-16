const { Pool, Client } = require('pg')
const pgp = require('pg-promise')
const error = require('../network/errors')

const client = new Client({
  user: 'postgres',
  host: '35.225.16.55',
  database: 'esquivia_db',
  password: 'MyDbASTR_DT_2021',
  port: 5432,
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
  getClientByDocument

}