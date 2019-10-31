
var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;

var config = {
    server: 'reitwitter.database.windows.net',  //update me
    options: { encrypt: true, database: 'Twitter' },
    authentication: {
        type: 'default',
        options: {
            userName: "wenreido",
            password: "Dowenrei!",
        }
    }
};

var connection = new Connection(config); 
connection.on('connect', function (err) {
    if (err) {
        console.log(err);}
    getSuggestedFriends();
});

connection.on('debug', function (text) {
    console.log(text);
});

function getSuggestedFriends() {
    var result = [];
    request = new Request("SELECT Users.Username FROM Users WHERE Username <> 'Jared';", function (err,rowCount) {
        if (err) {
            console.log(err);
        }
        else{
            console.log(rowCount + ' rows');
        }
    });

    request.on('row', function (columns) {
            console.log(columns);
            columns.forEach(function (column) {
                console.log(column.value)
                result.push(column.value);
            });
           
        });

    request.on('requestCompleted', function () {
        console.log('End Result',result);
        connection.close();
     });
    
    connection.execSql(request);
}
