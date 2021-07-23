import React from 'react';
import { useHistory, useLocation, withRouter } from 'react-router-dom';
import moment from 'moment';
// 안써도 자동으로 한국 시간을 불러온다. 명확하게 하기 위해 import
import 'moment/locale/ko';
import './Notice_ReadView.css';

export function Notice_ReadView() {
  const location = useLocation();
  const { data } = location.state; // 전달받은 값 데이터에 저장
  const history = useHistory(); // do this inside the component

  const goBack = () => history.goBack();
  const dateParse = notice_date => {
    // 날짜 파싱하는 함수
    let ndate = moment(notice_date).format('YYYY-MM-DD');
    return ndate;
  };

  const confirmModal_delete = () => {
    if (window.confirm('게시글을 삭제하시겠습니까?')) {
      console.log('확인1. 변화 있음');
    } else {
      console.log('취소. 변화 없음');
    }
  };

  const confirmModal_edit = () => {
    if (window.confirm('게시글을 수정하시겠습니까?')) {
      console.log('확인2. 변화 있음');
    } else {
      console.log('취소. 변화 없음');
    }
  };

  return (
    <div className="container">
      <div className="detail_titlebox">{data.title}</div>
      <div className="writerbox">작성자 : {data.writer}</div>
      <div className="udatebox">게시일 : {dateParse(data.udate)}</div>
      <div className="contentbox">{data.content}</div>

      <div className="cbox">
        <div className="golist" onClick={goBack}>
          목록
        </div>
        <div className="deletebutton" onClick={confirmModal_delete}>
          삭제
        </div>
        <div className="editbutton" onClick={confirmModal_edit}>
          수정
        </div>
      </div>
    </div>
  );
}

export default withRouter(Notice_ReadView);
