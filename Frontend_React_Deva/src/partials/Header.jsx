/* eslint-disable no-unused-vars */
import React from 'react'

function Header() {
    return (
        <>
            <div
                className="lg:flex md:flex md:justify-between items-center lg:justify-between bg-gray-200 text-sm px-8 py-1 sm:flex-none">
                <div className="">
                    <ul className="flex space-x-4 justify-center flex-wrap">
                        <li className="flex items-center">
                            <i className="pi pi-map-marker mr-1"></i>Jr.Artesanal Mz.A Lt.13 Urb. APIRAJ Juliaca, Puno, Perú
                        </li>
                        <li className="flex items-center">
                            <i className="pi pi-phone mr-1"></i>+51 996030355
                        </li>
                        <li className="flex items-center">
                            <i className="pi pi-envelope mr-1"></i><a href="mailto:devaperus@gmail.com">devaperus@gmail.com</a>
                        </li>
                    </ul>
                </div>
                <div className="sm:flex-justify-center sm:justify-between mt-1 mb-0">
                    <ul className="flex justify-center space-x-4 text-lg">
                        <li>
                            <a href="https://www.facebook.com/DDEVAPERU/" rel="noopener noreferrer" target="_blank" className="hover:text-blue-700">
                                <i className='pi pi-facebook'></i>
                            </a>
                        </li>
                        <li>
                            <a href="https://twitter.com/DevaperuS" rel="noopener noreferrer" target="_blank" className="hover:text-cyan-500">
                                <i className='pi pi-twitter'></i>
                            </a>
                        </li>
                        <li>
                            <a href="https://www.instagram.com/devaperu_oficial/?hl=es-la" rel="noopener noreferrer" target="_blank"
                                className="hover:text-pink-700" data-tooltip-target="tooltip-instagram">
                                <i className='pi pi-instagram'></i>
                            </a>
                        </li>
                        <li>
                            <a href="https://www.linkedin.com/in/devaperu-sac-5b250a227/" rel="noopener noreferrer" target="_blank"
                                className="hover:text-blue-700" data-tooltip-target="tooltip-linkedin">
                                <i className='pi pi-linkedin'></i>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Header
