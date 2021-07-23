import React, { Component } from 'react';
import '../style/main.style.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Sidebar } from '../features/sidebar/Sidebar';
import { Notice_ReadView } from '../features/notice/Notice_ReadView';
export default class Notice_Read extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="left_tab">
          <Sidebar />
        </div>
        <div className="content">
          <Notice_ReadView />
        </div>
      </div>
    );
  }
}
