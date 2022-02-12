import React, { useState } from 'react';
import './Route_UpdateView.css';
import { useHistory, withRouter, useLocation } from 'react-router-dom';

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
    input_numID: '',
    input_station: '',
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
    input_numID,
    input_station,
  } = inputs;
  const ar = inputs.station_numID !== null ? station_numID.split(',') : '';
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
      station_numID !== null ||
      input_numID !== '' ||
      input_station !== ''
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
      await fetch('http://112.164.190.87:5000/api/route_update', {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
          pnumberID: pnumberID,
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
  const clickadd = () => {
    if (input_numID === '' || input_station === '') {
      alert('값을 입력해주세요.');
    } else if (station_numID === null) {
      const str = input_numID + '-' + input_station;
      setinputs({
        ...inputs,
        station_numID: ar.concat(str).toString(), // concat 은 새로운 배열 생성을 toString 으로 문자열로 변환
        input_numID: '',
        input_station: '',
      });
    } else if (
      station_numID.includes(input_numID) ||
      station_numID.includes(input_station)
    ) {
      alert('정류장 정보를 확인해 주세요.');
    } else if (isNaN(input_numID)) {
      alert('정류장 번호는 숫자를 입력해 주세요.');
    } else {
      const str = ',' + input_numID + '-' + input_station;

      setinputs({
        ...inputs,
        station_numID: inputs.station_numID.concat(str).toString(), // concat 은 새로운 배열 생성을 toString 으로 문자열로 변환
        input_numID: '',
        input_station: '',
      });
    }
  };
  //del 기능
  const clickdel = (a, b) => {
    if (a === '' || b === '') {
      var str = '';
    } else {
      var str = a + '-' + b;
    }

    var newarray = inputs.station_numID.split(','); // 배열 리턴.새로운 배열 생성하여 가져다가 작업.
    newarray.splice(newarray.indexOf(str), 1); // splice, newarray 배열을 직접수정하여 즉시 결과 저장.
    if (newarray.toString() !== '') {
      setinputs({
        ...inputs,
        station_numID: newarray.toString(),
      });
    } else {
      setinputs({
        ...inputs,
        station_numID: null,
      });
    }
  };

  //순서 바꿈 위.
  const clickup = (a, b) => {
    var str = a + '-' + b;
    var newarray = inputs.station_numID.split(','); // 배열 리턴.새로운 배열 생성하여 가져다가 작업.

    var index = newarray.indexOf(str); // 현재 선택값 인덱스 숫자 저장
    var temp = newarray[index - 1]; // 이전 인덱스 참조 값 temp 저장.

    if (index > 0) {
      //인덱스가 0보다 커야 upclick 버튼 적용
      newarray.splice(index - 1, 1, str); // 이전값에 입력값으로 변경
      newarray.splice(index, 1, temp); // 현재 선택 인덱스에 temp 값으로 변경.

      setinputs({
        ...inputs,
        station_numID: newarray.toString(), // 변경 된 배열 값 문자열로 저장.
      });
    }
  };
  // 순서 바꿈 아래.
  const clickdown = (a, b) => {
    var str = a + '-' + b;
    var newarray = inputs.station_numID.split(','); // 배열 리턴.새로운 배열 생성하여 가져다가 작업.

    var index = newarray.indexOf(str); // 현재 선택값 인덱스 숫자 저장
    var temp = newarray[index + 1]; // 다음 인덱스 참조 값 temp 저장.
    //순서 바꿈.
    if (newarray.length - (index + 1) > 0) {
      newarray.splice(index + 1, 1, str); // 다음 값에 입력값으로 변경
      newarray.splice(index, 1, temp); // 현재 선택 인덱스에 temp 값으로 변경.

      setinputs({
        ...inputs,
        station_numID: newarray.toString(), // 변경 된 배열 값 문자열로 저장.
      });
    }
  };
  const station_read = () => {
    var rearray = [];
    if (ar !== null) {
      for (var i = 0; ar.length > i; i++) {
        rearray.push(ar[i].split('-'));
      }
    }
    // 정류장의 갯수만큼 나눠서 배열 추가

    return (
      <div>
        {rearray.map((station_array, index) => (
          <div className="row2" key={index}>
            <div className="slt_left">
              <div
                className="slt_left_top"
                onClick={() => clickup(station_array[0], station_array[1])}
              >
                ↑
              </div>
              <div
                className="slt_left_bottom"
                onClick={() => clickdown(station_array[0], station_array[1])}
              >
                ↓
              </div>
            </div>
            <div className="slt">{index + 1}</div>
            <div className="slt">{station_array[0]}</div>
            <div className="slt2">{station_array[1]}</div>
            <div
              className="slt_right"
              onClick={() => {
                clickdel(station_array[0], station_array[1]);
              }}
            >
              －
            </div>
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
              type="number"
              id="input_value"
              name="route_type"
              placeholder="노선 유형"
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
              placeholder="지역"
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
                placeholder="방면"
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
              placeholder="기점 (출발)"
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
              placeholder="종점 (도착)"
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
              placeholder="출발 시간"
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
              placeholder="운행횟수"
              onChange={onChange}
              value={count}
            />
          </div>
        </div>
      </div>
      <div className="title_header">{data?.numID}번 노선정보</div>
      <div className="table4">
        <div className="row2_title">
          <div className="slt_left_title">순서변경</div>
          <div className="slt_title">순서</div>
          <div className="slt_title">정류장 번호</div>
          <div className="slt2_title">정류장</div>
          <div className="slt_right_title">추가/삭제</div>
        </div>
      </div>
      {list}

      <div className="table4">
        <div className="row3">
          <div className="slt_left2">노선추가</div>
          <div className="slt">{ar.length + 1}</div>
          <div className="slt">
            <input
              autoComplete="off"
              type="number"
              id="input_value"
              name="input_numID"
              placeholder="정류장 번호"
              onChange={onChange}
              value={input_numID}
            />
          </div>
          <div className="slt2">
            <input
              autoComplete="off"
              type="text"
              id="input_value"
              name="input_station"
              placeholder="정류장 이름"
              onChange={onChange}
              value={input_station}
            />
          </div>
          <div className="slt_right2" onClick={() => clickadd()}>
            ＋
          </div>
        </div>
      </div>

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
              station_numID !== null
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
