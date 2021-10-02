import React, { useState } from 'react';
import './Route_UpdateView.css';
import { useHistory, withRouter, useLocation } from 'react-router-dom';
import moment from 'moment';
// 안써도 자동으로 한국 시간을 불러온다. 명확하게 하기 위해 import
import 'moment/locale/ko';

export function Route_UpdateView() {
  const location = useLocation();
  const data = location.state.udata;
  const pnumberID = data?.numID;
  const [inputs, setinputs] = useState({
    numID: data?.numID,
    route_type: data?.route_type,
    local: data?.local,
    direction: data?.direction,
    start_point: data?.start_point,
    end_point: data?.end_point,
    start_time: data?.start_time,
    count: data?.count,
    station_numID: data?.station_numID,
  });

  const {
    numID,
    route_type,
    local,
    direction,
    start_point,
    end_point,
    start_time,
    count,
    station_numID,
  } = inputs;

  const onChange = e => {
    const { name, value } = e.target;

    const nextinputs = {
      ...inputs,
      [name]: value,
    };
    setinputs(nextinputs);
  };

  // 작성한 텍스트가 없을 경우 바로 목록으로 이동 . 있을 경우 경고문구 확인할 경우만 목록이동
  const history = useHistory(); // do this inside the component
  const confirmModal_golist = () => {
    if (
      numID !== '' ||
      route_type !== '' ||
      local !== '' ||
      direction !== '' ||
      start_point !== '' ||
      end_point !== '' ||
      start_time !== '' ||
      count !== '' ||
      station_numID !== ''
    ) {
      if (
        // eslint-disable-next-line no-alert
        window.confirm('작성중인 문서가 취소됩니다. 목록으로 이동하시겠습니까?')
      ) {
        history.push('/route');
      }
    } else {
      history.push('/route');
    }
  };
  const fetchupdate = async () => {
    try {
      //왼쪽 값 설정값 있을 시에만 오른쪽값 조회
      await fetch('http://112.164.190.84:5000/api/route_update', {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
          pnumId: pnumberID,
          numID: numID,
          route_type: route_type,
          local: local,
          direction: direction,
          start_point: start_point,
          end_point: end_point,
          start_time: start_time,
          count: count,
          station_numID: station_numID,
        }),
      })
        .then(response => response.json())
        .then(res => {
          if (res.success === true) {
            // eslint-disable-next-line no-alert
            alert('저장에 성공했습니다.');
            history.push('/route');
          } else {
            // eslint-disable-next-line no-alert
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
  //add 기능 추가
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
          <div className="slt_left_title">순서변경</div>
          <div className="slt_title">순서</div>
          <div className="slt_title">정류장 번호</div>
          <div className="slt2_title">정류장</div>
          <div className="slt_right_title">추가/삭제</div>
        </div>
        {rearray.map((station_array, index) => (
          <div className="row2">
            <div className="slt_left">
              <div className="slt_left_top">위</div>
              <div className="slt_left__bottom">아래</div>
            </div>
            <div className="slt">{index + 1}</div>
            <div className="slt">{station_array[0]}</div>
            <div className="slt2">{station_array[1]}</div>
            <div className="slt_right">minus</div>
          </div>
        ))}
        <div className="row2">
          <div className="slt_left2">노선추가</div>
          <div className="slt">{rearray.length + 1}</div>
          <div className="slt">인풋박스</div>
          <div className="slt2">인풋박스</div>
          <div className="slt_right">add</div>
        </div>
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
          <div className="c2">
            <input
              autoComplete="off"
              type="number"
              id="input_value"
              name="numID"
              placeholder="노선 번호"
              onChange={onChange}
              value={numID}
            />
          </div>
          <div className="c1">노선 유형</div>
          <div className="c2">
            <input
              autoComplete="off"
              type="text"
              id="input_value"
              name="route_type"
              placeholder="노선 번호"
              onChange={onChange}
              value={route_type}
            />
          </div>
        </div>
        <div className="row">
          <div className="c1">지역</div>
          <div className="c2">
            <input
              autoComplete="off"
              type="text"
              id="input_value"
              name="local"
              placeholder="노선 번호"
              onChange={onChange}
              value={local}
            />
          </div>
          <div className="c1">방면</div>
          <div className="c2">
            {
              <input
                autoComplete="off"
                type="text"
                id="input_value"
                name="direction"
                placeholder="노선 번호"
                onChange={onChange}
                value={direction}
              />
            }
          </div>
        </div>
        <div className="row">
          <div className="c1">기점 (출발)</div>
          <div className="c2">
            <input
              autoComplete="off"
              type="text"
              id="input_value"
              name="start_point"
              placeholder="노선 번호"
              onChange={onChange}
              value={start_point}
            />
          </div>
          <div className="c1">종점 (도착)</div>
          <div className="c2">
            <input
              autoComplete="off"
              type="text"
              id="input_value"
              name="end_point"
              placeholder="노선 번호"
              onChange={onChange}
              value={end_point}
            />
          </div>
        </div>
        <div className="row">
          <div className="c1">출발시간</div>
          <div className="c2">
            <input
              autoComplete="off"
              type="text"
              id="input_value"
              name="start_time"
              placeholder="노선 번호"
              onChange={onChange}
              value={start_time}
            />
          </div>
          <div className="c1">운행횟수</div>
          <div className="c2">
            <input
              autoComplete="off"
              type="number"
              id="input_value"
              name="count"
              placeholder="노선 번호"
              onChange={onChange}
              value={count}
            />
          </div>
        </div>
      </div>
      <div className="title_header">{data?.numID}번 노선정보</div>
      {data?.station_numID === '' ? <div>등록된 정류장이 없습니다.</div> : list}

      <div className="input_buttonbox">
        <div className="golist" onClick={() => confirmModal_golist()}>
          목록
        </div>
        <div
          className="input_notice"
          onClick={() => {
            if (
              numID !== '' ||
              route_type !== '' ||
              local !== '' ||
              direction !== '' ||
              start_point !== '' ||
              end_point !== '' ||
              start_time !== '' ||
              count !== '' ||
              station_numID !== ''
            ) {
              fetchupdate();
            } else {
              alert('제목과 내용을 모두 입력해주세요.');
            }
          }}
        >
          수정
        </div>
      </div>
    </div>
  );
}

export default withRouter(Route_UpdateView);
