import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Inicio</Link> {/* Cambié "Home" a "Inicio" */}
                </li>
                <li>
                    <Link to="/login">Iniciar sesión</Link> {/* Cambié "Login" a "Iniciar sesión" */}
                </li>
                <li>
                    <Link to="/register">Registrarse</Link> {/* Cambié "Register" a "Registrarse" */}
                </li>
                <li>
                    <Link to="/categorias">Categorías</Link>
                </li>
                <li>
                    <Link to="/edicionProducto">Editar Producto</Link> {/* Cambié "Edita Producto" a "Editar Producto" */}
                </li>
                <li>
                    <Link to="/productos">Productos</Link> {/* Cambié "Producto" a "Productos" */}
                </li>
                <li>
                    <Link to="/productosDetalles">Detalles del Producto</Link> {/* Cambié "Detalle Producto" a "Detalles del Producto" */}
                </li>
                <li>
                    <Link to="/detalleCarrito">Detalles del Carrito</Link> {/* Cambié "Detalles Carrito" a "Detalles del Carrito" */}
                </li>
                <li>
                    <Link to="/crearProductos">Crear Producto</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
