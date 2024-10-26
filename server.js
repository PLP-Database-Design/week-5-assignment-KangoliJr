// HTTP framework 
const express = require('express');

//  Instance for express framework
const app = express();

// DMS 
const mysql = require('mysql2');

// cross origin
const cors = require('cors');

// enbvironment variable
const dotenv = require('dotenv');

app.use(express.json());
app.use(cors());
dotenv.config();

// MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

//  check for connection
db.connect((err) =>{
    // If no connection
    if(err) return console.log("Error in connecting to SQL");
    // if connected
    console.log("Connected to sQL", db.threadId);
});

// codes
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Codes for the data

// question 1 retrieve all patients

app.get('/data', (req,res) => {

    // Question 1 Retrieve data from database 
    db.query('SELECT * FROM patients', (err, results) =>{
        if (err){
            console.error(err);
            res.status(500).send('Error Retrieving data')
        }else {
            //Display the records to the browser 
            res.render('data', {results: results});
        }
    });
});

// Question 2 retrieve all providers
app.get('/data', (req,res) => {

    // Retrieve data from patients
    db.query('SELECT * FROM providers', (err, results) =>{
        if (err){
            console.error(err);
            res.status(500).send('Error Retrieving data')
        }else {
            //Display the records to the browser 
            res.render('data', {results: results});
        }
    });
});

// Question 3 filter patients by first name
app.get('/data', (req,res) => {

    // Retrieve data from parients 
    db.query('SELECT * FROM patients', (err, results) =>{
        if (err){
            console.error(err);
            res.status(500).send('Error Retrieving  patient data by first name data')
        }else {
            //Display the records to the browser 
            res.render('data', {results: results});
        }
    });
});

// Question 4 retrieve providers by specialities
app.get('/data', (req,res) => {

    // Retrieve data from providers
    db.query('SELECT * FROM providers', (err, results) =>{
        if (err){
            console.error(err);
            res.status(500).send('Error Retrieving  providers specialities data')
        }else {
            //Display the records to the browser 
            res.render('data', {results: results});
        }
    });
});
 

// Start the server
app.listen(process.env.PORT,() => {
    console.log(`Server is running on port ${process.env.PORT}`);

    // relay message to browser
    console.log(`Send message to browser`);
    app.get('/', (req,res) =>{
        res.send(`We are connected successfully`);
    });
});