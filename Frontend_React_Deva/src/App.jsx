/* eslint-disable no-unused-vars */
import { Navigate, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Product from "./pages/Producto";
import Galeria from "./pages/client/Galeria";
import Contactanos from "./pages/Mensaje";
import Inicio from "./pages/Inicio";
import Login from "./auth/Login";
import Nosotros from "./pages/Nosotros";

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
                <Route path='/galeria' Component={Galeria} />
                <Route path='/contactanos' Component={Contactanos} />
              </Routes>
            </>
            : null
      }
    </>
  );
}

export default App;
