/* eslint-disable no-unused-vars */
import { Navigate, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Post from "./pages/Post";
import Category from "./pages/Categoria";
import Product from "./pages/Producto";
import User from "./pages/Usuario";
import mensaje from "./pages/Mensaje";
import Inicio from "./pages/Inicio";
import Login from "./auth/Login";

function App() {
  return (
    <>
      {location.pathname === ("/sistema-dashboard" || "/sistema-categorias" || "/sistema-productos" || "/sistema-banners" || "/sistema-videos" || "/sistema-mensajes" || "/sistema-usuarios" || "/sistema-perfil")
        ? <Sidebar />
        : location.pathname === "/logindev"
          ? <Login />
          : <>
            <Navbar />
            <Routes>
              <Route path='/' element={<Navigate to="/inicio" />} />
              <Route path='/inicio' Component={Inicio} />
              <Route path='/categoria' Component={Category} />
              <Route path='/producto' Component={Product} />
              <Route path='/usuario' Component={User} />
              <Route path='/mensaje' Component={mensaje} />
              <Route path='/newmensaje' Component={mensaje} />
            </Routes>
          </>
      }



    </>
  );
}

export default App;
