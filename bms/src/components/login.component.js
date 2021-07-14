import React, { Component } from 'react';
import '../style/login.style.css';

import { Link } from 'react-router-dom';

export default class Login extends Component {
  render() {
    return (
      <div className="outer">
        <div className="inner">
          <form>
            <h3>Log in</h3>

            <div className="form-group">
              <label>ID</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Admin id"
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
              />
            </div>
            <Link to="/main">
              <button type="submit" className="sign-btn" onClick={window.i}>
                Sign in
              </button>
            </Link>
          </form>
        </div>
      </div>
    );
  }
}
