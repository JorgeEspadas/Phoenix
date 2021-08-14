import React from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem
} from 'cdbreact';
import { NavLink } from 'react-router-dom';
import {SidebarData} from './SidebarData';
import '../../css/AppSidebar.css';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const Sidebar = () => {
  return (
    <div>
      <CDBSidebar className="Sidebar" style={{ background:"linear-gradient(0deg, rgba(37,212,214,1) 0%, rgba(110,112,200,1) 100%)" }} >
        
        <CDBSidebarHeader className='headerSidebar' prefix={<i className="fa fa-bars fa-large"></i>}>
          <NavLink exact to="/">
          <a className='titulo' href='#'>
                INSOFCAM
          </a>
          </NavLink>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
            <CDBSidebarMenu>
            {SidebarData.map((val, key) => {
                    return(
                        <NavLink key={key} 
                                  className='Modulo'
                                 exact to={val.Link}
                                 activeClassName="active">
                                <CDBSidebarMenuItem icon={val.Icono}>
                                    {val.Modulo}
                                </CDBSidebarMenuItem>
                        </NavLink>
                    );                    
            })}
            </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter className='Login'>
            <NavLink exact to='/login'>
            <AccountCircleIcon fontSize='large' style={{color: 'white'}}/>
            </NavLink> 
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};

export default Sidebar;
