
import { faCartShopping, faGear, faHouseChimney } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';







const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <Link className="navbar-brand" to="/">
                <FontAwesomeIcon icon={faHouseChimney} />
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
                    <ul className="navbar-nav mr-auto ml-4">
                        <li className="nav-item ml-3">
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
                            <FontAwesomeIcon icon={faCartShopping} />
                            </Link>
                        </li>
                    </ul>
                    <div className="navbar-collapse justify-content-end">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">
                                Iniciar
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/register">
                                Crear Cuenta
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/administracion">
                                <FontAwesomeIcon icon={faGear} />
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
