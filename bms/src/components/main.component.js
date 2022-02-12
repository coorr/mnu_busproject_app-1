import React, { Component } from 'react';
import '../style/main.style.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Sidebar } from '../features/sidebar/Sidebar';
import { Calendars } from '../features/calendar/Calendars';
import { UserCount } from '../features/usercount/UserCount';
import { Main_Notice } from '../features/notice/Main_Notice';
export default class Main extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="left_tab">
          <Sidebar />
        </div>
        <div className="content">
          <div className="firstbox">
            <div className="fleft">
              <Calendars />
            </div>
            <div className="fright">
              <UserCount />
            </div>
          </div>
          <div className="secondbox">
            <div className="sleft">
              <p className="titletext">공지사항</p>
              <div className="boardbox">
                <Main_Notice />
              </div>
            </div>
            <div className="sright">
              <p className="titletext">분실물 신고/벌점 리스트</p>
              <div className="boardbox">준비중입니다.(padding10px)</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
