import React, { Component } from 'react';
import '../../style/main.style.css';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Sidebar } from '../../features/sidebar/Sidebar';
import { Board_Notice } from '../../features/notice/Board_Notice';

export default class Notice extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="left_tab">
          <Sidebar />
        </div>
        <div className="content">
          <Board_Notice />
        </div>
      </div>
    );
  }
}
