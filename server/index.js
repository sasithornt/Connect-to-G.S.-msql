const express = require('express');
const app = express();
const cors = require('cors');
const {request} = require('express');
const sql = require('mssql');
var bodyparser = require("body-parser");

// Body Parser Middleware
app.use(bodyparser.json());
app.use(express.json());
app.use(cors());

// Config Database G.S. 
const config ={
    user: 'sa',
    password: '*Adm@gset',
    server: 'GSET_044\\GSET_044',
    database: 'GS',
    synchronize: true,
    trustServerCertificate: true,
    options: {
        // instancename: 'GSET_044',
        cryptoCredentialsDetails: {
            minVersion: 'TLSv1'
        }
    }
}



// ดึงข้อมูลมาแสดง selctAll data
app.get('/Users', function (req, res) {
    // connect to your database
    sql.connect(config, function (err) {
        if (err) throw err;
        console.log('Connected');
        // create Request object
        var request = new sql.Request();
        // query to the database and get the records

        //ดึงแบบตารางเดียว
        request.query(`select * from Users`, function (err, recordset) {
            // ดึงแบบสองตาราง
            // request.query(`select person.*, UserList.email From person left join UserList on person.userid = UserList.userid`, function (err, recordset) {
            if (err) throw err;
            console.log(recordset)
            // send records as a response
            res.send(recordset);
        });
    });
});


var server = app.listen(5000, function () {
    console.log('Server is running on port 5000');
});
