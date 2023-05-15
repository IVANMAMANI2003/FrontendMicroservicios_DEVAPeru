import Navbar from "./components/Navbar";
import Category from "./pages/Categoria";
import Product from "./pages/Producto";
import { Routes, Route } from "react-router-dom";
import User from "./pages/Usuario";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' Component={Category} />
        <Route path='/categoria' Component={Category} />
        <Route path='/producto' Component={Product} />
        <Route path='/usuario' Component={User} />
      </Routes>
    </>
  )
}

export default App;