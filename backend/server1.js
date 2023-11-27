const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const PORT = 8081;
const app = express();
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const { response } = require('express');
const salt = 10;
// const bodyParser1 = require('./public/images');

// app.use(cors());
// app.use(express.json());

//use express static folder
app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["POST", "GET"],
  credentials: true
}));
app.use(express.static("./public"))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



// Create a connection to the MySQL database
const connection = mysql.createConnection({
  host: 'localhost',     // Your MySQL server's hostname or IP address
  user: 'root', // Your MySQL username
  password: 'Aloha@2024', // Your MySQL password
  database: 'formdb' // Name of the database you want to connect to
});

connection.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
      return;
    }
    console.log('Connected to MySQL database');
  });




//! Use of Multer
var storage = multer.diskStorage({
  destination: (req, file, callBack) => {
      callBack(null, './public/images/')     // './public/images/' directory name where save the file
  },
  filename: (req, file, callBack) => {
      callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})

var upload = multer({
  storage: storage
});


const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if(!token) {
    return res.json({Error: "You are Unauthorized"})
  } else {
    jwt.verify(token, "jwt-secret-key", (err, decoded) => {
      if(err) {
        return res.json({Error: "Incorrect Token"})
      } else {
        req.name = decoded.name;
        console.log("req.name75", req.name);
        console.log("decoded.name75", decoded.name);
        next();
      }
    })
  }
}

app.get('/create', verifyUser,(req,res) => {
  return res.json({Status: "Success", name: req.name});
});



  app.post("/upload", upload.single('image') ,(req, res) => {
    console.log("req 345 ", req.body);
    console.log("jdsfgjdfs",req.file)
    if (!req.file) {
      console.log("No file upload");
  } else {
      console.log("jjj",req.file.filename)
      var imgsrc = 'http://127.0.0.1:3000/images/' + req.file.filename
      var insertData = "INSERT INTO users_file(file_src)VALUES(?)"
      db.query(insertData, [imgsrc], (err, result) => {
          if (err) throw err
          console.log("file uploaded")
      })
  }
    // console.log("req filwe1 ", req);
    res.send("okkkk")
    // const firstName = req.body.firstName;
    // const lastName = req.body.lastName;
    // const age = req.body.age;
    // const mobileNumber = req.body.mobileNumber;
    // const image = req.body.image;
    // /create
    // const position = req.body.position;

    // const sqlQuery = "INSERT INTO `datatable` (firstName, lastName, age, mobileNumber, image) VALUES (?,?,?,?,?)";
    // connection.query(sqlQuery, [String(firstName),String(lastName),age, mobileNumber, String(image)], (err, results) => {
    //   if (err) {
    //     console.error('Error executing query:', err);
    //     return;
    //   }
    
    //   // Process the query results
    //   console.log('Query results:', results);
    //     });
    
  });
  

app.post("/create",(req, res) => {
    console.log("req 17 ", req.body);
    console.log("req filwe ", req.file);
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const age = req.body.age;
    const mobileNumber = req.body.mobileNumber;
    const image = req.body.image;
    // /create
    // const position = req.body.position;

    const sqlQuery = "INSERT INTO `datatable` (firstName, lastName, age, mobileNumber, image) VALUES (?,?,?,?,?)";
    connection.query(sqlQuery, [String(firstName),String(lastName),age, mobileNumber, String(image)], (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        return;
      }
    
      // Process the query results
      console.log('Query results:', results);
        });
    
  });

  app.post("/editemployee", (req, res) => {
    console.log("req 17777 ", req.body);
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const age = req.body.age;
    const mobileNumber = req.body.mobileNumber;
    const image = req.body.image;
    const oldNumber = req.body.oldRecord.mobileNumber;
    console.log("oldNumber", mobileNumber);
    // const position = req.body.position;
    // DELETE FROM datatable WHERE mobileNumber= ;
    // const sqlQuery = "INSERT INTO `datatable` (firstName, lastName, age, mobileNumber) VALUES (?,?,?,?)";
    const sqlQuery = "UPDATE datatable SET firstName = ?, lastName = ?, age = ?, mobileNumber = ?, image = ? WHERE mobileNumber = ?";
    connection.query(sqlQuery, [firstName,lastName,age,mobileNumber, image, oldNumber], (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        return;
      }
    
      // Process the query results
      console.log('Query results:', results);
        });
    
  });

  app.post("/deleteemployee", (req, res) => {
    console.log("req 17779999 ", req.body);
    // const mobileNumber = req.body.firstName;
    // const lastName = req.body.lastName;
    // const age = req.body.age;
    const mobileNumber = req.body.mobileNumber;
    console.log("mobileNumber55", mobileNumber);
    // const position = req.body.position;
    // DELETE FROM datatable WHERE mobileNumber= ;
    // const sqlQuery = "INSERT INTO `datatable` (firstName, lastName, age, mobileNumber) VALUES (?,?,?,?)";
    const sqlQuery = "DELETE FROM datatable WHERE mobileNumber= ?;";
    connection.query(sqlQuery, [mobileNumber], (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        return;
      }
    
      // Process the query results
      console.log('Query results:', results);
        });
    
  });

  // app.get("/employees", (req, res) => {
  //   console.log("req 17 ", req.body);
  //   const firstName = req.body.firstName;
  //   const lastName = req.body.lastName;
  //   const age = req.body.age;
  //   const mobileNumber = req.body.mobileNumber;
  //   // const position = req.body.position;

  //   const sqlQuery = "INSERT INTO `datatable` (firstName, lastName, age, mobileNumber) VALUES (?,?,?,?)";
  //   connection.query(sqlQuery, [String(firstName),String(lastName),age, mobileNumber], (err, results) => {
  //     if (err) {
  //       console.error('Error executing query:', err);
  //       return;
  //     }
    
  //     // Process the query results
  //     console.log('Query results:', results);
  //       });
    
  // });

  app.get("/employees", (req, res) => {
    connection.query("SELECT * FROM datatable", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });

  

app.post('/signup', (req,res) => {
    let id = 1623474;
    bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
      if(err) return res.json({Error: "Line 24 Error for hashing password"});
      let password = req.body.password;
      password = hash;
      console.log("hash password ", password);
      
    const name = req.body.name;
    const email = req.body.email;
    console.log("req 17 ", req.body);
    console.log("req ee 76 ", req.body.email[0]);

    // const values = {
    //   name: String(name),
    //   email: String(email),
    //   password: String(password)
    // }

    // Connect to the database
// connection.connect((err) => {
//     if (err) {
//       console.error('Error connecting to MySQL:', err);
//       return;
//     }
//     console.log('Connected to MySQL database');
//   });

    // console.log("res ", res);
        // const sql = "INSERT INTO login (name, email, password) VALUES (?)";
        const sqlQuery = "INSERT INTO `login` (name, email, password) VALUES (?,?,?)";
    // const values = [
    // ];
    // const sqlQuery = 'select * from login';
// 'SELECT * FROM your_table';

connection.query(sqlQuery, [String(name),String(email),String(password)], (err, results) => {
  if (err) {
    res.json({Error: "Server error"});
    console.error('Error executing query:', err);
    return;
  }

  if(results) {
    res.json({Status: "Success"})
  }
  // Process the query results
  console.log('Query results:', results);

  // Close the connection when done
  // connection.end((err) => {
  //   if (err) {
  //     console.error('Error closing connection:', err);
  //     return;
  //   }
  //   console.log('Connection closed');
  // });
    // db.query(sql, [id, name, email, password], (err, result) => {
    //     console.log("Result 28 : ", result);
    //     if(err) {
    //         return res.json("Error at query 24")
    //     } else {
    //         res.send("Value inserted");
    //     }
    });
  })
});

app.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const sqlQuery = "SELECT * FROM login WHERE email = ? AND password = ?";
  connection.query(sqlQuery, [String(email),String(password)], (err, results) => {
    if (err) {
      res.send({err: err})
      console.error('Error executing query:', err);
      return;
    }
    
    if(results) {
      res.send(results)
      console.log('Query results:', results);
    } else {
      res.send({message: "Invalid Email/Password!"});
    }
  
    // Process the query results
  
    // Close the connection when done
    // connection.end((err) => {
    //   if (err) {
    //     console.error('Error closing connection:', err);
    //     return;
    //   }
    //   console.log('Connection closed');
    // });
      // db.query(sql, [id, name, email, password], (err, result) => {
      //     console.log("Result 28 : ", result);
      //     if(err) {
      //         return res.json("Error at query 24")
      //     } else {
      //         res.send("Value inserted");
      //     }
      });
});

app.post('/logina', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const sqlQuery = "SELECT * FROM login WHERE email = ?";
  connection.query(sqlQuery, [String(email)], (err, results) => {
    if(results.length > 0) {
      bcrypt.compare(req.body.password.toString(), results[0].password, (err, response) => {
        if(err) return res.json({Error: "Password compare error"})
        if(response) {
          const name = results[0].name;
          console.log('name:324', name);
          const token = jwt.sign({name}, "jwt-secret-key", {expiresIn: '1d'});
          res.cookie('token', token);
          return res.json({Status: "Success"})
        } else {
          res.json({Error: "Password not matched!"});
        }
      })
      if (err) {
        console.error('Error executing query:', err);
        return res.json({Error: "Login Error in server"});
      }
      
    } else {
      return res.json({Error: "No Account is existed with this Email"});
    }
  
    // Process the query results
  
    // Close the connection when done
    // connection.end((err) => {
    //   if (err) {
    //     console.error('Error closing connection:', err);
    //     return;
    //   }
    //   console.log('Connection closed');
    // });
      // db.query(sql, [id, name, email, password], (err, result) => {
      //     console.log("Result 28 : ", result);
      //     if(err) {
      //         return res.json("Error at query 24")
      //     } else {
      //         res.send("Value inserted");
      //     }
      });
});

app.listen(PORT,()=> {
    console.log(`Server Listening on ${PORT}`)
});