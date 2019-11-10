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
            context.log("Connection Established.")
            getAllTweets();
        }
    });

    function getAllTweets() {
        var result = [];
        request = new Request("SELECT Users.Username, Tweets.Tweet FROM Tweets JOIN Users ON Users.Id=Tweets.UserId WHERE (UserId IN (SELECT Id FROM Users WHERE username = @username)) OR (UserId IN (SELECT FriendId FROM Friends WHERE (UserId IN (SELECT Id FROM Users WHERE username = @username)))) ORDER BY Tweets.Id DESC;;", function (err) {
            if (err) {
                context.log(err);

                context.res = {
                    status: 400,
                    body: `${err}`
                };  
                context.done();
            }
        });

        request.on('row', function (columns) {
                var rowObject ={};
                columns.forEach(function (column) {
                    rowObject[column.metadata.colName] = column.value;
                });
                result.push(rowObject);
            });

        request.on('requestCompleted', function () {
                console.log('End Result',result);
                context.log('End Result',result);
                connection.close();
                context.res.status =200;
                context.res.body = result;
                context.done();
            });
        
        request.addParameter('username', TYPES.VarChar, req.headers.username);
        
        connection.execSql(request);
    }
};



