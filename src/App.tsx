
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Categories from './Pages/Categorias/Categories';
import Products from './Pages/Productos/Products';
import DetalleProducto from './Pages/DetalleProducto';
import DetalleCarrito from './Pages/Carrito/DetalleCarrito';
import CrearProducto from './Pages/CrearProducto';
import EdicionProducts from './Pages/EdicionProducts';
import Layout from './Components/Layout';
import { QueryClient, QueryClientProvider } from 'react-query';
import ListaProducto from './Pages/Categorias/ListaProducto';
import { CarritoProvider } from './Pages/Carrito/CarritoContext';
import FinalizarCompra from './Components/FinalizarCompra';


function App() {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <Router>
        <CarritoProvider> {/* Agregar el CarritoProvider aquí */}
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/categorias" element={<Categories />} />
              <Route path="/productos/:categoryId" element={<ListaProducto />} />
              <Route path="/edicionProducto" element={<EdicionProducts />} />
              <Route path="/productos" element={<Products />} />
              <Route path="/productosDetalles" element={<DetalleProducto />} />
              <Route path="/detalleCarrito" element={<DetalleCarrito />} />
              <Route path="/crearProductos" element={<CrearProducto />} />
              <Route path="/finalizarCompra" element={<FinalizarCompra />} />
            </Route>
          </Routes>
        </CarritoProvider> {/* Cierre del CarritoProvider */}
      </Router>
    </QueryClientProvider>
  );
}

export default App;
