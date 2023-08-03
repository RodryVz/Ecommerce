import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Categories from './Pages/Categorias/Categories';
import Products from './Pages/Productos/Products';
import DetalleProducto from './Pages/DetalleProducto';
import DetalleCarrito from './Pages/Carrito/DetalleCarrito';
import EdicionProducts from './Pages/Administracion/EdicionProducts';
import Layout from './Components/Layout';
import { QueryClient, QueryClientProvider } from 'react-query';
import ListaProducto from './Pages/Categorias/ListaProducto';
import Admin from './Pages/Administracion/Admin';
import CrearProducto from './Pages/Administracion/CrearProducto';
import CrearCategoria from './Pages/Administracion/CrearCategoria';
import EditarCategoria from './Pages/Administracion/EditarCategoria';






function App() {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/categorias" element={<Categories />} />
            <Route path="/crearCategoria" element={<CrearCategoria />} />
            <Route path="/edicionCategoria" element={<EditarCategoria/>} />
            <Route path="/productos/:categoryId" element={<ListaProducto />} />
            <Route path="/edicionProducto" element={<EdicionProducts />} />
            <Route path="/crearProducto" element={<CrearProducto />} />
            <Route path="/productos" element={<Products />} />
            <Route path="/productosDetalles" element={<DetalleProducto />} /> 
            <Route path="/administracion" element={<Admin />} />
            <Route path="/detalleCarrito" element={<DetalleCarrito />} />
          </Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;