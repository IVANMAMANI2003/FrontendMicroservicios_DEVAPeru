/* eslint-disable no-unused-vars */
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./auth/Login";
import Search from "./common/header/Search";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Galeria from "./pages/client/Galeria";
import Inicio from "./pages/client/Inicio";


import ListProducto from "./pages/client/ListProducto";
import Contactanos from "./pages/client/Mensaje";
import Nosotros from "./pages/client/Nosotros";
import Productos from "./pages/client/Productos";
import Venta from "./views/Venta";

function App() {
  return (
    <>
      {location.pathname === "/sistema-dashboard" ||
      location.pathname === "/sistema-categorias" ||
      location.pathname === "/sistema-productos" ||
      location.pathname === "/sistema-ventas" ||
      location.pathname === "/sistema-usuarios" ||
      location.pathname === "/sistema-banners" ? (
        <Sidebar />
      ) : location.pathname === "/logindev" ? (
        <Login />
      ) : location.pathname === "/" ||
      location.pathname === "/inicio" ||
      location.pathname === "/nosotros" ||
      location.pathname === "/lista-producto" ||
      location.pathname === "/detalle-search" ||
      location.pathname === "/producto" ? (
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<Navigate to="/inicio" />} />
            <Route path="/inicio" Component={Inicio} />
            <Route path="/nosotros" Component={Nosotros} />
            <Route path="/producto" Component={Productos} />
            <Route path="/venta" Component={Venta} />
            <Route path="/galeria" Component={Galeria} />
            <Route path="/contactanos" Component={Contactanos} />
            <Route path="/lista-producto" Component={ListProducto} />
            <Route path="/detalle-search" Component={Search} />
          </Routes>
        </>
      ) : null}
    </>
  );
}

export default App;
