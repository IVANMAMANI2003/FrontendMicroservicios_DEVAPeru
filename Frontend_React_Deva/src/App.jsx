import Navbar from "./components/Navbar";
import Category from "./pages/Categoria";
import Product from "./pages/Producto";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' Component={Category} />
        <Route path='/categorias' Component={Category} />
        <Route path='/productos' Component={Product} />
      </Routes>
    </>
  )
}

export default App;
