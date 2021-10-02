import React, { useState, useEffect } from 'react';
import moment from 'moment';
// 안써도 자동으로 한국 시간을 불러온다. 명확하게 하기 위해 import
import 'moment/locale/ko';
import './Station.css';
import Pagination from '../pagination/Pagination';
import { Link } from 'react-router-dom';

export function Station() {
  const [stations, setStations] = useState([]); // usestate 로 state 상태 관리.
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(15); //

  //componentdidmount + componentdidupdate 랑 동일

  useEffect(() => {
    const fetchData = () => {
      try {
        //왼쪽 값 설정값 있을 시에만 오른쪽값 조회
        fetch('http://112.164.190.84:5000/api/station', {
          method: 'post',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json; charset=UTF-8',
          },
        })
          .then(response => response.json())
          .then(res => {
            if (res !== null) {
              setStations(res);
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

  const dateParse = notice_date => {
    // 날짜 파싱하는 함수
    let ndate = moment(notice_date).format('YYYY-MM-DD');
    return ndate;
  };

  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  function currentPosts(tmp) {
    let currentPosts = 0;
    currentPosts = tmp.slice(indexOfFirst, indexOfLast);
    return currentPosts;
  }

  const cboards = currentPosts(stations);

  const lists = loading => {
    return (
      <>
        {/* { loading && … } 부분은, loading 값이 true일 때 && 다음의 것을 표시한다는 의미 */}
        {loading && <div> loading... </div>}
        {cboards.map(station => (
          <Link
            to={{
              pathname: `station_read/${station?.numID}`,
              state: {
                data: station,
              },
            }}
          >
            <div className="btitlebox" key={station?.numID}>
              <div className="bnotice_pid">{station?.direction}</div>
              <div className="bnotice_pid">{station?.numID}</div>
              <div className="bnotice_pid">{station?.roadname}</div>
            </div>
          </Link>
        ))}
      </>
    );
  };

  return (
    <div>
      <div className="headlinebox">
        <div className="header_pid">방면/지역</div>
        <div className="header_pid">정류장 번호</div>
        <div className="header_pid">정류장명</div>
      </div>
      <div>
        {lists(loading)}
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={stations.length}
          paginate={setCurrentPage}
          current={currentPage}
        />
      </div>

      <Link to="station_write">
        <div className="wrtie_button">정류장 추가</div>
      </Link>
    </div>
  );
}

export default Station;
