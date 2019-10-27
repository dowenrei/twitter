
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
  Tweet CHAR(500)
);

GO

INSERT INTO Users (Username, Passwords) VALUES
('Jared', 'Australia'),
('Nikita', 'India'),
('Tom', 'Germany');
GO



INSERT INTO Tweets (UserID, Tweet) VALUES
(1, 'Hi'),
(1, 'India'),
(1, 'Germany');
GO


INSERT INTO Friends (UserId, FriendId) VALUES
(1, 2),
(1, 3);
GO

/* Get Tweets from Id */
SELECT Tweets.Tweet FROM Tweets JOIN Users ON Users.Id=Tweets.Id WHERE Tweets.UserId=1;

SELECT * FROM Users;