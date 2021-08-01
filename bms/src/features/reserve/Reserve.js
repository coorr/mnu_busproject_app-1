import React from 'react';
import './Reserve.css';

export function Reserve() {
  return (
    <div className="box">
      <div className="left">
        {/* 당일 예약자 수 */}
        <p>TODAY</p>
        <p>12</p>
      </div>
      <div className="right">
        {/* 누적 예약자 수 */}
        <p>TOTAL</p>
        <p>20202</p>
      </div>
    </div>
  );
}

export default Reserve;
