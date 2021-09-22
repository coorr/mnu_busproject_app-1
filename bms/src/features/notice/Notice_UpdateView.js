import React, { useState } from 'react';
import './Notice_UpdateView.css';
import { useHistory, withRouter, useLocation } from 'react-router-dom';
import moment from 'moment';
// 안써도 자동으로 한국 시간을 불러온다. 명확하게 하기 위해 import
import 'moment/locale/ko';

export function Notice_UpdateView() {
  const location = useLocation();
  const data = location.state.udata;
  const [inputs, setinputs] = useState({
    title: data?.title,
    content: data?.content,
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
  const fetchupdate = async () => {
    try {
      //왼쪽 값 설정값 있을 시에만 오른쪽값 조회
      await fetch('http://112.164.190.62:5000/api/board_update', {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
          pid: data?.pid,
          title: title,
          content: content,
        }),
      })
        .then(response => response.json())
        .then(res => {
          if (res.success === true) {
            // eslint-disable-next-line no-alert
            alert('저장에 성공했습니다.');
            history.push('/notice');
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
            <input
              type="text"
              id="input_title"
              name="title"
              placeholder="제목"
              onChange={onChange}
              value={title}
            />
          </div>
          <div className="input_contentbox">
            <textarea
              id="input_content"
              placeholder="내용을 입력하세요."
              name="content"
              onChange={onChange}
              value={content}
            />
          </div>
        </form>
      </div>
      <div className="input_buttonbox">
        <div className="golist" onClick={() => confirmModal_golist()}>
          목록
        </div>
        <div
          className="input_notice"
          onClick={() => {
            if (title !== '' && content !== '') {
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

export default withRouter(Notice_UpdateView);
