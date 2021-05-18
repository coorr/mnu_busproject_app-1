const fs = require('fs');
const express = require('express');
const bodyParser =require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

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

      

      const rows1 = await conn.query("SELECT * FROM  board");
      app.get('/api/board',(req,res)=>{
          res.send(rows1)
      })

      // const rows2 = await conn.query("SELECT * FROM  roadtest");
      // app.get('/api/roadtest',(req,res)=>{
      //     res.send(rows2)
      // })
      
      // /
      // app.post('/api/roaddetail',async(req,res) => {
      //   var startAreas = req.body.startAreas;
      //   console.log(startAreas)
      //   var rows3 = await conn.query(
      //     "SELECT * FROM  roaddetail WHERE StartArea = ? order by numID",
      //     [startAreas]
      //     );
      //     if(rows3.length>0){
      //       res.send({'success':true,'startAreas':JSON.stringify(rows3)});
      //     }
      //     else {
      //       res.send({'success':false,'startAreas':'network error'});
      //     }
      // })



      app.post('/api/users',async(req,res) => {

        var username = req.body.username;
        var password = req.body.password;
        
      const re = await conn.query(
          "SELECT uid,uname,dept,stdnum FROM user WHERE uid = ? AND upw = ?",
          [username,password]
          );
          
          if(re.length>0) {
              res.send({'success':true,'user':JSON.stringify(re[0])});
          }
          else {
          res.send({'success':false,'message': 'User Not Found'});
          }

    })

    const rows3 = await conn.query("SELECT local FROM  route group by local");
    app.get('/api/route_local',(req,res)=>{
        res.send(rows3)
    })

    app.post('/api/routes',async(req,res) => {
      var local = req.body.local;
      var rows3 = await conn.query(
        "SELECT * FROM  route WHERE local = ? order by start_point",
        [local]
        );
        if(rows3.length>0){
          res.send({'success':true,'route':JSON.stringify(rows3)});
        }
        else {
          res.send({'success':false,'route':'network error'});
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


 