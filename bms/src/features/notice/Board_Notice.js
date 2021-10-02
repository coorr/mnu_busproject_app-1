import React, { useState, useEffect } from 'react';
import moment from 'moment';
// 안써도 자동으로 한국 시간을 불러온다. 명확하게 하기 위해 import
import 'moment/locale/ko';
import './Board_Notice.css';
import Pagination from '../pagination/Pagination';
import { Link } from 'react-router-dom';

export function Board_Notice() {
  const [boards, setBoards] = useState([]); // usestate 로 state 상태 관리.
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(13); //12
  //componentdidmount + componentdidupdate 랑 동일

  useEffect(() => {
    const fetchData = () => {
      try {
        //왼쪽 값 설정값 있을 시에만 오른쪽값 조회
        fetch('http://112.164.190.84:5000/api/board', {
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
              setLoading(false);
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

  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  function currentPosts(tmp) {
    let currentPosts = 0;
    currentPosts = tmp.slice(indexOfFirst, indexOfLast);
    return currentPosts;
  }

  const dateParse = notice_date => {
    // 날짜 파싱하는 함수
    let ndate = moment(notice_date).format('YYYY-MM-DD');
    return ndate;
  };

  const cboards = currentPosts(boards);
  const lists = loading => {
    return (
      <>
        {/* { loading && … } 부분은, loading 값이 true일 때 && 다음의 것을 표시한다는 의미 */}
        {loading && <div> loading... </div>}
        {cboards.map(board => (
          <Link
            to={{
              pathname: `notice_read/${board?.pid}`,
              state: {
                data: board,
              },
            }}
          >
            <div className="btitlebox" key={board?.pid}>
              <div className="bnotice_pid">{board?.pid}</div>
              <div className="bnotice_title">{board?.title}</div>
              <div className="bnotice_writer">{board?.writer}</div>
              <div className="bnotice_date">{dateParse(board?.udate)}</div>
            </div>
          </Link>
        ))}
      </>
    );
  };

  return (
    <div>
      <div className="headlinebox">
        <div className="header_pid">번호</div>
        <div className="header_title">제목</div>
        <div className="header_writer">작성자</div>
        <div className="header_date">게시일</div>
      </div>
      <div>
        {lists(loading)}
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={boards.length}
          paginate={setCurrentPage}
          current={currentPage}
        />
      </div>
      <Link to="notice_write">
        <div className="wrtie_button">글쓰기</div>
      </Link>
    </div>
  );
}

export default Board_Notice;
