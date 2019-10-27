var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
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
    connection.on('connect', function (err) {
        context.log("Connected")
    })

    if (req.query.name || (req.body && req.body.name)) {
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: "Hello " + (req.query.name || req.body.name)
        };
    }
    else {
        context.res = {
            status: 400,
            body: "Please pass a name on the query string or in the request body"
        };
    }
};