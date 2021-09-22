import React, { useState, useEffect } from 'react';
import moment from 'moment';
// 안써도 자동으로 한국 시간을 불러온다. 명확하게 하기 위해 import
import 'moment/locale/ko';
import './Main_Notice.css';
import { Link } from 'react-router-dom';

export function Main_Notice() {
  const [boards, setBoards] = useState([]); // usestate 로 state 상태 관리.
  //componentdidmount + componentdidupdate 랑 동일
  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetch('http://112.164.190.62:5000/api/board', {
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
  }, [boards]); // default = re-render , [] = 첫 1회만 렌더링

  const dateParse = notice_date => {
    // 날짜 파싱하는 함수
    let ndate = moment(notice_date).format('YYYY-MM-DD');
    return ndate;
  };

  const listnum = 5;
  const list5 = () => {
    const result = [];
    for (let i = 0; i < listnum; i++) {
      result.push(boards[i]);
    }
    return result;
  };

  const list = list5().map(board => (
    <div className="titlebox">
      <li className="notice_title_text" key={board?.pid}>
        <Link
          to={{
            pathname: `notice_read/${board?.pid}`,
            state: {
              data: board,
            },
          }}
        >
          {board?.title}
        </Link>
      </li>
      {dateParse(board?.udate)}
    </div>
  ));

  return <div> {list}</div>;
}

export default Main_Notice;
