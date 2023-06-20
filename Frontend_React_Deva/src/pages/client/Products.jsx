import React, { Component } from 'react';
import Footer from '../../partials/Footer';
import '../../styles/home.css'
import { Button } from 'primereact/button';
export default class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const style = {
            fontFamily: "Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif",
            top: '38%'
          };
        return (
            <div className='banner'>
                <div className='mx-full carousel slide carousel-fade carousel-dark relative' data-bs-ride="carousel" id='carouselDarkVariant'>
                    <div className='carousel-indicators absolute right-0 bottom-0 left-0 flex justify-center p-0 mb-4'>
                        <Button data-bs-target="#carouselDarkVariant" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></Button>
                        <Button data-bs-target="#carouselDarkVariant" data-bs-slide-to="1" aria-label="Slide 1"></Button>
                        <Button data-bs-target="#carouselDarkVariant" data-bs-slide-to="2" aria-label="Slide 1"></Button>
                    </div>
                    <div className='carousel-inner relative w-full overflow-hidden items-center'>
                        <div className='carousel-item  duration-500 active relative float-left w-full items-center'>
                            <img src="img/f_producto1.png" className='block w-full' alt="Motorbike Smoke" />
                            <div className='carousel-caption absolute text-center' style={{ top: '38%' }}>
                                <p className='lg:text-8xl md:text-6xl  text-white'
                                    style={style}>
                                    PRODUCTOS</p>
                            </div>
                        </div>
                        <div className='carousel-item duration-500 relative float-left w-full items-center'>
                            <img src="img/f_producto2.png" className='block w-full' alt="Motorbike Smoke" />
                            <div className='carousel-caption absolute text-center' style={{ top: '38%' }}>
                                <p className='lg:text-8xl md:text-6xl  text-white'
                                    style={style}>
                                    PRODUCTOS</p>
                            </div>
                        </div>
                        <div className='carousel-item duration-500 relative float-left w-full items-center'>
                            <img src="img/f_producto2.png" className='block w-full' alt="Motorbike Smoke" />
                            <div className='carousel-caption absolute text-center' style={{ top: '38%' }}>
                                <p className='lg:text-8xl md:text-6xl  text-white'
                                    style={style}>
                                    PRODUCTOS</p>
                            </div>
                        </div>
                    </div>
                    <Button className="carousel-control-prev absolute top-0 bottom-0 flex items-center text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline left-3"
                        type="button" data-bs-target="#carouselDarkVariant" data-bs-slide="prev">
                        <div className="bg-white rounded-full p-2 flex items-center">
                            <span className="carousel-control-prev-icon inline-block bg-no-repeat" aria-hidden="true"></span>
                        </div>
                    </Button>
                    <Button className="carousel-control-next absolute top-0 bottom-0 flex items-center justify-end text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline right-3"
                        type="button" data-bs-target="#carouselDarkVariant" data-bs-slide="next">
                        <div className="bg-white rounded-full p-2 flex items-center">
                            <span className="carousel-control-next-icon inline-block bg-no-repeat" aria-hidden="true"></span>
                        </div>
                    </Button>
                </div>
            </div>
        );

    }
}
