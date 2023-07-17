import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from 'react-query';
import Carga from '../../Components/Carga';
import Error from '../../Components/Error';



interface Category {
    id: string;
    name: string;
    image: string;
}

interface ApiResponse {
    data: Category[];
}

const Categories = () => {
    const { data: categories, isLoading, isError } = useQuery<ApiResponse>('categories', fetchCategories);
    const navigate = useNavigate();

    if (isLoading) {
        return <Carga />;
    }

    if (isError) {
        return <Error />;
    }

    const handleCategoryClick = (categoryID: string) => {
        navigate(`/productos/${categoryID}`);
    };

    return (
        <div className="container">
            <h1 className="mb-4">Categorías disponibles</h1>
            <div className="row">
                {categories?.map((category: Category) => (
                    <div className="col-lg-4 col-md-6 mb-4" key={category.id}>
                        <div className="card">
                            <img src={category.image} className="card-img-top" alt={category.name} />
                            <div className="card-body">
                                <h2 className="card-title">{category.name}</h2>
                                <Link to={`/productos/${category.id}`} onClick={() => handleCategoryClick(category.id)} className="btn btn-primary">
                                    Ver productos
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
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
