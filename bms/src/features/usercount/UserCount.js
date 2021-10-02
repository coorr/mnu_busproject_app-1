import React, { useEffect, useState } from 'react';
import './UserCount.css';

export function UserCount() {
  const [count, setCount] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetch('http://112.164.190.84:5000/api/user_count', {
          method: 'post',
          headers: {
            accept: 'application/json',
            'content-Type': 'application/json; charset=UTF-8',
          },
        })
          .then(response => response.json())
          .then(res => {
            if (res !== null) {
              setCount(res[0]);
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
  }, []); // default = re-render , [] = 첫 1회만 렌더링

  return (
    <div className="box">
      <div className="left">
        {/* 당일 예약자 수 */}
        <p>TODAY</p>
        <p>{count?.today}</p>
      </div>
      <div className="right">
        {/* 누적 예약자 수 */}
        <p>TOTAL</p>
        <p>{count?.total}</p>
      </div>
    </div>
  );
}

export default UserCount;
