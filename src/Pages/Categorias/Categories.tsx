import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from 'react-query';
import { Key, ReactElement, JSXElementConstructor, ReactNode } from 'react';

const Categories = () => {
    const { data: categories, isLoading, isError } = useQuery('categories', fetchCategories);
    const navigate = useNavigate();

    if (isLoading) {
        return <p>Cargando categorías...</p>;
    }

    if (isError) {
        return <p>Error al cargar las categorías</p>;
    }

    const handleCategoryClick = (categoryID: any) => {
        navigate(`/productos/${categoryID}`);
    };

    return (
        <div>
            <h1>Categorías disponibles</h1>
            <ul>
                {categories.map((category: { id: Key | null | undefined; name: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined; image: string | undefined; }) => (
                    <li key={category.id}>
                        <div>
                            <h2>{category.name}</h2>
                            <img src={category.image} />
                            <Link to={`/productos/${category.id}`} onClick={() => handleCategoryClick(category.id)}>Ver productos</Link>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const fetchCategories = async () => {
    try {
        const response = await axios.get('https://api.escuelajs.co/api/v1/categories');
        const categories = response.data;
        return categories;
    } catch (error) {
        throw new Error('Error al obtener las categorías');
    }
};

export default Categories;
