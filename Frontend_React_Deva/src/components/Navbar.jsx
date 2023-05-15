/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { ScrollPanel } from 'primereact/scrollpanel';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import { Link, useLocation } from 'react-router-dom'

import { SidebarData } from "./SidebarData";

import devaImage from '../assets/img/deva.png';
import ButtonSidebar from './ButtonSidebar';
import '../styles/ScrollPanel.css';
import '../styles/flags.css';

function Navbar() {

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
            <div className="card" style={{ padding: 15 }}>

                <Button icon="pi pi-align-justify" size="small" onClick={() => setVisible(true)} />

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
                    <div className="scrollpanel-demo">
                        <ScrollPanel style={{ width: '100%', height: '300px' }} className="custombar2">
                            {SidebarData.map((item, index) => {
                                return (
                                    <div key={index} className={item.cName}>
                                        <Link to={item.path}>
                                            <ButtonSidebar
                                                title={item.title}
                                                icon={item.icon}
                                                textCont={activeRoute === item.path ? 'white' : 'black'}
                                                borderBtn={activeRoute === item.path ? 'success' : 'secondary'}
                                                typeBtn={activeRoute === item.path ? {} : { text: true }}
                                                onClick={() => handleItemClick(item.path)}
                                            />
                                        </Link>
                                    </div>
                                )
                            })}
                        </ScrollPanel>
                    </div>
                </Sidebar>
            </div>
        </>
    )
}

export default Navbar

