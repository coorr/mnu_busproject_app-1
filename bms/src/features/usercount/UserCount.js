import React from 'react';
import './UserCount.css';

export function UserCount() {
  return (
    <div className="box">
      <div className="left">
        <p>TODAY</p>
        <p>12</p>
      </div>
      <div className="right">
        <p>TOTAL</p>
        <p>20202</p>
      </div>
    </div>
  );
}

export default UserCount;
