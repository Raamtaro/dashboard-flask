import React from 'react'
import 
{BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, 
  BsListCheck, BsMenuButtonWideFill, BsFillGearFill, BsBank}
 from 'react-icons/bs'
 import Home from './Home'

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
                        <a href="">
                            <BsGrid1X2Fill className='icon'/> Dashboard
                        </a>
                    </li>
                    <li className='sidebar-list-item' onClick={() => switchTab('documents')}>
                        <a href="">
                            <BsFillArchiveFill className='icon'/> Documents
                        </a>
                    </li>
                    <li className='sidebar-list-item'>
                        <a href="">
                            <BsFillGrid3X3GapFill className='icon'/> Categories
                        </a>
                    </li>
                    <li className='sidebar-list-item'>
                        <a href="">
                            <BsPeopleFill className='icon'/> Applicants
                        </a>
                    </li>
                    <li className='sidebar-list-item'>
                        <a href="">
                            <BsListCheck className='icon'/> Checklist
                        </a>
                    </li>
                    <li className='sidebar-list-item'>
                        <a href="">
                            <BsMenuButtonWideFill className='icon'/> Reports
                        </a>
                    </li>
                    <li className='sidebar-list-item'>
                        <a href="">
                            <BsFillGearFill className='icon'/> Settings
                        </a>
                    </li>
                </ul>
            </aside>
    
  )
}

export default Sidebar