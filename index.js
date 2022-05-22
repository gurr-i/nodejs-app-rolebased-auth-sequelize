const express = require('express');
const mysql = require('mysql2');
const express_app = express();
const webportnumber = 3308;

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    // port: 3307,
    password: 'root',
    database: 'NodeDB45'
});

connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected! ' + connection.threadId);
    console.log('Go to http://localhost:' + webportnumber)
});


//Router to create Database instance in MySQL
express_app.get('/createDB', function (req, res) {
    let sql = 'CREATE DATABASE NodeDB45';
    connection.query(sql, function (err, result) {
        if (err) return err;
        console.log('result: ' + result);
        res.send(result);
        res.send("Database Created Sucessfully!");
    })
})

//Router to create Database Table instance in MySQL
express_app.get('/createtable', (req, res) => {
    // var sql = "ALTER TABLE customers ADD COLUMN id INT AUTO_INCREMENT PRIMARY KEY";//TO update existing table
    var sql = "CREATE TABLE customers (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), address VARCHAR(255))";
    // var sql = "CREATE TABLE customers (name VARCHAR(255), address VARCHAR(255))";
    connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table created!");
        res.send("Table created!");
        res.send(result);
    });

})

//Router to update Database Table instance in MySQL
express_app.get('/update', (req, res) => {
    // To update a table with one variable

    // var sql = "INSERT INTO customers (name, address) VALUES ('Company Inc', 'Highway 37')";
    // connection.query(sql, function (err, result) {
    //     if (err) throw err;
    //     console.log("1 record inserted");
    // });

    // To update a table with manny variable details
    var sql = "INSERT INTO customers (name, address) VALUES ?";
    var values = [
        ['John', 'Highway 71'],
        ['Peter', 'Lowstreet 4'],
        ['Amy', 'Apple st 652'],
        ['Hannah', 'Mountain 21'],
        ['Michael', 'Valley 345'],
        ['Sandy', 'Ocean blvd 2'],
        ['Betty', 'Green Grass 1'],
        ['Richard', 'Sky st 331'],
        ['Susan', 'One way 98'],
        ['Vicky', 'Yellow Garden 2'],
        ['Ben', 'Park Lane 38'],
        ['William', 'Central st 954'],
        ['Chuck', 'Main Road 989'],
        ['Viola', 'Sideway 1633']
    ];
    connection.query(sql, [values], function (err, result) {
        if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);
        res.send("Table updated Sucessfully!");
        res.send(result);
    });


})

//Router to Select all records from the Database  instance in MySQL 
express_app.get('/select', (req, res) => {
    connection.query("SELECT * FROM customers", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
})

//Router to To select only some of the columns in a table, use the "SELECT" statement followed by the column name in MySQL 
express_app.get('/selectcolumn', (req, res) => {
    connection.query("SELECT name, address FROM customers", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
})

//The third parameter of the callback function is an array containing information about each field in the result.
express_app.get('/allrecords', (req, res) => {
    connection.query("SELECT name, address FROM customers", function (err, result, fields) {
        if (err) throw err;
        console.log(fields);
        console.log(result);
        res.send(result);
    });
})

//Select With a Filter
//When selecting records from a table, you can filter the selection by using the "WHERE" statement:
express_app.get('/Filterbycategory', (req, res) => {
    connection.query("SELECT * FROM customers WHERE address = 'Park Lane 38'", function (err, result) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
})

//Select With a Filter
//You can also select the records that starts, includes, or ends with a given letter or phrase.
express_app.get('/Filterbycategorylikechar', (req, res) => {
    connection.query("SELECT * FROM customers WHERE address LIKE 'S%'", function (err, result) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
})

// Escape query values by using the placeholder ? method:
//Find details using value of a variable from table
express_app.get('/Escapequery', (req, res) => {
    // var adr = 'Betty';
    // var sql = 'SELECT * FROM customers WHERE name = ?';
    // connection.query(sql, [adr], function (err, result) {
    //     if (err) throw err;
    //     console.log(result);
    //     res.send(result);
    // });


    //FOr multiple Quries
    var name = 'Amy';
    var adr = 'Mountain 21';
    var sql = 'SELECT * FROM customers WHERE name = ? OR address = ?';
    connection.query(sql, [name, adr], function (err, result) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    })

})

// Sort the result alphabetically by name:
express_app.get('/Sorting', (req, res) => {
    connection.query("SELECT * FROM customers ORDER BY name", function (err, result) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
})

// Sort the result reverse alphabetically by name:
express_app.get('/Sortingdesc', (req, res) => {
    connection.query("SELECT * FROM customers ORDER BY name DESC", function (err, result) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
})

// Delete any record with the address "Mountain 21":
express_app.get('/Sortingdesc', (req, res) => {
    connection.query("SELECT * FROM customers ORDER BY name DESC", function (err, result) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
})

express_app.listen(webportnumber, () => {
    console.log('listening on ' + webportnumber)
});

