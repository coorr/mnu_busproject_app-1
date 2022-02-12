import React, { useState } from 'react';
import './Station_UpdateView.css';
import { useHistory, withRouter, useLocation } from 'react-router-dom';
import moment from 'moment';
// 안써도 자동으로 한국 시간을 불러온다. 명확하게 하기 위해 import
import 'moment/locale/ko';

export function Station_UpdateView() {
  const location = useLocation();
  const data = location.state.udata;
  const pnumberID = data?.numID;
  const [inputs, setinputs] = useState({
    direction: data?.direction,
    numID: data?.numID,
    roadname: data?.roadname,
    detail: data?.detail,
  });

  const { direction, numID, roadname, detail } = inputs;

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
    if (direction !== '' || numID !== '' || roadname !== '' || detail !== '') {
      if (
        // eslint-disable-next-line no-alert
        window.confirm('작성중인 문서가 취소됩니다. 목록으로 이동하시겠습니까?')
      ) {
        history.push('/station');
      }
    } else {
      history.push('/station');
    }
  };
  const fetchupdate = async () => {
    try {
      //왼쪽 값 설정값 있을 시에만 오른쪽값 조회
      await fetch('http://112.164.190.87:5000/api/station_update', {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
          pnumId: pnumberID,
          direction: direction,
          numID: numID,
          roadname: roadname,
          detail: detail,
        }),
      })
        .then(response => response.json())
        .then(res => {
          if (res.success === true) {
            // eslint-disable-next-line no-alert
            alert('저장에 성공했습니다.');
            history.push('/station');
          } else {
            // eslint-disable-next-line no-alert
            alert('정류장을 등록하지 못했습니다.');
          }
        })
        .catch(error => {
          console.log(error);
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      <div className="table_box2">
        <div className="detail_titlebox">
          <div className="box_left">
            <label className="readview_text">방면/지역</label>
          </div>
          <div className="box_right">
            <input
              type="text"
              id="input_value"
              name="direction"
              placeholder="지역/방면"
              onChange={onChange}
              value={direction}
            />
          </div>
        </div>
        <div className="detail_titlebox">
          <div className="box_left">
            <label className="readview_text">정류장 번호</label>
          </div>
          <div className="box_right">
            <input
              type="number"
              id="input_value"
              name="numID"
              placeholder="정류장 번호"
              onChange={onChange}
              value={numID}
            />
          </div>
        </div>
        <div className="detail_titlebox">
          <div className="box_left">
            <label className="readview_text">정류장</label>
          </div>
          <div className="box_right">
            <input
              type="text"
              id="input_value"
              name="roadname"
              placeholder="정류장"
              onChange={onChange}
              value={roadname}
            />
          </div>
        </div>
        <div className="detail_textbox">
          <div className="box_top">
            <label className="readview_text">세부내용</label>
          </div>
          <div className="box_text">
            <textarea
              id="input_value"
              placeholder="내용을 입력하세요."
              name="detail"
              onChange={onChange}
              value={detail}
            />
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
              direction !== '' ||
              numID !== '' ||
              roadname !== '' ||
              detail !== ''
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

export default withRouter(Station_UpdateView);
