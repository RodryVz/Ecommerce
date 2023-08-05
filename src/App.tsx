import 'bootswatch/dist/solar/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Categories from './Pages/Categorias/Categories';
import Products from './Pages/Productos/Products';
import DetalleCarrito from './Pages/Carrito/DetalleCarrito';
import Layout from './Components/Layout';
import { QueryClient, QueryClientProvider } from 'react-query';
import ListaProducto from './Pages/Categorias/ListaProducto';
import { CarritoProvider } from './Pages/Carrito/CarritoContext';
import FinalizarCompra from './Components/FinalizarCompra';
import Home from './Pages/Home/Home';
import CrearProducto from './Pages/Administracion/CrearProducto';
import EdicionProducts from './Pages/Administracion/EdicionProducts';
import Admin from './Pages/Administracion/Admin';
import CrearCategoria from './Pages/Administracion/CrearCategoria';
import EditarCategoria from './Pages/Administracion/EditarCategoria';


function App() {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <Router>
        <CarritoProvider> 
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
              <Route path="/productos" element={<Products />} />
              <Route path="/detalleCarrito" element={<DetalleCarrito />} />
              <Route path="/crearProducto" element={<CrearProducto />} />
              <Route path="/administracion" element={<Admin />} />
              <Route path="/finalizarCompra" element={<FinalizarCompra />} />
            </Route>
          </Routes>
        </CarritoProvider> 
      </Router>
    </QueryClientProvider>
  );
}

export default App; 