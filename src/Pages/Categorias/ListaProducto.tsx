import { useQuery } from 'react-query';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from 'react';

const ListaProducto = () => {
    const { categoryId } = useParams();
    const { data: products, isLoading, isError } = useQuery(['products', categoryId], () => fetchProducts(categoryId));
    const navigate = useNavigate();

    if (isLoading) {
        return <p>Cargando productos...</p>;
    }

    if (isError) {
        return <p>Error al cargar los productos</p>;
    }

    const handleCategoryClick = () => {
        navigate('/categorias');
    };

    return (
        <div>
            <h1>Productos por categoría</h1>
            <button onClick={handleCategoryClick}>Regresar a categorías</button>
            <ul>
                {products.map((product: { id: Key | null | undefined; title: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined; category: { image: string | undefined; }; price: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; description: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; }) => (
                    <li key={product.id}>
                        <div>
                            <h2>{product.title}</h2>
                            <img src={product.category.image}/>
                            <p>Precio: {product.price}</p>
                            <p>{product.description}</p>
                        </div>
                    </li>
                ))}
            </ul>
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
