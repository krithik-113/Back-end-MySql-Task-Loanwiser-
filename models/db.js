const mysql = require('mysql')

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "test"
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database: ', err)
        return
    }
    console.log('MySql Connected...')
})

const createUsersTable = () => {
  const sql = `create table if not exists users (
    id int auto_increment primary key,
    name varchar(50) not null,
    email varchar(50) not null,
    password varchar(100) not null
    )`;
  db.query(sql, (err, results) => {
    if (err) {
      console.log("Error creating table...");
    } else {
      console.log("Users table created successfully...");
    }
  });
};
createUsersTable();

const createApplicantTable = () => {
  const sql = `create table if not exists applicants(
                appId int auto_increment primary key,
                userID int not null,
                applicantName varchar(50) not null
)`;
  db.query(sql, (err, results) => {
    if (err) {
      console.log("Error creating Applicant table...");
    } else {
      console.log("Applicants table created successfully...");
    }
  })
}
createApplicantTable()

const createDocumentsTable = () => {
  const sql = `create table if not exists documents(
                docId int auto_increment primary key,
                refAppId int not null,
                documentName varchar(50) not null
  )`;
  db.query(sql, (err, results) => {
    if (err) {
      console.log("Error creating Document table...");
    } else {
      console.log("Documents table created successfully...");
    }
  });
}
createDocumentsTable()

const createImageSaver = () => {
  const sql = `create table if not exists imageSaver(
              imageId int auto_increment primary key,
              appId int not null,
              docId int not null,
              status varchar(20) default 'Pending',
              size float(10, 5) not null,
              imageName varchar(50) not null,
              imageURL varchar(200) not null
  )`;
  db.query(sql, (err, results) => {
    if (err) {
      console.log("Error creating imageSaver table...");
    } else {
      console.log("imageSaver table created successfully...");
    }

  })
}
createImageSaver()
module.exports = db


