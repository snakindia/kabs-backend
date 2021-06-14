var mysql = require("mysql");
var properties = require('./Config');

// connect to your database
var connection = mysql.createConnection({
  host     : properties.connectionProps.server,
  user     : properties.connectionProps.user,
  password : properties.connectionProps.password,
  database : properties.connectionProps.database
});
 
connection.connect(function(err) {
    if (err) {
        console.error('Error connecting database: ' + err.stack);
        return;
    }
 
    console.log('Database is connected as id ' + connection.threadId);
});

module.exports = connection;