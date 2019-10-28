var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;

module.exports = function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    var config = {
        server: 'reitwitter.database.windows.net',  //update me
        options:{encrypt:true, database: 'Twitter'},
        authentication: {
            type: 'default',
            options: {
                userName: "wenreido",
                password: "Dowenrei!",
            }
        }
};

    var connection = new Connection(config);

    connection.on('connect', function(err) {

        if (err) {
            context.log(err);

            context.res = {
                status: 500,
                body: "Unable to establish a connection."
            };
            context.done();

        } else {
            addUser('AzureFunction','Hi');
        }
    });

    function addUser(username,password) {

        request = new Request("INSERT INTO Users (Username, Passwords) VALUES (@username, @password);", function(err) {
            if (err) {
                context.log(err);

                context.res = {
                    status: 500,
                    body: "Failed to connect to execute statement."
                };
                context.done();
            } 
            else {
                context.res = {
                    status: 200,
                    body: "User added"
                }
            }
        });

        request.on('done', function() {
            context.log('Finish Request')
            context.done();
        });
        request.addParameter('username', TYPES.Char, username);
        request.addParameter('password', TYPES.Char, password);
        connection.execSql(request);
    }
};