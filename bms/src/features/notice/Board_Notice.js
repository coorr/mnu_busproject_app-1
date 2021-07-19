import React, { useState, useEffect } from 'react';
import moment from 'moment';
// 안써도 자동으로 한국 시간을 불러온다. 명확하게 하기 위해 import
import 'moment/locale/ko';
import './Board_Notice.css';

export function Board_Notice() {
  const [boards, setBoards] = useState([]); // usestate 로 state 상태 관리.
  //componentdidmount + componentdidupdate 랑 동일
  useEffect(() => {
    const fetchData = async () => {
      try {
        //왼쪽 값 설정값 있을 시에만 오른쪽값 조회
        await fetch('http://172.16.2.171:5000/api/board', {
          method: 'get',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json; charset=UTF-8',
          },
        })
          .then(response => response.json())
          .then(res => {
            if (res !== null) {
              setBoards(res);
            } else {
              console.log('load fail');
            }
          })
          .catch(error => {
            console.log(error);
          });
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const dateParse = notice_date => {
    // 날짜 파싱하는 함수
    let ndate = moment(notice_date).format('YYYY-MM-DD');
    return ndate;
  };

  const listnum = boards.length; // 갯수 조절.
  const list5 = () => {
    const result = [];
    for (let i = 0; i < listnum; i++) {
      result.push(boards[i]);
    }
    return result;
  };

  const list = list5().map(board => (
    <div className="btitlebox">
      <div className="bnotice_pid">{board?.pid}</div>
      <div className="bnotice_title">{board?.title}</div>
      <div className="bnotice_writer">{board?.writer}</div>
      <div className="bnotice_date">{dateParse(board?.udate)}</div>
    </div>
  ));

  return (
    <div>
      <div className="headlinebox">
        <div className="header_pid">번호</div>
        <div className="header_title">제목</div>
        <div className="header_writer">작성자</div>
        <div className="header_date">게시일</div>
      </div>
      <div> {list}</div>
    </div>
  );
}

export default Board_Notice;
