const mysql = require('mysql2/promise')
const dotenv =  require('dotenv');


dotenv.config();
const con = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT
});


// ! Check
con.getConnection((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log("Successfully Connected to Database");
});

module.exports = con;

