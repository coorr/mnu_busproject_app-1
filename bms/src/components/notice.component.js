import React, { Component } from 'react';
import '../style/main.style.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Sidebar } from '../features/sidebar/Sidebar';
export default class Notice extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="left_tab">
          <Sidebar />
        </div>
        <div className="content">
          <p>tddasddsadt</p>
        </div>
      </div>
    );
  }
}
