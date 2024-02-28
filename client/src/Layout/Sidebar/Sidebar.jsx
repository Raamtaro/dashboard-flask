import React from 'react'
import 
{BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, 
  BsListCheck, BsMenuButtonWideFill, BsFillGearFill, BsBank}
 from 'react-icons/bs'
 import Home from '../../Tabs/Dashboard/Home'

function Sidebar({openSidebarToggle, OpenSidebar, switchTab}) {
  return (
            <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""}>
                <div className='sidebar-title'>
                    <div className='sidebar-brand'>
                        <BsBank  className='icon_header'/> InstaMortgage
                    </div>
                    <span className='icon close_icon' onClick={OpenSidebar}>X</span>
                </div>
                <ul className='sidebar-list'>
                    <li className='sidebar-list-item' onClick={() => switchTab('home')}>
                        
                            <BsGrid1X2Fill className='icon'/> Dashboard
                        
                    </li>
                    <li className='sidebar-list-item' onClick={() => switchTab('documents')}>
                        
                            <BsFillArchiveFill className='icon'/> Documents
                        
                    </li>
                    {/* <li className='sidebar-list-item'>
                        
                            <BsFillGrid3X3GapFill className='icon'/> Categories
                        
                    </li> */}
                    {/* <li className='sidebar-list-item'>
                        
                            <BsPeopleFill className='icon'/> Applicants
                        
                    </li> */}
                    {/* <li className='sidebar-list-item'>
                        
                            <BsListCheck className='icon'/> Checklist
                        
                    </li> */}
                    <li className='sidebar-list-item' onClick={() => switchTab('reports')}>
                        
                            <BsMenuButtonWideFill className='icon'/> Reports
                        
                    </li>
                    <li className='sidebar-list-item'>
                        
                            <BsFillGearFill className='icon'/> Settings
                        
                    </li>
                </ul>
            </aside>
    
  )
}

export default Sidebar