CREATE DATABASE Twittert;

CREATE TABLE Users (
  Id INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
  Username CHAR(50) UNIQUE,
  Passwords CHAR(50)
);
GO

CREATE TABLE Friends (
  Id INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
  UserId INT,
  FriendId INT
);
GO

CREATE TABLE Tweets (
  Id INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
  UserId INT,
  Tweet CHAR(500),
);

GO


/* Create User */
INSERT INTO Users (Username, Passwords) VALUES ('Jared', 'Australia'),

/*Show Suggested Friends*/
SELECT Users.Username FROM Users WHERE Username <> 'Jared';

/* Get Tweets from Username -ORDER BY */
SELECT Tweets.Tweet FROM Tweets JOIN Users ON Users.Id=Tweets.Id WHERE Tweets.UserId=(SELECT Users.Id FROM Users WHERE Username='Jared') ORDER BY Tweets.Id DESC;

/* Insert Tweets from Username*/
INSERT INTO Tweets (UserID, Tweet) VALUES ((SELECT Users.Id FROM Users WHERE Username='Jared'), 'helloadf');

/* Follow Button from Username */
INSERT INTO Friends (UserId, FriendId) VALUES ((SELECT Users.Id FROM Users WHERE Username='Nikita'), (SELECT Users.Id FROM Users WHERE Username='Tom'))

/* Show Friends List (Username) */
SELECT Users.Username FROM Users JOIN Friends ON Users.Id=Friends.FriendId WHERE UserId = (SELECT Users.Id FROM Users WHERE Username='Jared');

/* Show all tweets from friends */
