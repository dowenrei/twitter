var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;


var config = {
    server: 'reitwitter.database.windows.net',  //update me
    options:{encrypt:true,database:'Twitter'},
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
    if (err) context.log(err);
    getSuggestedFriends();
});

connection.on('debug', function(text) {
    console.log(text);
    }
);



function getSuggestedFriends(){
request = new Request("SELECT Users.Username FROM Users WHERE Username <> 'Jared';", function (err){
    if (err)
    {
        console.log(err)
    }    
});

request.on('row', function(columns) {
    columns.forEach(function(column) {
        console.log(column.value);
    });
    });

connection.execSql(request);
console.log("done")
}


