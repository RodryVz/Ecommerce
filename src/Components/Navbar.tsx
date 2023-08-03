import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    Inicio
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/productos">
                                Productos
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/categorias">
                                Categoría
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/detalleCarrito">
                                Detalles del Carrito
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="navbar-collapse justify-content-end">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">
                                Iniciar sesión
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/register">
                                Registrarse
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/administracion">
                                Administracion
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
