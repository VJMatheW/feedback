const mysql = require('mysql');

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

connection.connect((err)=>{
    if(err){
        console.log("Error Connecting database : ",err)
        return
    }
    console.log("MySQL Database Connected")
})

module.exports = connection;