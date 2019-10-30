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
            getTweets();
        }
    });

    function getTweets() {

        request = new Request("SELECT Tweets.Tweet FROM Tweets JOIN Users ON Users.Id=Tweets.Id WHERE Tweets.UserId=(SELECT Users.Id FROM Users WHERE Username='Jared') ORDER BY Tweets.Id DESC;", function (err) {
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
                    body: "Tweet"
                }
            }
        });
        var result = [];
        request.on('row', function (columns) {
            columns.forEach(function (column) {
                console.log(column.value);
                result.push(column.value);
            });
        });

        request.on('done', function () {
            context.log('Finish Request')
            context.done();
        });
        connection.execSql(request);
    }
};