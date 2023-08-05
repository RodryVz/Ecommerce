import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';


interface CategoriaCompleta {
    id?: number; 
    name: string;
    image: string;
}

const CrearCategoria = () => {
    // Estados para almacenar los valores del formulario y los mensajes de éxito o error
    const [categoryId, setCategoryId] = useState<number | null>(null);
    const [name, setName] = useState<string>('');
    const [image, setImage] = useState<string>('');
    const [successMessage, setSuccessMessage] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');

    const queryClient = useQueryClient();


    const mutation = useMutation(
        async (updatedCategory: CategoriaCompleta) => {
            const url = categoryId
                ? `https://api.escuelajs.co/api/v1/categories/${categoryId}`
                : 'https://api.escuelajs.co/api/v1/categories/';

            const method = categoryId ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedCategory),
            });

            if (!response.ok) {
                throw new Error('Error al guardar la categoría.');
            }

            return response.json();
        },
        {
            onSuccess: (data) => {
                console.log('Categoría creada o actualizada:', data);
                setSuccessMessage(categoryId ? '¡Categoría actualizada exitosamente!' : '¡Categoría creada exitosamente!');
                setErrorMessage('');
                setCategoryId(null);
                setName('');
                setImage('');
                // Actualizar la lista de categorías en el cache de React Query
                queryClient.invalidateQueries('categories');
            },
            onError: (error) => {
                console.log('Error al conectar con la API:', error);
                setErrorMessage('Error al conectar con la API.');
                setSuccessMessage('');
            },
        }
    );

    // Función para manejar el envío del formulario
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const updatedCategory: CategoriaCompleta = {
            name,
            image,
        };

        if (categoryId) {
            updatedCategory.id = categoryId;
        }

        mutation.mutate(updatedCategory);
    };

    return (
        <div className="container mt-4">
            <h2>{categoryId ? 'Editar Categoría' : 'Crear Categoría'}</h2>
            {successMessage && <p className="text-success">{successMessage}</p>}
            {errorMessage && <p className="text-danger">{errorMessage}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Nombre:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>URL de la imagen:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    {categoryId ? 'Guardar Cambios' : 'Crear Categoría'}
                </button>
                <Link to="/administracion" className="btn btn-warning">
                    Volver
                </Link>
            </form>

            {/* Mostrar los datos de la categoría creada */}
            {mutation.isSuccess && (
                <div className="card mt-4">
                    <div className="card-body">
                        <h5 className="card-title">{name}</h5>
                        <p className="card-text">ID: {mutation.data?.id}</p>
                        <img src={image} className="card-img-top" alt={name} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default CrearCategoria;
