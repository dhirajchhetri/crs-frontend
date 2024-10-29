import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
// import './sidebar.scss';

const sidebarNavItems = [
    {
        display: 'Dashboard',
        icon: <i className="feather icon-activity"></i>,
        to: '/',
        section: ''
    },
    {
        display: 'Data',
        icon: <i className="feather icon-file-text"></i>,
        to: '/data',
        section: 'data'
    },
    {
        display: 'Reports',
        icon: <i className="feather icon-file"></i>,
        to: '/reports',
        section: 'reports'
    },
    {
        display: 'Setting',
        icon: <i className="feather icon-settings"></i>,
        to: '/setting',
        section: 'setting'
    },
    {
        display: 'User',
        icon: <i className="feather icon-users"></i>,
        to: '/user',
        section: 'user'
    }
];

const NavSidebarGroup = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [stepHeight, setStepHeight] = useState(0);
    const sidebarRef = useRef();
    const indicatorRef = useRef();
    const location = useLocation();

    return (
        <div className="sidebar">
            <div ref={sidebarRef} className="sidebar__menu">
                {sidebarNavItems.map((item, index) => (
                    <Link to={item.to} key={index}>
                        <div className={`sidebar__menu__item ${activeIndex === index ? 'active' : ''}`}>
                            <div className="sidebar__menu__item__icon">{item.icon}</div>
                            <div className="sidebar__menu__item__text">{item.display}</div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default NavSidebarGroup;
