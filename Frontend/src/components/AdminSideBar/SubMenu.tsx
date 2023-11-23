import React, { ReactElement, useState } from "react";
import { Link } from 'react-router-dom';
import './SubMenu.css';

interface SubMenuItem {
  path: string;
  icon: React.ReactNode;
  title: string;
}

interface SubMenuProps {
  item: {
    path: string;
    icon: React.ReactNode;
    title: string;
    subNav?: SubMenuItem[];
    iconOpened?: React.ReactNode;
    iconClosed?: React.ReactNode;
  };
}

const SubMenu: React.FC<SubMenuProps> = ({ item }): ReactElement => {
  const [subnav, setSubnav] = useState(false);

  const showSubnav = (event: React.MouseEvent) => {
    event.preventDefault();
    setSubnav(!subnav);
  };

  return (
    <>
      <Link className="submenu_link" to={item.path} onClick={() => item.subNav ? showSubnav : null}>
        <div>
          {item.icon}
          <p className="sidebar_label">{item.title}</p>
        </div>
        <div>
          {item.subNav && subnav
            ? item.iconOpened
            : item.subNav
            ? item.iconClosed
            : null}
        </div>
      </Link>
      {subnav && item.subNav && item.subNav.map((subItem, index) => {
        return (
          <Link className="dropdown_link" to={subItem.path} key={index}>
            {subItem.icon}
            <p className="sidebar_label">{subItem.title}</p>
          </Link>
        )
      })}
    </>
  );
};

export default SubMenu;