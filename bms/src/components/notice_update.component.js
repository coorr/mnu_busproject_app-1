import React, { Component } from 'react';
import '../style/main.style.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Sidebar } from '../features/sidebar/Sidebar';
import { Notice_UpdateView } from '../features/notice/Notice_UpdateView';
import { Notice_WriteView } from '../features/notice/Notice_WriteView';
export default class Notice_Update extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="left_tab">
          <Sidebar />
        </div>
        <div className="content">
          <Notice_UpdateView />
        </div>
      </div>
    );
  }
}
