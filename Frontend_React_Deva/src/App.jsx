/* eslint-disable no-unused-vars */
import Navbar from "./components/Navbar";
import Category from "./pages/Categoria";
import Product from "./pages/Producto";
import { Routes, Route } from "react-router-dom";
import User from "./pages/Usuario";
import Mensaje from "./pages/Mensaje";
import newmensaje from "./pages/ReactFinalFormDemo";
//import Image from "./pages/Imagen";
import Post from "./pages/Post";
import Sidebar from "./components/Sidebar";
//import { FormPage } from "./components/FormMensaje";


function App() {
  return (
    <>
      <Sidebar></Sidebar>

      {/* <Navbar />
      <Routes>
        <Route path='/' Component={Post} />
        <Route path='/categoria' Component={Category} />
        <Route path='/producto' Component={Product} />
        <Route path='/usuario' Component={User} />
        <Route path='/mensaje' Component={Mensaje} />
        <Route path='/newmensaje' Component={newmensaje} />
      </Routes> */}
    </>
  )
}

export default App;
