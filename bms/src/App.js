import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import Login from './components/login.component';
import Main from './components/main.component';

import Routes from './components/route/route.component';
import Route_Read from './components/route/route_read.component';
import Route_Write from './components/notice/notice_write.component';
import Route_Update from './components/notice/notice_update.component';

import Station from './components/station/station.component';
import Station_Read from './components/station/station_read.component';
import Station_Write from './components/station/station_write.component';
import Station_Update from './components/station/station_update.component';

import Notice from './components/notice/notice.component';
import Notice_Read from './components/notice/notice_read.component';
import Notice_Write from './components/notice/notice_write.component';
import Notice_Update from './components/notice/notice_update.component';

import reserve from './components/reserve.component';
import Member from './components/member.component';

function App() {
  let isAuthorized = window.sessionStorage.getItem('access-token');
  return (
    <Router>
      {/* isAuthorized 가 비었을 경우 '/'링크 다이렉트 이동 - 링크이동 방지*/}
      {!isAuthorized ? <Redirect to="/" /> : null}
      {/* 기본 app 베이스 디자인 */}
      <div className="App">
        <nav className="navcontainer">
          <div className="App-header">
            {/* 링크추가 */}
            <p className="App-headertext">목포대학교 스쿨버스 관리시스템</p>
          </div>
        </nav>

        {/* 경로 스위치 등록 */}
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/main" component={Main} />

          <Route exact path="/route" component={Routes} />
          <Route exact path="/route_read/:id" component={Route_Read} />
          <Route exact path="/route_write" component={Route_Write} />
          <Route exact path="/route_update" component={Route_Update} />

          <Route exact path="/station" component={Station} />
          <Route exact path="/station_read/:id" component={Station_Read} />
          <Route exact path="/station_write" component={Station_Write} />
          <Route exact path="/station_update" component={Station_Update} />

          <Route exact path="/notice" component={Notice} />
          <Route exact path="/notice_read/:id" component={Notice_Read} />
          <Route exact path="/notice_write" component={Notice_Write} />
          <Route exact path="/notice_update" component={Notice_Update} />
          <Route exact path="/reserve" component={reserve} />
          <Route exact path="/members" component={Member} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

// import React from 'react';
// import logo from './logo.svg';
// import { Counter } from './features/counter/Counter';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         {/* 카운터 함수 실행 */}
//         <Counter />

//       </header>
//     </div>
//   );
// }

// export default App;
