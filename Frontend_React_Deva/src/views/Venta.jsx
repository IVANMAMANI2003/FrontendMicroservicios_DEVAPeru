import axios from "axios";
import React, { useEffect, useState } from "react";


const VentaComponent = () => {
  const [documentoCliente, setDocumentoCliente] = useState("");
  const [nombreCliente, setNombreCliente] = useState("");
  const [tipoDocumento, setTipoDocumento] = useState("Boleta");
  const [subtotal, setSubtotal] = useState(0);
  const [igv, setIgv] = useState(0);
  const [total, setTotal] = useState(0);
  const [productos, setProductos] = useState([]);
  const [busquedaProducto, setBusquedaProducto] = useState("");
  const [productosEncontrados, setProductosEncontrados] = useState([]);

  useEffect(() => {
    calcularTotales();
  }, [productos]);

  
  const buscarProducto = async () => {
    try {
      const response = await ProductoService.getProductList(busquedaProducto);
      setProductosEncontrados(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const agregarProducto = (producto) => {
    const nuevoProducto = {
      id: producto.id,
      descripcion: producto.descripcion,
      cantidad: 1,
      precio: producto.precio,
      total: producto.precio
    };
    setProductos([...productos, nuevoProducto]);
    setBusquedaProducto("");
    setProductosEncontrados([]);
  };

  const eliminarProducto = (id) => {
    const nuevosProductos = productos.filter((producto) => producto.id !== id);
    setProductos(nuevosProductos);
  };

  const calcularTotales = () => {
    let subtotal = 0;
    productos.forEach((producto) => {
      subtotal += producto.total;
    });
    const igv = subtotal * 0.18;
    const total = subtotal + igv;
    setSubtotal(subtotal);
    setIgv(igv);
    setTotal(total);
  };

  const terminarVenta = async () => {
    try {
      // Crear objeto de venta con los datos necesarios
      const venta = {
        cliente: {
          nombre: nombreCliente,
          dni: documentoCliente
        },
        tipoDocumento,
        productos
      };

      // Hacer la petición POST a la API para registrar la venta
      const response = await axios.post("/api/ventas", venta);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex">
      <div className="w-8/12 p-2">
        <div className="mb-2 border border-gray-300">
          <div className="bg-blue-500 text-white py-2 px-4">Cliente</div>
          <div className="p-4">
            <div className="flex">
              <div className="w-1/2 pr-2">
                <label className="block">Nro Documento</label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-sm py-1 px-2 w-full"
                  value={documentoCliente}
                  onChange={(e) => setDocumentoCliente(e.target.value)}
                />
              </div>
              <div className="w-1/2 pl-2">
                <label className="block">Nombre</label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-sm py-1 px-2 w-full"
                  value={nombreCliente}
                  onChange={(e) => setNombreCliente(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mb-4 border border-gray-300">
          <div className="bg-blue-500 text-white py-2 px-4">Productos</div>
          <div className="p-4">
            <div className="mb-2">
              <div className="flex">
                <div className="w-2/3">
                  <input
                    type="text"
                    className="border border-gray-300 rounded-sm py-1 px-2 w-full"
                    placeholder="Buscar producto"
                    value={busquedaProducto}
                    onChange={(e) => setBusquedaProducto(e.target.value)}
                  />
                </div>
                <div className="w-1/3 pl-2">
                  <button
                    className="bg-blue-500 text-white py-1 px-2 rounded-sm w-full"
                    onClick={buscarProducto}
                  >
                    Buscar
                  </button>
                </div>
              </div>
            </div>
            <div>
              {productosEncontrados.length > 0 ? (
                <table className="table-auto w-full">
                  <thead>
                    <tr>
                      <th></th>
                      <th>Producto</th>
                      <th>Cantidad</th>
                      <th>Precio</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productosEncontrados.map((producto) => (
                      <tr key={producto.id}>
                        <td>
                          <button
                            className="text-red-500 hover:text-red-700"
                            onClick={() => agregarProducto(producto)}
                          >
                            Agregar
                          </button>
                        </td>
                        <td>{producto.descripcion}</td>
                        <td>1</td>
                        <td>{producto.precio}</td>
                        <td>{producto.precio}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div>Sin productos</div>
              )}
            </div>
            <div>
              <table className="table-auto w-full">
                <thead>
                  <tr>
                    <th></th>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Precio</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {productos.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <button
                          className="text-red-500 hover:text-red-700"
                          onClick={() => eliminarProducto(item.id)}
                        >
                          Eliminar
                        </button>
                      </td>
                      <td>{item.descripcion}</td>
                      <td>{item.cantidad}</td>
                      <td>{item.precio}</td>
                      <td>{item.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="w-4/12 p-2">
        <div className="mb-2 border border-gray-300">
          <div className="bg-blue-500 text-white py-2 px-4">Detalle</div>
          <div className="p-4">
            <div className="mb-2">
              <div className="flex">
                <div className="w-1/3">
                  <label className="block">Tipo:</label>
                </div>
                <div className="w-2/3">
                  <select
                    className="border border-gray-300 rounded-sm py-1 px-2 w-full"
                    value={tipoDocumento}
                    onChange={(e) => setTipoDocumento(e.target.value)}
                  >
                    <option value="Boleta">Boleta</option>
                    <option value="Factura">Factura</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="mb-2">
              <div className="flex">
                <div className="w-1/3">
                  <label className="block">Sub Total:</label>
                </div>
                <div className="w-2/3">
                  <input
                    type="text"
                    className="border border-gray-300 rounded-sm py-1 px-2 w-full"
                    value={subtotal}
                    disabled
                  />
                </div>
              </div>
            </div>
            <div className="mb-2">
              <div className="flex">
                <div className="w-1/3">
                  <label className="block">IGV (18%):</label>
                </div>
                <div className="w-2/3">
                  <input
                    type="text"
                    className="border border-gray-300 rounded-sm py-1 px-2 w-full"
                    value={igv}
                    disabled
                  />
                </div>
              </div>
            </div>
            <div className="mb-2">
              <div className="flex">
                <div className="w-1/3">
                  <label className="block">Total:</label>
                </div>
                <div className="w-2/3">
                  <input
                    type="text"
                    className="border border-gray-300 rounded-sm py-1 px-2 w-full"
                    value={total}
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-2">
          <div className="p-4">
            <button
              className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 w-full"
              onClick={terminarVenta}
            >
              Terminar Venta
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VentaComponent;
