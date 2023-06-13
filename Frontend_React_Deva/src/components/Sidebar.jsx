/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import SidebarLink from "./SidebarLink";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import Post from "../pages/Post";
import Category from "../pages/Categoria";
import Product from "../pages/Producto";
import User from "../pages/Usuario";
import mensaje from "../pages/Mensaje";
import Dropdown from "./Dropdown";
import DropdownLink from "./DropdownLink";

const Sidebar = () => {
    const location = useLocation();
    const [isOpenSidebar, setIsOpenSidebar] = useState(false);
    const [activeRoute, setActiveRoute] = useState("/");

    useEffect(() => {
        // Almacena la ruta actual en localStorage cuando cambia
        setActiveRoute(location.pathname);
    }, [location]);

    const handleSidebar = () => {
        setIsOpenSidebar(!isOpenSidebar);
    };

    const handleItemClick = (path) => {
        setActiveRoute(path);
    };

    return (
        <>
            <aside className="ml-[-100%] fixed z-50 top-0 pb-3 px-5 hidden md:flex flex-col justify-between h-screen border-r bg-white md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[18%] 2xl:w-[15%]">
                <div>
                    <div className="py-4 flex justify-center">
                        <a href="#" title="home">
                            <div className="flex flex-row items-center justify-center">
                                <img src="/img/deva.png" className="w-3" />
                                <div className="flex flex-col">
                                    <span className="text-lg font-bold italic">
                                        {" "}
                                        DEVAPerú SAC
                                    </span>
                                    <span className="text-base italic -mt-1"> Sistema DEVA </span>
                                </div>
                            </div>
                        </a>
                    </div>

                    <div className="text-center">
                        <img
                            className="mx-auto rounded-full object-cover"
                            style={{ width: 140, height: 140 }}
                            src="/img/fibras.jpg"
                        />
                        <h5 className="mt-4 text-lg font-semibold text-gray-600 ">
                            Manuel Chunca Mamani
                        </h5>
                        <span className="text-base text-gray-400">Administrador</span>
                    </div>

                    <ul className="space-y-2 tracking-wide mt-4 h-72 2xl:h-full overflow-y-auto pr-1">
                        {SidebarData.map((item, index) => {
                            return (
                                <div key={index} className={item.cName}>
                                    <Link to={item.path}>
                                        <SidebarLink
                                            active={activeRoute === item.path ? true : false}
                                            icon={item.icon}
                                            onClick={() => handleItemClick(item.path)}
                                        >
                                            {item.title}
                                        </SidebarLink>
                                    </Link>
                                </div>
                            );
                        })}
                    </ul>
                </div>

                <div className="px-6 -mx-6 pt-3 flex justify-between items-center border-t">
                    <ul className="w-full">
                        <form method="POST" action="{{ route('logout') }}">
                            <SidebarLink active={false} icon={"pi pi-sign-out"}>
                                Cerrar sesión
                            </SidebarLink>
                        </form>
                    </ul>
                </div>
            </aside>

            {/* Responsive sidebar */}
            {isOpenSidebar && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-50 lg:hidden" onClick={() => setIsOpenSidebar(false)}>
                    <aside className="fixed z-50 top-0 pb-3 px-3 w-60 lg:hidden flex flex-col justify-between h-screen border-r bg-white md:w-4/12 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
                        <div>
                            <div className="py-4 flex justify-center">
                                <a href="#" title="home">
                                    <div className="flex flex-row items-center justify-center">
                                        <img src="/img/deva.png" className="w-3" />
                                        <div className="flex flex-col">
                                            <span className="text-lg font-bold italic">
                                                {" "}
                                                DEVAPerú SAC
                                            </span>
                                            <span className="text-base italic -mt-1"> Sistema DEVA </span>
                                        </div>
                                    </div>
                                </a>
                            </div>
                    
                            <div className="text-center">
                                <img
                                    className="mx-auto rounded-full object-cover"
                                    style={{ width: 100, height: 100 }}
                                    src="/img/fibras.jpg"
                                />
                                <h5 className="mt-4 text-lg font-semibold text-gray-600 ">
                                    Manuel Chunca Mamani
                                </h5>
                                <span className="text-base text-gray-400">Administrador</span>
                            </div>
                    
                            <ul onClick={() => setIsOpenSidebar(false)} className="space-y-2 tracking-wide mt-4 h-72 2xl:h-full overflow-y-auto pr-1">
                                {SidebarData.map((item, index) => {
                                    return (
                                        <div key={index} className={item.cName}>
                                            <Link to={item.path}>
                                                <SidebarLink
                                                    active={activeRoute === item.path ? true : false}
                                                    icon={item.icon}
                                                    onClick={() => handleItemClick(item.path)}
                                                >
                                                    {item.title}
                                                </SidebarLink>
                                            </Link>
                                        </div>
                                    );
                                })}
                            </ul>
                        </div>
                    
                        <div className="px-6 -mx-6 pt-3 flex justify-between items-center border-t">
                            <ul className="w-full">
                                <form method="POST" action="{{ route('logout') }}">
                                    <SidebarLink active={false} icon={"pi pi-sign-out"}>
                                        Cerrar sesión
                                    </SidebarLink>
                                </form>
                            </ul>
                        </div>
                    </aside>
                </div>
            )}

            <div className="ml-auto lg:w-[75%] xl:w-[82%] 2xl:w-[85%]">
                <div className="sticky z-10 top-0 h-16 border-b bg-white lg:py-2.5">
                    <div className="lg:px-4 pl-0 pr-3 flex items-center justify-between">
                        <div hidden className="bg-grey-light w-48 rounded-md lg:block">
                            <div className="flex items-center">
                                <a
                                    href="/"
                                    className="text-black ease-in-out hover:text-gray-600"
                                >
                                    <i className="pi pi-home"></i>
                                </a>
                                <span className="mx-2 text-neutral-500 dark:text-neutral-400">
                                    /
                                </span>
                                <div className="text-neutral-500 dark:text-neutral-400 text-sm">
                                    {location.pathname === "/"
                                        ? "Dashboard"
                                        : location.pathname === "/sistema-categorias"
                                            ? "Categorias"
                                            : location.pathname === "/sistema-productos"
                                                ? "Productos"
                                                : location.pathname === "/sistema-banners"
                                                    ? "Banners"
                                                    : location.pathname === "/sistema-videos"
                                                        ? "Videos"
                                                        : location.pathname === "/sistema-mensajes"
                                                            ? "Mensajes"
                                                            : location.pathname === "/sistema-usuarios"
                                                                ? "Usuarios"
                                                                : location.pathname === "/sistema-perfil"
                                                                    ? "Configuracion de perfil"
                                                                    : null}
                                </div>
                            </div>
                        </div>
                        <button onClick={handleSidebar}
                            className="h-16 border-r lg:hidden bg-gray-100 focus:bg-gray-100 active:bg-gray-200 flex justify-center"
                            style={{ width: 55 }}
                        >
                            <i className="pi pi-bars my-auto"></i>
                        </button>
                        <div className="flex space-x-3">
                            <button className="h-10 px-2 rounded-xl border bg-gray-100 focus:bg-gray-100 active:bg-gray-200">
                                <i className="pi pi-bell"></i>
                            </button>

                            <div className="sm:flex sm:items-center">
                                <Dropdown
                                    align="right"
                                    width="52"
                                    contentClasses="py-1 bg-white"
                                    dropdownClasses=""
                                    trigger={
                                        <span className="inline-flex">
                                            <button className="h-10 px-3 py-2 inline-flex items-center rounded-xl border bg-gray-100 focus:bg-gray-100 active:bg-gray-200">
                                                <i className="pi pi-user"></i>
                                                <i className="pi pi-chevron-down ml-2 -mr-0.5"></i>
                                            </button>
                                        </span>
                                    }
                                    content={
                                        <div>
                                            {/* Account Management */}
                                            <div className="px-4 py-2 bg-gray-100 -mt-1 rounded-t-md text-center">
                                                <div className="font-medium text-sm text-gray-800">
                                                    Manuel Chunca Mamani
                                                </div>
                                                <div className="font-medium text-sm text-gray-500">
                                                    manuel@gmail.com
                                                </div>
                                            </div>
                                            {/* Account Management */}
                                            <div className="block px-4 py-2 text-sm text-gray-400">
                                                Administrar Cuenta
                                            </div>

                                            <DropdownLink href="#">Perfil</DropdownLink>

                                            <div className="border-t border-gray-100"></div>

                                            {/* Authentication */}
                                            <form method="POST" data-x-data>
                                                <input type="hidden" name="_token" />
                                                <DropdownLink href="#">Cerrar sesión</DropdownLink>
                                            </form>
                                        </div>
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-4">
                    <div>
                        <Routes>
                            <Route path="/" Component={Post} />
                            <Route path="/sistema-categorias" Component={Category} />
                            <Route path="/sistema-productos" Component={Product} />
                            <Route path="/sistema-usuarios" Component={User} />
                            <Route path="/mensaje" Component={mensaje} />
                            <Route path="/newmensaje" Component={mensaje} />
                        </Routes>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
