const { Pool, Client } = require('pg')


const client = new Client({
  user: 'postgres',
  host: '35.225.16.55',
  database: 'esquivia_db',
  password: 'MyDbASTR_DT_2021',
  port: 5432,
})

client.connect(function (err) {
  if (err) throw err;
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
    client.query(query, [data.name, data.lastname, data.document, data.mobile,data.user_type, data.id], (err, res) => {
      if (err) {
        console.log('error aqui'+err.message);
        console.error(err);
        reject(err);
      }
      console.log("user updated"+res.rows[0]);
      resolve(res.rows[0]);
    })

  });
}

function insertAuth(data){
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


module.exports = {
  list,
  get,
  getUserByEmail,
  insertUser,
  updateUser,
  insertAuth

}