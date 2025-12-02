import React from 'react'
import {
    BsCart3
} from 'react-icons/bs'
import { CgProfile, CgSandClock } from 'react-icons/cg';
import { MdCastForEducation } from 'react-icons/md'
import { GiAchievement } from 'react-icons/gi'
import { TbLicense } from 'react-icons/tb'
import { RiArticleLine } from 'react-icons/ri'
import { MdPayment } from 'react-icons/md'
import { BsFillChatLeftTextFill } from 'react-icons/bs'
function Sidebar({ openSidebarToggle, OpenSidebar }) {
    return (
        <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
            <div className='sidebar-title'>
                <div className='sidebar-brand' style={{ color: 'white' }}>
                    <BsCart3 className='icon_header' /> Trusty Doctors
                </div>
                <span className='icon close_icon' onClick={OpenSidebar}>X</span>
            </div>

            <ul className='sidebar-list'>
                <li className='sidebar-list-item'>
                    <a href="">
                        <CgProfile style={{ height: '1.5rem', width: '1.5rem' }} className='icon' /> Profile
                    </a>
                </li>
                <li className='sidebar-list-item'>
                    <a href="">
                        <CgSandClock style={{ height: '1.5rem', width: '1.5rem' }} className='icon' /> Schedule
                    </a>
                </li>
                <li className='sidebar-list-item'>
                    <a href="">
                        <MdCastForEducation style={{ height: '1.5rem', width: '1.5rem' }} className='icon' /> Qualification
                    </a>
                </li>
                <li className='sidebar-list-item'>
                    <a href="">
                        <GiAchievement style={{ height: '1.5rem', width: '1.5rem' }} color='white' className='icon' /> Achievement
                    </a>
                </li>
                <li className='sidebar-list-item'>
                    <a href="">
                        <TbLicense style={{ height: '1.5rem', width: '1.5rem' }} className='icon' /> License
                    </a>
                </li>
                <li className='sidebar-list-item'>
                    <a href="">
                        <MdPayment style={{ height: '1.5rem', width: '1.5rem' }} className='icon' /> Payment Gateway
                    </a>
                </li>
                <li className='sidebar-list-item'>
                    <a href="">
                        <RiArticleLine style={{ height: '1.5rem', width: '1.5rem' }} className='icon' /> Article
                    </a>
                </li>
                <li className='sidebar-list-item'>
                    <a href="">
                        <BsFillChatLeftTextFill style={{ height: '1.5rem', width: '1.5rem' }} className='icon' /> Chat
                    </a>
                </li>
            </ul>
        </aside>
    )
}

export default Sidebar