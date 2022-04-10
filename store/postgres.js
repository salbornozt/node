const { Pool, Client } = require('pg')


const client = new Client({
  user: 'postgres',
  host: '35.225.16.55',
  database: 'esquivia_db',
  password: 'MyDbASTR_DT_2021',
  port: 5432,
})

client.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

function list() {
  var data = "*"
  var table = "usuario"
  return new Promise((resolve, reject) => {
    client.query(`select ${data} from ${table}`,[email],(err,res) =>{
      if(err){
        console.error(err);
        reject(err);
      
      }
      resolve(res.rows[0]);
    })
  })  
}

function get(id) {
  var data = "*"
  var table = "usuario"
  return new Promise((resolve, reject) => {
    client.query(`select ${data} from ${table} WHERE cod_usuario = $1`,[id],(err,res) =>{
      if(err){
        console.error(err);
        reject(err);
      
      }
      resolve(res.rows[0]);
    })
  });
}

function getUserByEmail(email) {

  var data = "usuario.cod_usuario, email, contrasena, nom_usuario, tipo_usuario"
  return new Promise((resolve, reject) => {
    client.query(`select ${data} from auth inner join usuario on auth.cod_usuario = usuario.cod_usuario WHERE email = $1`,[email],(err,res) =>{
      if(err){
        console.error(err);
        reject(err);
      
      }
      console.log("sucees");
      
      console.log(res.rows[0]);
      resolve(res.rows[0]);
    })
  


  })  

}


module.exports = {
  list,
  get,
  getUserByEmail
  
}