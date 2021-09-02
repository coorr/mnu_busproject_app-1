import React from 'react';
import { useLocation } from 'react-router-dom';

const reload = () => {
  window.location.reload(true);
};

function SidebarItem({ menu, isActive }) {
  return isActive === true ? (
    <div className="sidebar-item-active" onClick={reload}>
      <p>{menu.name}</p>
    </div>
  ) : (
    <div className="sidebar-item ">
      <p>{menu.name}</p>
    </div>
  );
}

export default SidebarItem;
