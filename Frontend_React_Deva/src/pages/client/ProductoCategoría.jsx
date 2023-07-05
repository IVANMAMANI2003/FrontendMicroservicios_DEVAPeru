/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import axios from "axios";
import * as ProductService from "../../services/ProductoService";
import { headers } from "../../config/config";
import { useParams } from "react-router-dom";
import { Paginator } from "primereact/paginator";

function ProductoCategoria() {
  const { categoryID } = useParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [totalRecords, setTotalRecords] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const rows = 8;

  useEffect(() => {
    console.log(categoryID);
    fetchCategories();
    getProducts();
  }, [currentPage]);

  const getProducts = () => {
    ProductService.getProductList()
      .then((response) => {
        console.log(response.data);
        setProducts(response.data.data);
        setTotalRecords(response.data.totalRecords);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:9090/categoria", {
        headers,
      });
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories", error);
    }
  };

  const handleCategoryChange = (event) => {
    const category = categories.find(
      (cat) => cat.nombre === event.target.value
    );
    setSelectedCategory(category);
    setCurrentPage(1); // Reiniciar la página actual al seleccionar una categoría diferente
    const url = `/categoria-productos/${category.id}`;
    window.location.href = url;
  };

  const onPageChange = (event) => {
    setCurrentPage(event.page + 1);
  };

  return (
    <div className="m-10 mt-5">
      {/* MIGA DE PAN */}
      <div className="bg-white items-center flex justify-between mb-3 px-2">
        <ul className="flex items-center">
          <li className="inline-flex items-center">
            <a
              href="/inicio"
              className="text-gray-600 hover:text-blue-500 hover:size"
            >
              <i className="fa-solid fa-house-chimney"></i>
            </a>
            <span className="mx-4 h-auto text-gray-400 font-medium">
              <i className="fa-solid fa-chevron-right"></i>
            </span>
          </li>

          <li className="inline-flex items-center">
            <a href="/productos" className="text-gray-600 hover:text-blue-500">
              Productos
            </a>
            <span className="mx-4 h-auto text-gray-400 font-medium">
              <i className="fa-solid fa-chevron-right"></i>
            </span>
          </li>

          <li className="inline-flex items-center">
            <a className="text-gray-600">Categoría</a>
            <span className="mx-4 h-auto text-gray-400 font-medium">
              <i className="fa-solid fa-chevron-right"></i>
            </span>
          </li>

          <li className="inline-flex items-center">
            <span className="text-blue-500">
              {products && products.length > 0 && products[0].categoria.nombre}
            </span>
          </li>
        </ul>
      </div>

      <div className="px-2 mb-3">
        <span>Categoria:</span>
        <select
          className="shadow appearance-none border rounded-lg pl-4 pr-8 py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          name="categoria"
          id="categoria"
          value={selectedCategory ? selectedCategory.nombre : ""}
          onChange={handleCategoryChange}
        >
          <option value="">Seleccione...</option>
          {categories.map((category) => (
            <option value={category.nombre} key={category.id}>
              {category.nombre}
            </option>
          ))}
        </select>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center">
        {products &&
          products.length > 0 && // Verificar si los productos existen y no están vacíos
          products.map((product) => (
            <div
              key={product.id}
              className="max-w-sm rounded-2xl shadow-lg m-2 border-2 border-gray-100 p-6 pb-10 relative"
            >
              <div className="flex justify-center border p-2 rounded-2xl">
                <span className="absolute left-4 top-4 italic bg-yellow-400 rounded-lg px-3 shadow-md text-sm">
                  {product.categoria.nombre}
                </span>
                <img
                  className="rounded-xl w-60 h-60"
                  style={{ objectFit: "cover" }}
                  src={
                    product.imagen
                      ? product.imagen
                      : "https://user-images.githubusercontent.com/507615/54591670-ac0a0180-4a65-11e9-846c-e55ffce0fe7b.png"
                  }
                  alt={product.nombre}
                />
              </div>
              <div className="py-4">
                <div className="font-bold text-xl mb-2">{product.nombre}</div>
                <p className="text-gray-700 text-base">{product.material}</p>
              </div>
              <div className="absolute bottom-4 right-2">
                <a
                  href={`/subpages/detalle/${product.id}`}
                  className="bg-indigo-600 text-xs px-4 py-2 rounded-lg text-white font-semibold tracking-wide cursor-pointer hover:bg-indigo-500"
                >
                  <i className="fa-solid fa-plus"></i> Ver más
                </a>
              </div>
            </div>
          ))}
      </div>
      <div className="mx-4 mt-4">
        {products && products.length > 0 && (
          <Paginator
            first={currentPage * rows - rows}
            rows={rows}
            totalRecords={totalRecords}
            onPageChange={onPageChange}
          />
        )}
      </div>
    </div>
  );
}

export default ProductoCategoria;
