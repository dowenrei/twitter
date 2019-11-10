

CREATE TABLE Users (
  Id INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
  Username VARCHAR(50),
  Passwords VARCHAR(50)
);
GO

CREATE TABLE Friends (
  Id INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
  UserId INT,
  FriendId INT,
);
GO

/*   CONSTRAINT UQ_UserId_FriendId UNIQUE(UserId, FriendId) */

CREATE TABLE Tweets (
  Id INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
  UserId INT,
  Tweet VARCHAR(500),
);

GO
SELECT * FROM Users;	
SELECT * FROM Tweets;	
SELECT * FROM Friends;

/* Create User */
INSERT INTO Users (Username, Passwords) VALUES ('Jared', 'Australia');

/* User Login*/
SELECT Users.Username, Users.Passwords FROM Users WHERE Username ='Jared' AND Passwords='Australia' ;
  
/*Show Suggested Friends*/
	SELECT Users.Username FROM Users WHERE Username <> 'Jared';

/* Get Tweets from Username -ORDER BY */
  SELECT Tweets.Tweet FROM Tweets JOIN Users ON Users.Id=Tweets.Id WHERE Tweets.UserId=(SELECT Users.Id FROM Users WHERE Username='Alvin') ORDER BY Tweets.Id DESC;

/* Insert Tweets from Username*/
BEGIN DECLARE @pid INT; SELECT @pid=Users.Id FROM Users WHERE Username='adfsd'; INSERT INTO Tweets (UserID, Tweet) VALUES (@pid, 'CIBDSAFAI'); END

/* INSERT INTO Tweets (UserID, Tweet) VALUES ((SELECT Users.Id FROM Users WHERE Username='adfsd'), 'helloadf'); */

/* Follow Button from Username */
	BEGIN DECLARE @uid INT; DECLARE @fid INT; SELECT @uid=Users.Id FROM Users WHERE Username='adfsd'; SELECT @fid=Users.Id FROM Users WHERE Username='Yhhj'; INSERT INTO Friends (UserId, FriendId) VALUES (@uid, @fid); END


/* Show Friends List (Username) */
SELECT Users.Username FROM Users JOIN Friends ON Users.Id=Friends.UserId WHERE UserId = (SELECT Users.Id FROM Users WHERE Username='Nikita');

/* Show all tweets from users & friends */
SELECT Users.Username, Tweets.Tweet FROM Tweets JOIN Users ON Users.Id=Tweets.UserId WHERE (UserId IN (SELECT Id FROM Users WHERE username = 'Jared')) OR (UserId IN (SELECT FriendId FROM Friends WHERE (UserId IN (SELECT Id FROM Users WHERE username ='Jared')))) ORDER BY Tweets.Id DESC;;

