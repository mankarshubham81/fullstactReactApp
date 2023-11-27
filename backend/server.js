const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const PORT = 8081;
const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'formdb'
    // database: 'employees'
    // insecureAuth : true
}, (res) => {
    console.log("res")
})



app.post("/create", (req, res) => {
    console.log("req 17 ", req.body);
    const name = req.body.name;
    const age = req.body.age;
    const country = req.body.country;
    const position = req.body.position;
    const wage = req.body.wage;
    db.query(`select * from login`,(err, result,fields) => {
        if(err) {
            return console.log(err);
        } else {
            console.log("rrrrr", result);
        }
    });
    db.end();
    // db.query(
    //   "INSERT INTO employees (name, age, country, position, wage) VALUES (?,?,?,?,?)",
    //   [name, age, country, position, wage],
    //   (err, result) => {
    //     if (err) {
    //       console.log(err);
    //     } else {
    //       res.send("Values Inserted");
    //     }
    //   }
    // );
  });

app.post('/signup', (req,res) => {
    let id = 1623474;
    const name = req.body.name[0];
    const email = req.body.email[0];
    const password = req.body.password[0];
    console.log("req 17 ", req.body);
    console.log("req ee 17 ", req.body.email[0]);
    console.log("res ", res);
        const sql = "INSERT INTO login (id, name, email, password) VALUES (?,?,?,?,?)";
    // const values = [
    // ];
    db.query(sql, [id, name, email, password], (err, result) => {
        console.log("Result 28 : ", result);
        if(err) {
            return res.json("Error at query 24")
        } else {
            res.send("Value inserted");
        }
    });
});

app.listen(PORT,()=> {
    console.log(`Server Listening on ${PORT}`)
});

