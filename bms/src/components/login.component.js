import React, { Component } from 'react';
import '../style/login.style.css';

import { withRouter } from 'react-router-dom';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      userData: false,
    };
  }

  login = async () => {
    try {
      if (this.state.username === 'Admin' && this.state.password !== '') {
        await fetch('http://192.168.0.16:5000/api/users', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: this.state.username,
            password: this.state.password,
          }),
        })
          .then(response => response.json())
          .then(res => {
            console.log('bfetch');
            if (res.success === true) {
              const user = JSON.parse(res.user);
              console.log('fetch');
              // 세션저장 발행-생성기 서버작업필요
              window.sessionStorage.setItem('access-token', user);
              this.setState({
                userData: true,
              });
              console.log(this.state.userData);
              this.props.history.push('/main');
              // 이동
            } else {
              alert(res.message);
            }
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        alert('아이디, 비번 확인 후 입력 바랍니다.');
      }
    } catch (err) {
      console.log(err);
    }
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    return (
      <div className="outer">
        <div className="inner">
          <form autoComplete="off">
            <h3>Log in</h3>
            <div className="form-group">
              <label>ID</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter id"
                name="username"
                onChange={this.onChange}
                value={this.state.username}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                name="password"
                onChange={this.onChange}
                value={this.state.password}
              />
            </div>
            <div className="sign-btn" onClick={this.login}>
              Sign in
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
