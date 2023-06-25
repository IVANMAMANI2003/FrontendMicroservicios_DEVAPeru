/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Footer from "../../partials/Footer";
import * as BannerService from "../../services/BannerService";
import { Carousels } from "../../components/Carousel";

function Nosotros() {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    getBanners();
  }, []);

  const getBanners = () => {
    BannerService.getBannerList()
      .then((response) => {
        const filteredBanners = response.data.filter(
          (banner) => banner.tipo === "Nosotros"
        );
        setBanners(filteredBanners);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {/* Banner principal */}
      <div id="controls-carousel" className="relative" data-carousel="slide">
        <Carousels value={banners} />
      </div>

      <div className="p-1 bg-gray-100"></div>

      {/* Historia */}
      <div className="container mx-auto">
        <div
          data-aos="zoom-in-down"
          className="flex flex-col md:p-10 p-5 gap-4 bg-white rounded-lg shadow-lg md:flex-row text-justify justify-between"
        >
          <div className="pr-0 sm:px-0 md:w-[80%] m-4 md:m-0">
            <h1 className="text-2xl text-center font-bold text-black">
              <a className="border-b-2 border-b-black">HISTORIA</a>
            </h1>
            <br />
            <span rows="11" cols="119" className="p-0 mx-0 border-0 ">
              La empresa DEVAPERU SAC inicia sus operaciones en el año 2018 con
              la idea de satisfacer la demanda del centro y sur del Perú, su
              principal producto en ese entonces fueron las mantas multicolores
              y artesanales. Cumplió con el objetivo esperado, logrando así
              posicionarse como una de las 5 mejores empresas dedicadas a ese
              rubro de la moda textil andina. Ya para el año 2019 DEVAPERU SAC
              comenzó a producir prendas de vestir para damas y varones en telas
              de fibra de alpaca, y mezclas como el alpacril, como son ponchos,
              chales, ruanas, accesorios etc. Proponiendo al mercado
              internacional un nuevo segmento en moda.El inicio de este
              emprendimiento tan anhelado por sus fundadores se dio con gran
              expectativa, a la actualidad siguen trabajando de forma conjunta
              con sus colaboradores para satisfacer a sus clientes y también
              lograr la imposición de su marca denominado “DEVA, con la cual
              busca conservar la esencia de los rasgos andinos de nuestro país,
              así como costumbres impregnadas en cada modelo de nuestros
              productos cuyo significado representa lo más preciado de cada
              vivencia y etapa de nuestra historia.
            </span>
          </div>
          <div className=" w-full  md:h-auto ">
            <iframe
              className="rounded-xl w-full h-full"
              src="../video/devaperuhistoria.mp4"
              frameBorder="5"
              type="video/mp4"
              allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        <div
          data-aos="fade-down"
          data-aos-easing="linear"
          data-aos-duration="8000"
          className="flex flex-col md:py-10 py-5 lg:flex-row text-justify justify-between gap-10"
        >
          <div className="rounded-lg shadow-xl lg:w-[48%] w-[100%] bg-white">
            <div className="h-2 bg-green-700 rounded-t-2xl"></div>
            <div className="h-2 bg-blue-700"></div>
            <div className="h-2 bg-yellow-400"></div>
            <div className="h-2 bg-red-700"></div>
            <div className="flex flex-row text-justify justify-between sm:flex-row pl-4 pt-4">
              <img
                src="img/hombre-color.png"
                alt="muestra"
                className="w-[30%] object-cover"
              />
              <div className="px-4">
                <h1 className="mx-0 my-1 text-right text-2xl font-bold text-black">
                  Misión
                </h1>
                <div className="my-auto text-right flex flex-col justify-center sm:text-base text-sm">
                  Mantener nuestro liderazgo en el sector textil, creando
                  diseños sofisticados mediante una estrategia de innovación,
                  ofreciendo moda y estilo a un precio acorde a la calidad,
                  orientado a la satisfacción de los clientes
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-lg shadow-xl lg:w-[48%] w-[100%] bg-white">
            <div className="h-2 bg-green-700 rounded-t-2xl"></div>
            <div className="h-2 bg-blue-700"></div>
            <div className="h-2 bg-yellow-400"></div>
            <div className="h-2 bg-red-700"></div>
            <div className="flex flex-row text-justify justify-between sm:flex-row pr-4 pt-4">
              <div className="px-4">
                <h1 className="mx-0 my-1 text-2xl font-bold text-black">
                  Visión
                </h1>
                <div className="my-auto text-left flex flex-col justify-center sm:text-base text-sm">
                  <p>
                    Ser una empresa líder en tendencias, moda y confección de
                    prendas de vestir, cumpliendo con la exigencia de calidad de
                    nuestros cliente locales, nacionales e internacionales.
                  </p>
                </div>
              </div>
              <img
                src="img/mujer-color.png"
                alt="muestra"
                className="w-[30%] object-cover"
              />
            </div>
          </div>
        </div>

        <div className="md:p-10 p-5 bg-white rounded-lg shadow-lg">
          <div
            data-aos="fade-down"
            data-aos-easing="linear"
            data-aos-duration="800"
          >
            <h1 className="mb-4 text-center text-2xl font-bold text-black">
              <u>ORGANIGRAMA</u>
            </h1>
            <div className="flex justify-center items-center">
              <img
                src="img/organigramadeva.png"
                alt="organigrama"
                className=""
                width="50%"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 bg-gray-100"></div>

      <Footer />
    </>
  );
}

export default Nosotros;
