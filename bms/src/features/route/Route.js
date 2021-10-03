import React, { useState, useEffect } from 'react';
import moment from 'moment';
// 안써도 자동으로 한국 시간을 불러온다. 명확하게 하기 위해 import
import 'moment/locale/ko';
import './Route.css';
import { Link } from 'react-router-dom';
import Pagination from '../pagination/Pagination';
export function Route() {
  const [routes, setRoutes] = useState([]); // usestate 로 state 상태 관리.
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(15); //표시갯수
  //componentdidmount + componentdidupdate 랑 동일

  useEffect(() => {
    const fetchData = () => {
      try {
        //왼쪽 값 설정값 있을 시에만 오른쪽값 조회
        fetch('http://112.164.190.87:5000/api/route', {
          method: 'post',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json; charset=UTF-8',
          },
        })
          .then(response => response.json())
          .then(res => {
            if (res !== null) {
              setRoutes(res);
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

  const cboards = currentPosts(routes);
  const lists = loading => {
    return (
      <>
        {/* { loading && … } 부분은, loading 값이 true일 때 && 다음의 것을 표시한다는 의미 */}
        {loading && <div> loading... </div>}
        {cboards.map(route => (
          <Link
            to={{
              pathname: `route_read/${route?.numID}`,
              state: {
                data: route,
              },
            }}
          >
            <div className="btitlebox" key={route?.numID}>
              <div className="bnotice_pid">{route?.numID}</div>
              <div className="bnotice_pid">{route?.local}</div>
              <div className="bnotice_pid">{route?.direction}</div>
              <div className="bnotice_pid">{route?.route_type}</div>
              <div className="bnotice_pid">{route?.start_point}</div>
              <div className="bnotice_pid">{route?.end_point}</div>
              <div className="bnotice_pid">{route?.start_time}</div>
              <div className="bnotice_pid">{route?.count}</div>
            </div>
          </Link>
        ))}
      </>
    );
  };

  return (
    <div>
      <div className="headlinebox">
        <div className="header_pid">노선번호</div>
        <div className="header_pid">지역</div>
        <div className="header_pid">방면</div>
        <div className="header_pid">등,하교</div>
        <div className="header_pid">시점</div>
        <div className="header_pid">종점</div>
        <div className="header_pid">출발시간</div>
        <div className="header_pid">운행횟수</div>
      </div>
      <div>
        {lists(loading)}
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={routes.length}
          paginate={setCurrentPage}
          current={currentPage}
        />
      </div>
      <Link
        to={{
          pathname: 'route_write',
          state: {
            data: routes,
          },
        }}
      >
        <div className="wrtie_button">노선 추가</div>
      </Link>
    </div>
  );
}

export default Route;
