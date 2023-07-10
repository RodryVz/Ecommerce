import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Categories from './Pages/Categories';
import Products from './Pages/Products';
import DetalleProducto from './Pages/DetalleProducto';
import DetalleCarrito from './Pages/DetalleCarrito';
import CrearProducto from './Pages/CrearProducto';
import EdicionProducts from './Pages/EdicionProducts';
import Navbar from './assets/Components/Navbar';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/categorias" element={<Categories />} />
        <Route path="/edicionProducto" element={<EdicionProducts />} />
        <Route path="/productos" element={<Products />} /> {/* Corregido a "/productos" */}
        <Route path="/productosDetalles" element={<DetalleProducto />} />
        <Route path="/detalleCarrito" element={<DetalleCarrito />} />
        <Route path="/crearProductos" element={<CrearProducto />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
