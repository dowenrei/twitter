var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;

module.exports = function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

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
            context.log(err);

            context.res = {
                status: 500,
                body: "Unable to establish a connection."
            };
            context.done();

        } else {
            if (req.body && req.body.name && req.body.password){
                addUser(req.body.name,req.body.password);
            }

        }
    });

    function addUser(username, password) {
        context.log(username)
        request = new Request("INSERT INTO Users (Username, Passwords) VALUES (@username, @password);", function (err) {
            if (err) {
                context.log(err);

                context.res = {
                    status: 400,
                    body: "Bad request, failed to connect to execute statement."
                };
                context.done();
            }
            else {
                context.res.status = 201;
                context.res.body = `User ${username} created.`;
                context.done();
            }
        });
        request.addParameter('username', TYPES.VarChar, username);
        request.addParameter('password', TYPES.VarChar, password);
        connection.execSql(request);
    }
};