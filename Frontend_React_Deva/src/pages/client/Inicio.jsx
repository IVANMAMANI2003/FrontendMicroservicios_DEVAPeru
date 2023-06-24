import { useEffect, useState } from "react";
import "../../styles/home.css";
import Footer from "../../partials/Footer";
import * as BannerService from "../../services/BannerService";
import { Carousels } from "../../components/Carousel";

function Inicio() {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    getBanners();
  }, []);

  const getBanners = () => {
    BannerService.getBannerList()
      .then((response) => {
        const filteredBanners = response.data.filter(
          (banner) => banner.tipo === "Inicio"
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

      {/* Bienvenida */}
      <div className="p-6 bg-gray-100 text-center">
        <div data-aos="zoom-in">
          <span className="font-bold">DEVAPERU S.A.C tiene algo para ti</span>{" "}
          <br />
          <span>
            Descubre las últimas tendencias y deslumbra con cada una de nuestra
            prendas y accesorios
          </span>
        </div>
      </div>

      {/* Pilares */}
      <div className="pilares flex flex-wrap lg:p-20 pt-6 p-4 text-white justify-center max-w-full">
        <div
          data-aos="zoom-in"
          className="max-w-sm rounded overflow-hidden text-center"
        >
          <div className="flex justify-center p-2">
            <div className="rounded-full p-3 circles">
              <div className="rounded-full p-2 circles">
                <div className="rounded-full w-max bg-gradient-to-r from-green-700 to-green-600 text-black flex justify-center p-10 hover:text-gray-200">
                  <img className="w-20" src="/img/Integridad.png" alt="" />
                </div>
              </div>
            </div>
          </div>
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">Integridad</div>
            <p className="text-base">
              Todos los colaboradores de la empresa actuarán siempre de manera
              correcta, guiados por principios claros tales como transparencia,
              honestidad y responsabilidad.
            </p>
          </div>
        </div>
        <div
          data-aos="zoom-in"
          className="max-w-sm rounded overflow-hidden text-center"
        >
          <div className="flex justify-center p-2">
            <div className="rounded-full p-3 circles">
              <div className="rounded-full p-2 circles">
                <div className="rounded-full w-max bg-gradient-to-r from-green-700 to-green-600 text-black flex justify-center p-10 hover:text-gray-200">
                  <img className="w-20" src="img/dedicación.png" alt="" />
                </div>
              </div>
            </div>
          </div>
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">Dedicación</div>
            <p className="text-base">
              Ejecutar de manera simple y disciplinada todo el proceso
              productivo de la empresa, entregando el máximo esfuerzo para el
              logro de los objetivos trazados.
            </p>
          </div>
        </div>
        <div
          data-aos="zoom-in"
          className="max-w-sm rounded overflow-hidden text-center "
        >
          <div className="flex justify-center p-2">
            <div className="rounded-full p-3 circles">
              <div className="rounded-full p-2 circles">
                <div className="rounded-full w-max bg-gradient-to-r from-green-700 to-green-600 text-black flex justify-center p-10 hover:text-gray-200">
                  <img className="w-20" src="img/servicioofc.png" alt="" />
                </div>
              </div>
            </div>
          </div>
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">Servicio</div>
            <p className="text-base">
              Ser consecuentes en todo momento en ofrecer un servicio de
              excelencia a los clientes, es decir formar equipos positivos, con
              energía y espíritu joven capaces de realizar la mejor gestión en
              cumplir lo acordado con el cliente.
            </p>
          </div>
        </div>

        <div
          data-aos="zoom-in"
          className="max-w-sm rounded overflow-hidden text-center "
        >
          <div className="flex justify-center p-2">
            <div className="rounded-full p-3 circles">
              <div className="rounded-full p-2 circles">
                <div className="rounded-full w-max bg-gradient-to-r from-green-700 to-green-600 text-black flex justify-center p-10 hover:text-gray-200">
                  <img className="w-20" src="img/resperto.png" alt="" />
                </div>
              </div>
            </div>
          </div>
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">Respeto</div>
            <p className="text-base">
              Valorar a los demás, es identificarse con los demás y conectarse
              con sus necesidades haciéndolas propias y buscando una solución
              como un equipo integrado.
            </p>
          </div>
        </div>
        <div
          data-aos="zoom-in"
          className="max-w-sm rounded overflow-hidden text-center "
        >
          <div className="flex justify-center p-2">
            <div className="rounded-full p-3 circles">
              <div className="rounded-full p-2 circles">
                <div className="rounded-full w-max bg-gradient-to-r from-green-700 to-green-600 text-black flex justify-center p-10 hover:text-gray-200">
                  <img className="w-20" src="img/inovation.png" alt="" />
                </div>
              </div>
            </div>
          </div>
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">Innovación</div>
            <p className="text-base">
              Estar a la vanguardia en el desarrollo y fabricación de las
              mejores telas de punto a nivel nacional e internacional.
            </p>
          </div>
        </div>
      </div>

      {/* Resumen de la empresa */}
      <div className="flex flex-col lg:p-20 md:p-14 p-10 items-center gap-6 bg-gray-100 md:flex-row lg:max-w-full md:max-w-full text-justify">
        <img
          data-aos="zoom-in-right"
          className="object-cover lg:w-auto rounded-xl md:h-auto md:w-80 "
          src="img/fibras.jpg"
          alt=""
        />
        <div
          data-aos="zoom-in"
          className="flex flex-col justify-between pb-0 sm:px-2 px-0 leading-normal"
        >
          <span className="text-sm mb-4 font-bold text-gray-400">
            SOMOS INNOVADORES POR EXCELENCIA
          </span>
          <p className="mb-5 text-4xl font-bold tracking-tight text-gray-900">
            DEVAPERU PARA EL PERÚ Y EL MUNDO
          </p>
          <p className="mb-5 font-normal text-gray-600">
            Devaperu es una empresa dedicada al diseño, fabricación y
            comercialización de prendas de vestir como ponchos, ruanas, casacas,
            chalecos, etc.; así como también mochilas, carteras y mantas
            multicolores.
          </p>
          <a
            href="/nosotros"
            className="text-sm font-bold hover:text-green-500 flex items-center"
          >
            <span>MAS SOBRE NOSOTROS</span>
            <span className="ml-1">
              <i className="pi pi-caret-right"></i>
            </span>
          </a>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Inicio;
