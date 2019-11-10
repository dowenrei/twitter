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
            if(req.body.name && req.body.friend){
                addFriend(req.body.name,req.body.friend);
            }
        }
    });

    function addFriend(username, friend) {
        context.log(username)
        request = new Request("	BEGIN DECLARE @uid INT; DECLARE @fid INT; SELECT @uid=Users.Id FROM Users WHERE Username=@username; SELECT @fid=Users.Id FROM Users WHERE Username=@friend; INSERT INTO Friends (UserId, FriendId) VALUES (@uid, @fid); END", function (err) {
            if (err) {
                context.log(err);
                console.log(err);
                context.res = {
                    status: 400,
                    body: "Bad request, failed to connect to execute statement."
                };
                context.done();
            }
            else {
                context.res.status = 201;
                context.res.body = `${username} and ${friend} are friends now.`;
                context.done();
            }
        });
        request.addParameter('username', TYPES.VarChar, username);
        request.addParameter('friend', TYPES.VarChar, friend);
        connection.execSql(request);
    }
};