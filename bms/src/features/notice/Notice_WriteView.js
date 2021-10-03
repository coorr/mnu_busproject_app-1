import React, { useState, useEffect, useCallback } from 'react';
import './Notice_WriteView.css';
import { useHistory, withRouter, Link } from 'react-router-dom';
import moment from 'moment';
// 안써도 자동으로 한국 시간을 불러온다. 명확하게 하기 위해 import
import 'moment/locale/ko';

export function Notice_WriteView() {
  const [inputs, setinputs] = useState({
    title: '',
    content: '',
  });

  const { title, content } = inputs;

  const onChange = e => {
    const { name, value } = e.target;

    const nextinputs = {
      ...inputs,
      [name]: value,
    };
    setinputs(nextinputs);
  };
  const dateParse = () => {
    // 날짜 파싱하는 함수
    var d = new Date();
    let ndate = moment(d).format('YYYY-MM-DD');
    return ndate;
  };

  // 작성한 텍스트가 없을 경우 바로 목록으로 이동 . 있을 경우 경고문구 확인할 경우만 목록이동
  const history = useHistory(); // do this inside the component
  const confirmModal_golist = () => {
    if (title !== '' || content !== '') {
      if (
        // eslint-disable-next-line no-alert
        window.confirm('작성중인 문서가 취소됩니다. 목록으로 이동하시겠습니까?')
      ) {
        history.push('/notice');
      }
    } else {
      history.push('/notice');
    }
  };
  const fetchpost = async () => {
    const user_session = JSON.parse(
      window.sessionStorage.getItem('access-token'),
    );
    try {
      await fetch('http://112.164.190.87:5000/api/board_write', {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
          title: title,
          content: content,
          writer: user_session.uname,
          udate: dateParse(),
        }),
      })
        .then(response => response.json())
        .then(res => {
          if (res.success === true) {
            // eslint-disable-next-line no-alert
            alert('저장에 성공했습니다.');
            history.goBack();
          } else {
            // eslint-disable-next-line no-alert
            alert('게시글을 등록하지 못했습니다.');
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
      <div>
        <form autoComplete="off">
          <div className="input_titlebox">
            <label className="text">제목</label>
            <input
              type="text"
              id="input_title"
              name="title"
              placeholder="제목을 작성해주세요."
              onChange={onChange}
              value={title}
            />
          </div>
          <div className="input_contentbox">
            <label className="text">내용</label>
            <textarea
              id="input_content"
              placeholder="내용을 작성해주세요."
              name="content"
              onChange={onChange}
              value={content}
            />
          </div>
        </form>
      </div>
      <div className="input_buttonbox">
        <div className="golist" onClick={() => confirmModal_golist()}>
          취소
        </div>
        <div
          className="input_notice"
          onClick={() => {
            if (title !== '' && content !== '') {
              fetchpost();

              // console.log(changestate().cstate);
            } else {
              alert('제목과 내용을 모두 입력해주세요.');
            }
          }}
        >
          저장
        </div>
      </div>
    </div>
  );
}

export default withRouter(Notice_WriteView);
