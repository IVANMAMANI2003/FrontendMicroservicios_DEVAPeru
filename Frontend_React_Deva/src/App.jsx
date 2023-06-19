/* eslint-disable no-unused-vars */
import { Navigate, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Category from "./pages/Categoria";
import Product from "./pages/Producto";
import User from "./pages/client/Galeria";
import Contactanos from "./pages/Mensaje";
import Inicio from "./pages/Inicio";
import Login from "./auth/Login";
import Nosotros from "./pages/Nosotros";
import Post from "./admin/pages/Post";
import mensaje from "./pages/Mensaje";

function App() {
  return (
    <>
      {location.pathname === "/sistema-dashboard" || location.pathname === "/sistema-categorias" || location.pathname === "/sistema-productos" || location.pathname === "/sistema-usuarios"
        ? <Sidebar />
        : location.pathname === "/logindev"
          ? <Login />
          : location.pathname === "/" || location.pathname === "/inicio" || location.pathname === "/nosotros" || location.pathname === "/producto"
            ? <>
              <Navbar />
              <Routes>
                <Route path='/' element={<Navigate to="/inicio" />} />
                <Route path='/inicio' Component={Inicio} />
                <Route path='/nosotros' Component={Nosotros} />
                <Route path='/producto' Component={Product} />
                <Route path='/usuario' Component={User} />
                <Route path='/mensaje' Component={mensaje} />
                <Route path='/contactanos' Component={mensaje} />
              </Routes>
            </>
            : null
      }
    </>
  );
}

export default App;
