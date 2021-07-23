import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import SidebarItem from './SidebarItem';
import './Sidebar.css';
export function Sidebar() {
  // URL의 path값을 받아올 수 있다.
  const pathName = useLocation().pathname;
  // 메뉴 리스트 경로
  const menus = [
    { name: '대시보드', path: '/main' },
    { name: '노선', path: '/route' },
    { name: '정류장 ', path: '/station' },
    { name: '공지사항', path: '/notice' },
    //{ name: '분실물', path: '/lost' },
    { name: '예약 정보', path: '/reserve' },
    { name: '회원 정보', path: '/members' },
  ];

  return (
    <div className="sidebar">
      {menus.map((menu, index) => {
        return (
          // eslint-disable-next-line react-native/no-inline-styles
          <Link to={menu.path} key={index} style={{ textDecoration: 'none' }}>
            <SidebarItem
              menu={menu}
              //현재 경로에 경로 이름이 포함될 경우 true 아닐 경우 false
              isActive={pathName.includes(menu.path) ? true : false}
            />
          </Link>
        );
      })}
    </div>
  );
}

export default Sidebar;
