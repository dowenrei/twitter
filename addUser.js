// POST - User
var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;
var async = require('async');

var config = {  
    server: 'reitwitter.database.windows.net',  //update me
    authentication: {
        type: 'default',
        options: {
            userName: "wenreido",
            password: "Dowenrei!",
        }
    },
    options: {
        // If you are on Microsoft Azure, you need encryption:
        encrypt: true,
        database: 'Twitter'  //update me
    }
}; 

var connection = new Connection(config);

connection.on('connect',function(err){
    if (err) throw err;
    addUser('Alvins','D');
    //connection.close();
})

connection.on('debug', function(text) {
    console.log(text);
  }
);

function addUser(username,password){
    request = new Request("INSERT INTO Users (Username, Passwords) VALUES (@username, @password);", function (err){
        if (err)
        {
            console.log(err)
        }    
    });
    request.addParameter('username', TYPES.Char, username);
    request.addParameter('password', TYPES.Char, password);
    connection.execSql(request);
    console.log("done")

}


