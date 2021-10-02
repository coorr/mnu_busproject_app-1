/* eslint-disable no-alert */
import React, { useState, useEffect } from 'react';
import { useHistory, useLocation, withRouter, Link } from 'react-router-dom';
import moment from 'moment';
// 안써도 자동으로 한국 시간을 불러온다. 명확하게 하기 위해 import
import 'moment/locale/ko';
import './Route_ReadView.css';

export function Route_ReadView() {
  const location = useLocation();
  const { data } = location.state; // 전달받은 값 데이터에 저장
  const history = useHistory(); // do this inside the component

  const goBack = () => history.push('/route');
  const dateParse = () => {
    // 날짜 파싱하는 함수
    var d = new Date();
    let ndate = moment(d).format('YYYY-MM-DD');
    return ndate;
  };
  const fetchdelete = async () => {
    try {
      //왼쪽 값 설정값 있을 시에만 오른쪽값 조회
      await fetch('http://112.164.190.84:5000/api/route_delete', {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
          numID: data?.numID,
        }),
      })
        .then(response => response.json())
        .then(res => {
          if (res.success === true) {
            alert('노선을 삭제했습니다.');
            history.goBack();
          } else {
            alert('노선을 등록하지 못했습니다.');
          }
        })
        .catch(error => {
          console.log(error);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const confirmModal_delete = () => {
    if (window.confirm('노선을 삭제하시겠습니까?')) {
      fetchdelete();
    } else {
      console.log('취소. 변화 없음');
    }
  };

  const confirmModal_edit = () => {
    if (window.confirm('노선을 수정하시겠습니까?')) {
      history.push({
        pathname: '/route_update',
        state: { udata: data },
      });
    } else {
      console.log('취소. 변화 없음');
    }
  };
  const station_read = () => {
    var rearray = [];
    var ar = data?.station_numID.split(',');
    // 정류장의 갯수만큼 나눠서 배열 추가
    for (var i = 0; ar.length > i; i++) {
      rearray.push(ar[i].split('-'));
    }
    return (
      <div className="table4">
        <div className="row2_title">
          <div className="slt_title">순서</div>
          <div className="slt_title">정류장 번호</div>
          <div className="slt2_title">정류장</div>
        </div>
        {rearray.map((station_array, index) => (
          <div className="row2">
            <div className="slt">{index + 1}</div>
            <div className="slt">{station_array[0]}</div>
            <div className="slt2">{station_array[1]}</div>
          </div>
        ))}
      </div>
    );
  };

  const list = station_read();
  return (
    <div className="container">
      <div className="title_header">{data?.numID}번 버스정보</div>
      <div className="table3">
        <div className="row">
          <div className="c1">노선 번호</div>
          <div className="c2">{data?.numID}</div>
          <div className="c1">노선 유형</div>
          <div className="c2">{data?.route_type}</div>
        </div>
        <div className="row">
          <div className="c1">지역</div>
          <div className="c2">{data?.local}</div>
          <div className="c1">방면</div>
          <div className="c2">{data?.direction}</div>
        </div>
        <div className="row">
          <div className="c1">기점 (출발)</div>
          <div className="c2">{data?.start_point}</div>
          <div className="c1">종점 (도착)</div>
          <div className="c2">{data?.end_point}</div>
        </div>
        <div className="row">
          <div className="c1">출발시간</div>
          <div className="c2">{data?.start_time}</div>
          <div className="c1">운행횟수</div>
          <div className="c2">{data?.count}</div>
        </div>
      </div>
      <div className="title_header">{data?.numID}번 노선정보</div>
      {data?.station_numID === '' ? <div>등록된 정류장이 없습니다.</div> : list}

      <div className="cbox">
        <div className="golist" onClick={goBack}>
          목록
        </div>

        <div className="editbutton" onClick={confirmModal_edit}>
          수정
        </div>

        <div className="deletebutton" onClick={confirmModal_delete}>
          삭제
        </div>
      </div>
    </div>
  );
}

export default withRouter(Route_ReadView);
