const mysql = require('mysql');

const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "", //password kosong
  database: "postman" //nama database yang kalian buat
});

conn.connect((err) => {
    if(err) throw err;
    console.log('db running')
});

module.exports = conn;
