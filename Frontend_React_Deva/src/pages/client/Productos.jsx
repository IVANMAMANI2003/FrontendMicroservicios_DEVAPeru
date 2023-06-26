import { useEffect, useState } from "react";
import { Carousels } from "../../components/Carousel";
import Footer from "../../partials/Footer";
import * as BannerService from "../../services/BannerService";
import * as CategoryService from "../../services/CategoriaService";

function Productos() {
  
  const [banners, setBanners] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getBanners();
    getCategories();
  }, []);

  const getBanners = () => {
    BannerService.getBannerList()
      .then((response) => {
        const filteredBanners = response.data.filter(
          (banner) => banner.tipo === "Productos"
        );
        setBanners(filteredBanners);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getCategories = () => {
    CategoryService.getCategoryList()
      .then((response) => {
        setCategories(response.data);
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

      

      <div className="py-4 text-center text-4xl bg-gray-200">
        <a
          style={{
            fontFamily: "sans-serif",
            borderBottomWidth: "2px",
            borderBottomColor: "black",
          }}
        >
          CATEGORÍAS
        </a>
      </div>
      {/* Categorías disponibles */}
      <div className="p-10 justify-center">
      
    
        <div
          className="flex flex-wrap relative p-4 shadow-md rounded-lg border-2 xl:mx-20 sm:mx-2 bg-white gap-10"
          style={{ justifyContent: "center", justifyItems: "center" }}
        >
          
          {categories.map((category) => (
            <div
              key={category.id}
              className="max-w-md text-center relative p-2 border rounded-2xl m-2 hover:shadow-xl hover:bg-gray-100"
            >
              <a
                data-aos="zoom-in-down"
                href="/lista-producto"
              >
                <div className="flex justify-center mb-2">
                  <div className="rounded-2xl w-max flex justify-center">
                    <img
                      alt=".."
                      className="rounded-xl w-60 h-60"
                      style={{ objectFit: "cover" }}
                      src={
                        category.imagen ? category.imagen : "https://user-images.githubusercontent.com/507615/54591670-ac0a0180-4a65-11e9-846c-e55ffce0fe7b.png"
                      }
                    />
                  </div>
                </div>
                <div className="flex flex-row justify-center justify-items-center gap-10">
                <div className="">
                  <div className="text-base">{category.nombre}</div>
                </div>
                
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Características del producto */}
      <div className="p-8 px-10 bg-gray-200">
        <div data-aos="zoom-in" className="text-center">
          <a
            className="lg:text-4xl text-2xl"
            style={{
              fontFamily: "sans-serif",
              borderBottomWidth: "2px",
              borderBottomColor: "black",
            }}
          >
            CARACTERÍSTICAS DEL PRODUCTO
          </a>
        </div>

        <div className="grid lg:grid-cols-4 md:grid-cols-2 justify-items-center rounded-2xl border-2 p-8 pb-0">
          <div
            data-aos="zoom-in-up"
            className="max-w-md overflow-hidden text-center"
          >
            <div className="flex justify-center">
              <div className="w-max flex justify-center">
                <img className="w-20" src="img/ajuste.png" alt="" />
              </div>
            </div>
            <div className="px-6 py-4 pb-0">
              <p className="text-base">
                Lorem ipsum dolor sit amet consectetur adipiscing elit ultrices
              </p>
            </div>
          </div>
          <div
            data-aos="zoom-in-up"
            className="max-w-md overflow-hidden text-center"
          >
            <div className="flex justify-center">
              <div className="w-max flex justify-center">
                <img className="w-20" src="img/seguro.png" alt="" />
              </div>
            </div>
            <div className="px-6 py-4 pb-0">
              <p className="text-base">
                Lorem ipsum dolor sit amet consectetur adipiscing elit ultrices
              </p>
            </div>
          </div>
          <div
            data-aos="zoom-in-up"
            className="max-w-md overflow-hidden text-center"
          >
            <div className="flex justify-center">
              <div className="w-max flex justify-center">
                <img className="w-20" src="/durable.png" alt="" />
              </div>
            </div>
            <div className="px-6 py-4 pb-0">
              <p className="text-base">
                Lorem ipsum dolor sit amet consectetur adipiscing elit ultrices
              </p>
            </div>
          </div>
          <div
            data-aos="zoom-in-up"
            className="max-w-md overflow-hidden text-center"
          >
            <div className="flex justify-center">
              <div className="w-max flex justify-center">
                <img className="w-20" src="img/subida.png" alt="" />
              </div>
            </div>
            <div className="px-6 py-4 pb-0">
              <p className="text-base">
                Lorem ipsum dolor sit amet consectetur adipiscing elit ultrices
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Productos destacados */}
      <div className="pb-20 p-3">
        <div
          data-aos="zoom-in"
          className="p-8 text-center text-4xl flex justify-center"
        >
          <a
            style={{
              fontFamily: "sans-serif",
              borderBottomWidth: "2px",
              borderBottomColor: "black",
            }}
          >
            PRODUCTOS RECIENTES
          </a>
        </div>

        <div className="my-4">
          <div className="flex items-center">
            <div
              id="sliderContainer"
              className="w-full overflow-hidden border h-96 rounded-2xl"
            >
              <ul
                id="slider"
                className="flex w-full transition-margin duration-1000"
              >
                <li className="w-max">
                  <div className="rounded-2xl overflow-hidden shadow-lg m-2 p-4 border bg-white w-max h-max">
                    <img
                      alt=".."
                      className="rounded-2xl p-2 border w-56 h-56 mx-auto"
                      style={{ objectFit: "cover" }}
                      src="@if ($product->image) {{ Storage::url($product->image->url) }}@else /default.jpg @endif"
                    />
                    <div className="pt-4 ">
                      <div className="font-semibold text-md mb-2 text-center">
                        product.name
                      </div>
                      <div className="flex justify-end">
                        <a className="bg-indigo-600 text-xs px-4 py-2 rounded-lg text-white font-semibold tracking-wide cursor-pointer hover:bg-indigo-500">
                          <i className="fa-solid fa-plus"></i> Ver más
                        </a>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Productos;
