const fs = require('fs');
const express = require('express');
const bodyParser =require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded());

const data =fs.readFileSync('./database.json');
const conf =JSON.parse(data);
const mariadb = require('mariadb');
// var router = express.Router();


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

      const rows1 = await conn.query("SELECT * FROM  board");
      app.get('/api/board',(req,res)=>{
          res.send(rows1)
      })

      const rows2 = await conn.query("SELECT * FROM  roadtest");
      app.get('/api/roadtest',(req,res)=>{
          res.send(rows2)
      })
      
      // const rows4 = await conn.query("SELECT numID,BusRoad FROM roaddetail");
      // app.get('/api/roaddetail',(req,res)=>{
      //     res.send(rows4)
      // })

      app.post('/api/roaddetail',async(req,res) => {
        var startAreas = req.body.startAreas;
        console.log(startAreas)
        var rows3 = await conn.query(
          "SELECT * FROM  roaddetail WHERE StartArea = ? order by numID",
          [startAreas]
          );
          if(rows3.length>0){
            res.send({'success':true,'startAreas':JSON.stringify(rows3)});
          }
          else {
            res.send({'success':false,'startAreas':'network error'});
          }
      })



      app.post('/api/users',async(req,res)=> {
        var username= req.body.username;
        var password= req.body.password;

        const re = await conn.query(
          "SELECT * from users WHERE username =? AND password = ?", 
          [username,password] 
        );

        if(re.length > 0) {
          res.send({'success': true, 'user': JSON.stringify(re[0])});
        } else {
          res.send({'success': false, 'message': 'User not found'});
        }
      
      })
      

    } catch (err) {
      throw err;
    } finally {
      if (conn) conn.release(); //release to pool
    }
  }
asyncFunction();
app.listen (port, () => console.log(`${port}`));


  // app.get('/api/users',(req,res)=> {
      //   var username = req.body.username;
      //   var password = req.body.password;

      //   const sqlSelect = "SELECT * FROM uesrs";
      //   conn.query(sqlSelect, (err,result)=> {
      //     res.send(result);
      //   })
      // })


      //  conn.query(
      //     "SELECT * FROM users WHERE username = ? AND password = ?",
      //     [username,password], function(err,row,field) {

      //       if(err) {
      //         console.log(err);
      //         res.send({ 'success': false, 'message': 'could not coonect do db'});
      //       }
      //       if(row.length > 0) {
      //         res.send({ 'success': true, 'user':row[0].username});
      //       } else {
      //         res.send({'success':false, 'message':'User not found'})
      //       } 
      //    }
      //   );