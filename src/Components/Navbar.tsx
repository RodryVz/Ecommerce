import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Inicio</Link>
                </li>
                <li>
                    <Link to="/login">Iniciar sesión</Link> 
                </li>
                <li>
                    <Link to="/register">Registrarse</Link> 
                </li>
                <li>
                    <Link to="/productos">Productos</Link> 
                </li>
                <li>
                    <Link to="/detalleCarrito">Detalles del Carrito</Link> 
                </li>
                <li>
                    <Link to="/categorias">Categoria</Link> 
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
