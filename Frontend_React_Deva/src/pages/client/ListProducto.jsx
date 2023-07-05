import { useEffect, useState } from "react";
import Footer from "../../partials/Footer";
import * as ProductoService from "../../services/ProductoService";
function ListProducto(product, addToCart) {
  const [count, setCount] = useState(0);
  const increment = () => {
    setCount(count + 1);
  };
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    getProductos();
  }, []);

  const getProductos = () => {
    ProductoService.getProductList()
      .then((response) => {
        setProductos(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="py-4 text-center text-4xl bg-gray-200">
        <a
          style={{
            fontFamily: "sans-serif",
            borderBottomWidth: "2px",
            borderBottomColor: "black",
          }}
        >
          Productos
        </a>
      </div>
      {/* Productos disponibles */}
      <div>
        <div className="p-10 justify-center">
          <div
            className="flex flex-wrap relative p-4 shadow-md rounded-lg border-2 xl:mx-20 sm:mx-2 bg-white gap-10"
            style={{ justifyContent: "center", justifyItems: "center" }}
          >
            {productos.map((product) => (
              <div
                key={product.id}
                className="max-w-md text-center relative p-2 border rounded-2xl m-2 hover:shadow-xl hover:bg-gray-100"
              >
                <a data-aos="zoom-in-down" href="/producto-detall">
                  <div className="flex justify-center mb-2">
                    <div className="rounded-2xl w-max flex justify-center">
                      <img
                        alt=".."
                        className="rounded-xl w-60 h-60"
                        style={{ objectFit: "cover" }}
                        src={
                          product.imagen
                            ? product.imagen
                            : "https://user-images.githubusercontent.com/507615/54591670-ac0a0180-4a65-11e9-846c-e55ffce0fe7b.png"
                        }
                      />
                      <div className="product-like">
                        <label>{count}</label> <br />
                        <i
                          className="fa-regular fa-heart"
                          onClick={increment}
                        ></i>
                      </div>
                    </div>
                  </div>
                </a>

                <div className="flex flex-row justify-center justify-items-center gap-10">
                  <div className="">
                    <div className="text-base">{product.nombre}</div>
                  </div>

                  <div className="price">
                    <h4>${product.precio}.00 </h4>
                    {/* step : 3
                                if hami le button ma click garryo bahne
                                */}
                  </div>
                </div>
                <button onClick={() => addToCart(product)}>
                  <i className="pi pi-plus"></i>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ListProducto;
