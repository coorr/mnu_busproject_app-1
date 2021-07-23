import React, { useState } from 'react';
import './Notice_WriteView.css';
import { useHistory, withRouter } from 'react-router-dom';

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
  const history = useHistory(); // do this inside the component

  const confirmModal_golist = () => {
    if (title !== '' || content !== '') {
      if (
        window.confirm('작성중인 문서가 취소됩니다. 목록으로 이동하시겠습니까?')
      ) {
        history.goBack();
      } else {
        console.log(1);
      }
    } else {
      history.goBack();
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
        <div className="golist" onClick={confirmModal_golist}>
          목록
        </div>
        <div className="input_notice">저장</div>
      </div>
    </div>
  );
}

export default withRouter(Notice_WriteView);
