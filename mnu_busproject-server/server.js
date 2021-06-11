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

      const rows2 = await conn.query("SELECT * FROM  roadtest");
      app.get('/api/roadtest',(req,res)=>{
          res.send(rows2)
      })
      
      /
      app.post('/api/roaddetail',async(req,res) => {
        var startAreas = req.body.startAreas;
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

    const rows7 = await conn.query("SELECT local FROM  route group by local");
    app.get('/api/route_local',(req,res)=>{
        res.send(rows7)
    })

    app.post('/api/routes',async(req,res) => {
      var local = req.body.local;
      var rows8 = await conn.query(
        "SELECT * FROM  route WHERE local = ? order by start_point",
        [local]
        );
        if(rows8.length>0){
          res.send({'success':true,'route':JSON.stringify(rows8)});
        }
        else {
          res.send({'success':false,'route':'network error'});
        }
 
    })

    app.post('/api/reserve',async(req,res) => {
      var route = req.body.route;
      var start_date = req.body.start_date;
      var rows9 = await conn.query(
        "SELECT reserve_seat,uid FROM  reserve WHERE local = ? and start_date = ? order by reserve_seat",
        [route,start_date]
        );
     
        
        if(rows9.length>0){
          res.send({'success':true,'reserve':rows9});
        }
        else {
          res.send({'success':false,'message':'network error'});
        }
 
    })

    app.post('/api/reserve_check',async(req,res) => {
      var user = req.body.uid
      var rows6 = await conn.query(
        "SELECT * FROM reserve WHERE uid = ? AND start_date >= DATE_ADD(NOW(),INTERVAL -7 DAY)", // 지금 현재시간 ~ 7일전까지 범위 검색 uid 리턴 or * 리턴
        [user]
        );
     
        
        if(rows6.length>0){
          res.send({'success':false,'message':'예약 내역이 존재합니다.'}); // 예약테이블에 7일이내 예약기록이 있을 경우, 예약 실패
        }
        else {
          res.send({'success':true ,'reserve':JSON.stringify(rows6)}); // 조회 데이터 없을 경우 예약 가능.
        }
 
    })

    app.post('/api/reserve_input',async(req,res) => {
      var start =req.body.start;
      var end = req.body.end;
      var start_time = req.body.start_time;
      var route = req.body.route;
      var start_date = req.body.start_date;
      var reserve_seat = req.body.reserve_seat;
      var uid = req.body.uid;
      var rows4 = await conn.query(
        "INSERT INTO reserve (local,start_point,end_point,start_time,reserve_seat,start_date,uid) VALUES (?,?,?,?,?,?,?)",
        [start,route,end,start_time,reserve_seat,start_date,uid,]
        );
          
        if((JSON.stringify(rows4)) != '{"affectedRows": 1, "insertId": 0, "warningStatus": 0}'){
          res.send({'success':true});
        }
        else {
          res.send({'success':false,'reserve':'예매 실패'});
        }
 
    })

    app.post('/api/reserve_modify',async(req,res) => {
      var route = req.body.route;
      var start_date = req.body.start_date;
      var reserve_seat = req.body.reserve_seat;
      var uid = req.body.uid;
      var rows5 = await conn.query(
        "UPDATE reserve SET reserve_seat = ? WHERE route = ?  AND start_date= ? AND uid= ?; ", // 변경번호 , 경로,예약날, uid
        [reserve_seat,route,start_date,uid,]
        );
          
      
        if(rows5){
          res.send({'success':true,'reserve':rows5});
        }
        else {
          res.send({'success':false,'reserve':'예매변경 실패'});
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


 