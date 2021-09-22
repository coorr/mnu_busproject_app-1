import React, { useState, useEffect } from 'react';
import './Reserve.css';
import { UserCount } from '../usercount/UserCount';
import Pagination from '../pagination/Pagination';

export function Reserve() {
  const [reserve, setReserve] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(15); //

  useEffect(() => {
    const fetchData = () => {
      try {
        //왼쪽 값 설정값 있을 시에만 오른쪽값 조회
        fetch('http://112.164.190.62:5000/api/reserve_data', {
          method: 'post',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json; charset=UTF-8',
          },
        })
          .then(response => response.json())
          .then(res => {
            if (res.success === true) {
              setReserve(res.reserve_data);
              console.log(res.reserve_data[0]);
              setLoading(false);
            } else {
              alert(res.message);
              setLoading(false);
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
    console.log('test');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  function currentPosts(tmp) {
    let currentPosts = 0;
    currentPosts = tmp.slice(indexOfFirst, indexOfLast);
    return currentPosts;
  }

  const creserve = currentPosts(reserve);
  const lists = loading => {
    return (
      <>
        {/* { loading && … } 부분은, loading 값이 true일 때 && 다음의 것을 표시한다는 의미 */}
        {loading && <div> loading... </div>}
        {
          <div className="headerbox">
            <div className="box">예약자 </div>
            <div className="box">출발지 </div>
            <div className="box">도착지 </div>
            <div className="box">출발 시간 </div>
            <div className="box">좌석 번호 </div>
            <div className="box">예약 시간 </div>
            <div className="box">상태 </div>
          </div>
        }
        {creserve.map(rlist => (
          <div className="btitlebox">
            <div className="bnotice_pid">{rlist?.uid}</div>
            <div className="bnotice_pid">{rlist?.start_point}</div>
            <div className="bnotice_pid">{rlist?.end_point}</div>
            <div className="bnotice_pid">{rlist?.start_time}</div>
            <div className="bnotice_pid">{rlist?.reserve_seat}</div>
            <div className="bnotice_pid">{rlist?.reserve_datetime}</div>
            <div className="bnotice_pid">{rlist?.status}</div>
          </div>
        ))}
      </>
    );
  };

  return (
    <div>
      <div>
        <UserCount />
      </div>
      <div>
        {lists(loading)}
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={reserve.length}
          paginate={setCurrentPage}
          current={currentPage}
        />
      </div>
    </div>
  );
}

export default Reserve;
