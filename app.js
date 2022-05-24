// Application wihout Sequelize Framework

// const express = require('express');
// const mysql = require('mysql2');
// const express_app = express();
// const webportnumber = 3308;

// const { Sequelize } = require('sequelize');

// // var connection = mysql.createConnection({
// //     host: 'localhost',
// //     user: 'root',
// //     // port: 3307,
// //     password: 'root',
// //     database: 'NodeDB45'
// // });

// // Option 3: Passing parameters separately (other dialects)
// const sequelize = new Sequelize('database', 'username', 'password', {
//   host: 'localhost',
//   dialect: 'mysql'
// });

// try {
//   await sequelize.authenticate();
//   console.log('Connection has been established successfully.');
// } catch (error) {
//   console.error('Unable to connect to the database:', error);
// }

// //Router to create Database instance in MySQL
// // express_app.get('/createDB', function (req, res) {
// //   let sql = 'CREATE DATABASE NodeDB45';
// //   connection.query(sql, function (err, result) {
// //     if (err) return err;
// //     console.log('result: ' + result);
// //     res.send(result);
// //     res.send("Database Created Sucessfully!");
// //   })
// // })


// express_app.listen(webportnumber, () => {
//   console.log('listening on ' + webportnumber)
// });

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081",
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

// app.use(cors(corsOptions));


// To enable CORS for all the routes in our application =================================================================
app.use(cors())

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Database =================================================================

// For development use only

// const db = require("./models");
// const Role = db.role;
// db.sequelize.sync({ force: true }).then(() => {
//   console.log('Drop and Resync Db');
//   initial();
// });

// function initial() {
//   Role.create({
//     id: 1,
//     name: "user"
//   });

//   Role.create({
//     id: 2,
//     name: "moderator"
//   });

//   Role.create({
//     id: 3,
//     name: "admin"
//   });
// }

// configuration to avoid dropping data (For Production)

const db = require("./models");
db.sequelize.sync();

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to a new Mysql application." });
});

require("./routes/tutorial.routes")(app);
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});