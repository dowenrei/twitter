CREATE TABLE Users(
  UserID INT PRIMARY KEY,
  Username VARCHAR(50) UNIQUE NOT NULL,
);

INSERT INTO Users (UserID, Username) VALUES (1,'Tas'); 