import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Carga from '../../Components/Carga';
import Error from '../../Components/Error';

interface Producto {
    id: number;
    title: string;
    category: {
        image: string;
    };
    price: number;
    description: string;
}


const ListaProducto = () => {
    const { categoryId } = useParams();
    const { data: products, isLoading, isError } = useQuery(['products', categoryId], () => fetchProducts(categoryId));
    const navigate = useNavigate();

    if (isLoading) {
        return <Carga />;
    }

    if (isError) {
        return <Error />;
    }

    const handleCategoryClick = () => {
        navigate('/categorias');
    };

    return (
        <div className="container">
            <h1 className="mb-4">Productos por categoría</h1>
            <div className="row">
                {products.map((product: Producto) => (
                    <div className="col-lg-4 col-md-6 mb-4" key={product.id}>
                        <div className="card">
                            <img src={product.category.image} className="card-img-top" alt={product.title} />
                            <div className="card-body">
                                <h2 className="card-title">{product.title}</h2>
                                <p className="card-text">{product.description}</p>
                                <p className="card-text"><b>Precio: </b> ${product.price}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <button onClick={handleCategoryClick} className="btn btn-primary mb-4">
                Regresar a categorías
            </button>
        </div>
    );
};

const fetchProducts = async (categoryId: string | undefined) => {
    try {
        const response = await axios.get(`https://api.escuelajs.co/api/v1/products/?categoryId=${categoryId}`);
        const products = response.data;
        return products;
    } catch (error) {
        throw new Error('Error al obtener los productos');
    }
};

export default ListaProducto;
