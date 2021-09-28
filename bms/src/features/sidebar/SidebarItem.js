import React from 'react';
import { useLocation } from 'react-router-dom';

function SidebarItem({ menu, isActive }) {
  return isActive === true ? (
    <div className="sidebar-item-active">
      <p>{menu.name}</p>
    </div>
  ) : (
    <div className="sidebar-item ">
      <p>{menu.name}</p>
    </div>
  );
}

export default SidebarItem;
