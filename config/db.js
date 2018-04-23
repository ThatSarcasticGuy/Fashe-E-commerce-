const mysql=require('mysql2');

const connection=mysql.createConnection({   //create connection to database
    host:'localhost',  //must //must
    user:'root',   //must
    password:'vibhor5598',
    database:"mydb", //if user has password
    //port:'3306',   //by default 3306. enter if using different port
});
connection.connect(function(err){
  if(err)
  throw err;
  console.log("database connected");
});
//
// CREATE TABLE User (
//     UserID int AUTO_INCREMENT,
//     Name varchar(255),
//     Email varchar(255),
//     Password varchar(255) ,
//        PRIMARY KEY(UserID));

// CREATE TABLE Products (
//     ProductID int AUTO_INCREMENT,
//     ProductName varchar(255),
//     ProductPrice int NOT NULL,
//     PRIMARY KEY(ProductID));

// CREATE TABLE Cart (
//     OrderID int AUTO_INCREMENT,
//     UserID int,
//     ProductID int,
//     Qty int DEFAULT 1,
//     PRIMARY KEY (OrderID),
//     FOREIGN KEY (UserID) REFERENCES User(UserID),
//     FOREIGN KEY (ProductID) REFERENCES Products(ProductID));

// INSERT INTO Products
// VALUES (4,'Frayed denim shorts',500);

module.exports = connection;
