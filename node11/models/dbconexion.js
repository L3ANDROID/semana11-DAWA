var mysql = require('mysql');
var conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "tienda2"
});
conn.connect();
module.exports = conn;