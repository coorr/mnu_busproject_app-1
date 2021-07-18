import React, { useState } from 'react';
import moment from 'moment';
// 안써도 자동으로 한국 시간을 불러온다. 명확하게 하기 위해 import
import 'moment/locale/ko';

export function Notice() {
  const [boards, setBoards] = useState('');
  const dateParse = notice_date => {
    // 날짜 파싱하는 함수
    let ndate = moment(notice_date).format('YYYY-MM-DD');
    return ndate;
  };

  const fetchData = async () => {
    try {
      //왼쪽 값 설정값 있을 시에만 오른쪽값 조회
      await fetch('http://192.168.0.9:5000/api/board', {
        method: 'get',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json; charset=UTF-8',
        },
      })
        .then(response => response.json())
        .then(res => {
          if (res.success === true) {
            var reserve = JSON.parse(res.reserve);
            setBoards(boards + reserve);
          } else {
            console.log('testdsa');
          }
        })
        .done();
    } catch (err) {
      console.log(err);
    }
  };
  fetchData();

  return (
    <div>
      <p>test</p>
      게시판
    </div>
  );
}

export default Notice;
