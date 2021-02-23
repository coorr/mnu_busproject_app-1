const fs = require('fs');
const express = require('express');
const bodyParser =require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const data =fs.readFileSync('./database.json');
const conf =JSON.parse(data);
const mariadb = require('mariadb');


const connection = mariadb.createPool({
    host:conf.host,
    user:conf.user,
    password:conf.password,
    port:conf.port,
    database:conf.database
});


async function asyncFunction() {
    let conn;
    try {
  
      conn = await connection.getConnection();
      const rows = await conn.query("SELECT * FROM user");
      app.get('/api/user',(req,res)=>{
          res.send(rows)
      })
    
    } catch (err) {
      throw err;
    } finally {
      if (conn) conn.release(); //release to pool
    }
  }
asyncFunction();

app.listen (port, () => console.log(`${port}`));