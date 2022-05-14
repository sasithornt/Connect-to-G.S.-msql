const express = require('express');
const app = express();
const cors = require('cors');
const { request } = require('express');
const sql = require('mssql');
var bodyparser = require("body-parser");

// Body Parser Middleware
app.use(bodyparser.json());
app.use(express.json());
app.use(cors());

// Config Database G.S. 
const config = {
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



// ดึงข้อมูลมาแสดง selctAll data //
app.get('/types', function (req, res) {
    // connect to your database
    sql.connect(config, function (err) {
        if (err) throw err;
        console.log('Connected');
        // create Request object
        var request = new sql.Request();
        // query to the database and get the records

        //ดึงแบบตารางเดียว
        request.query(`select * from dbo.Types`, function (err, recordset) {
            // ดึงแบบสองตาราง
            // request.query(`select person.*, UserList.email From person left join UserList on person.userid = UserList.userid`, function (err, recordset) {
            if (err) throw err;
            console.log(recordset)
            // send records as a response
            res.send(recordset);
        });
    });
});
// End selctAll data //

// เพิ่มข้อมูล insert data Users
// app.post('/create', (req, res) => {
//     sql.connect(config, function (err) {
//         const username = req.body.username;
//         const password = req.body.password;
//         const Real_Name = req.body.Realname;
//         const First_Name = req.body.Firstname;
//         const location_Id = req.body.locationId;
//         const intLocation = parseInt(location_Id);
//         const Is_active = req.body.Is_active;
//         const intIsactive = parseInt(Is_active);
//         const Auth_type = req.body.Auth_type;
//         const intAuth_type = parseInt(Auth_type);
//         const Is_delete = req.body.Is_delete;
//         const intIsdelete = parseInt(Is_delete);
//         const Profile_Id = req.body.Profile_Id;
//         const intProfileid = parseInt(Profile_Id);
//         const Entities_Id = req.body.Entities_Id;
//         const intEntities_Id = parseInt(Entities_Id);
//         const Usertitle_Id = req.body.Usertitle_Id;
//         const intUsertitle_Id = parseInt(Usertitle_Id);
//         const Usercategories_Id = req.body.Usercategories_Id;
//         const intUsercategories_Id = parseInt(Usercategories_Id);

//         if (err) throw err;
//         console.log('Connected');

//         // create Request object
//         var request = new sql.Request();

//         // query to the database and insert the records
//         //request.query(`INSERT INTO person (id) VALUES (32) `,
//         //request.query(`INSERT INTO person (id,name) VALUES (38,'RR') `,
//         //request.query(`INSERT INTO person (id,name) VALUES (40,'name') `,
//         //request.query(`INSERT INTO person (id,name,age,country,position,tel) VALUES ('${intid}','${name}','${age}','${country}','${position}','${tel}') `,
//         // request.query(`INSERT INTO person (userid,name,age,country,dept,tel) VALUES ('${intid}','${name}','${age}','${country}','${dept}','${tel}') `,
//         request.query(`INSERT INTO Users (UserName,Password,Real_Name,FirstName,Location_Id,Is_atvive,Auth_type,Is_delete,Profile_Id,Entities_Id,Usertitle_Id,Usercategories_Id)
//          VALUES ('${username}','${password}','${Real_Name}','${First_Name}','${intLocation}','${intIsactive}','${intAuth_type}','${intIsdelete}','${intProfileid}','${intEntities_Id}','${intUsertitle_Id}','${intUsercategories_Id}') `,
//             function (err, res) {
//                 if (err) {
//                     console.log(err);
//                 } else {
//                     console.log(res);
//                 }
//             });
//         // console.log(request);
//     });
// })

// Start Insert to Table Types //
app.post('/addtypes', (req, res) => {
    sql.connect(config, function (err) {
        const TypeName = req.body.TypeName;
        const Type_Comment = req.body.Type_Comment;
        if (err) throw err;

        // create Request object
        var request = new sql.Request();

        request.query(`INSERT INTO Types (Name,Type_Comment) VALUES ('${TypeName}','${Type_Comment}') `,
            function (err, res) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(res);
                }
            });

    });
})
// End Insert to Table Types //

//Start query Types //
app.get('/gettypes',(req,res)=>{
    sql.connect(config,function (err){
        if(err )throw err;

        var request = new sql.Request();
        request.query(`SELECT * FROM Types` ,function (err,recordset){
            if (err) throw err;
            // console.log(recordset)
            // send records as a response
            res.send(recordset);
        })
    })
})
//End query Types //


// start insert to table location //

app.post('/addlocation', (req, res) => {
    sql.connect(config, function (err) {
        // ประกาศตัวแปร //
        const locationName = req.body.locationName;
        const locationId = req.body.locationId;
        const CompleteName = req.body.CompleteName;
        const LocationLevel = req.body.LocationLevel;
        const Ancestors_Cache = req.body.Ancestors_Cache;
        const Sons_Cache = req.body.Sons_Cache;
        const Address = req.body.Address;
        const PostCode = req.body.PostCode;
        const Town = req.body.Town;
        const Location_State = req.body.Location_State;
        const Country = req.body.Country;
        const Lititude = req.body.Lititude;
        const Longitude = req.body.Longitude;
        const Altitude = req.body.Altitude;

        // create Request object
        var request = new sql.Request();

        request.query(`Insert into Location (Name,Location_Id,Complete_Name,Location_Level,Ancestors_Cache,Sons_Cache,Address,PostCode,Town,Location_State,Country,Lititude,Longitude,Altitude) 
        VALUES ('${locationName}','${locationId}','${CompleteName}','${LocationLevel}','${Ancestors_Cache}','${Sons_Cache}','${Address}','${PostCode}','${Town}','${Location_State}','${Lititude}','${Longitude}','${Altitude}')`,
            function (err, res) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(res);
                }
            });
    })
})

// End insert to table location //


//Start Insert Status //
app.post('/addstatus',(req,res)=>{
    sql.connect(config, function(err){
        const Name = req.body.Name;

        //Create Request object //
        var request = new sql.Request();

        request.query(`Insert into Status_Mst (Name) VALUES ('${Name}')`,
        function(err,res){
            if(err){
                console.log(err);
            }else{
                console.log(res);
            }
        })
    })
})

//End Insert Status //

//Start Insert Category //
app.post('/addcategory',(req,res)=>{
    sql.connect(config, function(err){
        const Name = req.body.Name;
        const Comment  = req.body.Comment;

        //Create Request object //
        var request = new sql.Request();

        request.query(`INSERT INTO Category (Name,Category_Comment) VALUES ('${Name}','${Comment}')`,
        function(err,res){
            if(err){
                console.log(err);
            }else{
                console.log(res);
            }
        })
    })
})

//End Insert Status //

//Start query Status //
app.get('/getstatus',function(req,res){
    sql.connect(config,function(err){
        if(err) throw err;
        var request = new sql.Request();

        request.query(`SELECT * FROM Status_Mst`,function(err,recordset){
            if(err) throw err;
            // console.log(recordset);
            res.send(recordset);
        })
    })
})
// End query Status //

//Start query category //
app.get('/getcategory', function (req, res) {
    // connect to your database
    sql.connect(config, function (err) {
        if (err) throw err;
        console.log('Connected');
        // create Request object
        var request = new sql.Request();
        // query to the database and get the records

        //ดึงแบบตารางเดียว
        request.query(`SELECT * FROM Category`, function (err, recordset) {
          
            if (err) throw err;
            // console.log(recordset)
            // send records as a response
            res.send(recordset);
        });
    });
});

//End query category //





app.get('/get',(req,res)=>{
    res.status(200).json({
        message:'Hello Fern'
    });
});

var server = app.listen(5001, function () {
    console.log('Server is running on port 5001');
});
