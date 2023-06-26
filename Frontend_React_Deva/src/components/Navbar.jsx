/* eslint-disable no-unused-vars */
import { Sidebar } from 'primereact/sidebar';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';


import devaImage from '../assets/img/deva.png';
import Header from '../partials/Header';
import '../styles/ScrollPanel.css';
import '../styles/flags.css';
import { NavbarData } from './NavbarData';
import NavbarLink from './NavbarLink';
import SidebarLink from './SidebarLink';

function Navbar( CartItem) {

    const [visible, setVisible] = useState(false);
    const location = useLocation();
    const [activeRoute, setActiveRoute] = useState('/');

    useEffect(() => {
        // Almacena la ruta actual en localStorage cuando cambia
        setActiveRoute(location.pathname);
    }, [location]);

    const handleItemClick = (path) => {
        setActiveRoute(path);
        setVisible(false);
    };

    return (
        <>
            <Sidebar visible={visible} onHide={() => setVisible(false)} style={{ borderBottomRightRadius: 15, borderTopRightRadius: 15, width: '20rem' }}>
                <div style={{ position: 'absolute', top: 0, left: 10, display: 'flex', flexDirection: 'row', alignItems: 'center', alignSelf: 'center', height: '12%' }}>
                    <img src={devaImage} style={{ height: 50, width: 50 }} />
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontSize: 18, fontWeight: 'bold', fontStyle: 'italic' }}> DEVAPerú</span>
                        <span style={{ fontSize: 16, fontStyle: 'italic', marginTop: -5 }}> SAC </span>
                    </div>
                </div>
                <div style={{ height: 1, width: '100%', backgroundColor: 'gray', marginBottom: 10, marginTop: 12 }}>
                </div>
                <div>
                    <ul className="space-y-2 tracking-wide mt-4 h-72 2xl:h-full overflow-y-auto pr-1">
                        {NavbarData.map((item, index) => {
                            return (
                                <div key={index} className={item.cName}>
                                    <Link to={item.path}>
                                        <SidebarLink
                                            active={activeRoute === item.path ? true : false}
                                            onClick={() => handleItemClick(item.path)}
                                        >
                                            {item.title}
                                        </SidebarLink>
                                    </Link>
                                </div>
                            );
                        })}
                        <SidebarLink active={activeRoute === "" ? true : false}>
                            Sistema
                        </SidebarLink>
                    </ul>
                </div>
            </Sidebar>

            <nav className="bg-white border-b-4 border-b-green-600 sticky z-50 top-0">

                <Header />

                <div className="mx-4 px-4 sm:px-6 lg:px-4 py-1">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="flex flex-shrink-0 items-center">
                                <a href="/">
                                    <img className="block h-10 w-auto lg:hidden" src="/img/deva.png" alt="" />
                                    <img className="hidden h-14 w-auto lg:block" src="/img/deva.png" alt="" />
                                </a>
                            </div>
                            <ul
                                className="hidden space-x-4 md:-my-px md:ml-5 md:flex space-y-1 px-2 py-4 text-sm font-medium text-gray-700 items-center">
                                {NavbarData.map((item, index) => {
                                    return (
                                        <div key={index} className={item.cName}>
                                            <Link to={item.path}>
                                                <NavbarLink
                                                    active={activeRoute === item.path ? true : false}
                                                    icon={item.icon}
                                                    onClick={() => handleItemClick(item.path)}
                                                >
                                                    {item.title}
                                                </NavbarLink>
                                            </Link>
                                        </div>
                                    );
                                })}

                                <a href="/sistema-dashboard" rel="noopener noreferrer" target="_blank">
                                    <NavbarLink active={activeRoute === "" ? true : false}>
                                        Sistema
                                    </NavbarLink>
                                </a>
                            </ul>
                        </div>

                        <div className="flex items-center">
                            <div className="hidden lg:flex items-center">
                                <div className="relative flex items-center text-gray-400 focus-within:text-green-500">
                                    <span className="absolute left-4 h-6 flex items-center pr-3 border-r border-gray-300">
                                        <i className="pi pi-search"></i>
                                    </span>
                                    <input type="search" placeholder="Buscar"
                                        className="w-full pl-14 pr-4 py-2.5 rounded-lg text-sm text-gray-600 outline-none border border-gray-300 focus:border-green-500 focus:ring-green-500 shadow" />
                                </div>
                            </div>
                            
                            <div className="sm:flex sm:items-center mx-2">
                            <div className='icon f_flex width'>
                                <i className='fa fa-user icon-circle'></i>
                                <div className='cart'>
                                <Link to='/cart'>
                                    <i className='pi pi-shopping-cart pi-circle'></i>
                                    <span>{CartItem.length === 0 ? "" : CartItem.length}</span>
                                </Link>
                                </div>
                            </div>
                            </div>
                            <div className="sm:flex sm:items-center mx-2">
                                <span className="inline-flex">
                                    <a href="/logindev" className="h-10 px-3 py-2 inline-flex items-center rounded-lg border bg-gray-100 focus:bg-gray-100 active:bg-gray-200">
                                        <i className="pi pi-user"></i>
                                    </a>
                                </span>
                            </div>
                            <button onClick={() => setVisible(true)}
                                className="block md:hidden items-center justify-center py-2 px-3 rounded-lg border bg-gray-100 focus:bg-gray-100 active:bg-gray-200">
                                <i className="pi pi-bars my-auto"></i>
                            </button>
                        </div >
                    </div>
                </div >
            </nav >
        </>
    )
}

export default Navbar

