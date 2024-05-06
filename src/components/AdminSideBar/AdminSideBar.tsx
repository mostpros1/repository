import React, { useState, ReactElement } from 'react';
import { Link, Outlet } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { AdminSideBarData } from './AdminSideBarData'; // Correct case sensitivity
import SubMenu from './SubMenu'; // Correct import statement
import { IconContext } from 'react-icons/lib/esm/iconContext';
import './AdminSideBar.css';
import Logo from "../../assets/cropped-23107-9-tools-transparent-image 1.svg";

const AdminSideBar: React.FC = (): ReactElement => {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
        <IconContext.Provider value={{ color: '#000000'}}>
        
        <nav className='nav_admin'>
            <Link className='nav_icon' to="#">
              <FaIcons.FaBars onClick={showSidebar} />
            </Link>
        </nav>
        <div className='sidebar_nav' style={{left: sidebar ? '0' : '-250px'}}>
          <div className='sidebar_wrap'>
            <AiIcons.AiOutlineClose style={{  fontSize: '2rem', color: '#00000', cursor: 'pointer' }} onClick={showSidebar} />
            <div className="nav-containerAdmin">
              <Link to="/">
                <div className="nav-leftsideAdmin">
                  <img src={Logo} alt="" />
                  <h1 className="black-h1Admin">
                    Mostpros
                  </h1>
                </div>
              </Link>
            </div>
            {AdminSideBarData.map((item, index) => (
                <SubMenu item={item} key={index} />
            ))}
          </div>
          
        </div>
        </IconContext.Provider>
        <Outlet/>
    </>
  );
};

export default AdminSideBar;