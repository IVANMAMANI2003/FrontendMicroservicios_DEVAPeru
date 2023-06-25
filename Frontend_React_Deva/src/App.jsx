/* eslint-disable no-unused-vars */
import { Navigate, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Inicio from "./pages/client/Inicio";
import Nosotros from "./pages/client/Nosotros";
import Contactanos from "./pages/client/Mensaje";
import Productos from "./pages/client/Productos";
import Galeria from "./pages/client/Galeria";
import Login from "./auth/Login";

function App() {
  return (
    <>
      {location.pathname === "/sistema-dashboard" ||
      location.pathname === "/sistema-categorias" ||
      location.pathname === "/sistema-productos" ||
      location.pathname === "/sistema-usuarios" ||
      location.pathname === "/sistema-banners" ? (
        <Sidebar />
      ) : location.pathname === "/logindev" ? (
        <Login />
      ) : location.pathname === "/" ||
        location.pathname === "/inicio" ||
        location.pathname === "/nosotros" ||
        location.pathname === "/producto" ? (
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<Navigate to="/inicio" />} />
            <Route path="/inicio" Component={Inicio} />
            <Route path="/nosotros" Component={Nosotros} />
            <Route path="/producto" Component={Productos} />
            <Route path="/galeria" Component={Galeria} />
            <Route path="/contactanos" Component={Contactanos} />
          </Routes>
        </>
      ) : null}
    </>
  );
}

export default App;
