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