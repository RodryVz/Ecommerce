
import { Link } from 'react-router-dom';
import imagenEcommerce from '../../assets/tienda.jpg';
import './Home.css';

const Home = () => {
    return (
        <div className="home-container">
            <div className="home-image" style={{ backgroundImage: `url(${imagenEcommerce})` }}>
                <div className="overlay">
                    <div className="home-content">
                        <h1 className="home-title">¡Bienvenido a nuestro Ecommerce!</h1>
                        <p className="home-description">
                            En nuestra tienda encontrarás una gran selección de productos de alta calidad.
                            ¡Explora nuestras categorías y descubre las mejores ofertas!
                        </p>
                        <Link to="/productos">
                            <button className="home-cta-btn">¡Ver productos!</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
