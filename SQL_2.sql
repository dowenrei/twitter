CREATE DATABASE Twittert;

CREATE TABLE Users (
  Id INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
  Username VARCHAR(50) UNIQUE,
  Passwords VARCHAR(50)
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
  Tweet VARCHAR(500),
);

GO

CREATE TABLE Rr (
  Id INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
  UserId INT,
  FriendId INT
);
GO

ALTER TABLE Friends
ADD CONSTRAINT UQ_UserId_FriendId UNIQUE(UserId, FriendId);
/* Create User */
INSERT INTO Users (Username, Passwords) VALUES ('Jared', 'Australia');

/*Show Suggested Friends*/
SELECT Users.Username FROM Users WHERE Username <> 'Jared';

/* Get Tweets from Username -ORDER BY */
SELECT Tweets.Tweet FROM Tweets JOIN Users ON Users.Id=Tweets.Id WHERE Tweets.UserId=(SELECT Users.Id FROM Users WHERE Username='Jared') ORDER BY Tweets.Id DESC;

/* Insert Tweets from Username*/
INSERT INTO Tweets (UserID, Tweet) VALUES ((SELECT Users.Id FROM Users WHERE Username='Jared'), 'helloadf');

/* Follow Button from Username */
INSERT INTO Friends (UserId, FriendId) VALUES ((SELECT Users.Id FROM Users WHERE Username='Nikita'), (SELECT Users.Id FROM Users WHERE Username='Tom'))

/* Show Friends List (Username) */
SELECT Users.Username FROM Users JOIN Friends ON Users.Id=Friends.FriendId WHERE UserId = (SELECT Users.Id FROM Users WHERE Username='Nikita');

/* Show all tweets from friends */
