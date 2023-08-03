import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { Link } from 'react-router-dom';
import Carga from '../../Components/Carga';

// Interfaz para definir la estructura de una categoría
interface Categoria {
    id: number;
    name: string;
    image: string;
}

const EditarCategoria = () => {
    const [categoryId, setCategoryId] = useState<number>();
    const [editMode, setEditMode] = useState<boolean>(false);
    const [editedName, setEditedName] = useState<string>('');

    const queryClient = useQueryClient();

    // Función para obtener la categoría por su ID utilizando React Query
    const { data: categoria, isLoading } = useQuery<Categoria | null>(
        ['categoria', categoryId], // Clave única para la consulta
        async () => {
            if (categoryId) {
                const response = await fetch(`https://api.escuelajs.co/api/v1/categories/${categoryId}`);
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Error al obtener la categoría por su ID.');
                }
            }
            return null;
        }
    );

    // Función para manejar el envío del formulario de actualización utilizando React Query
    const updateCategoria = useMutation(
        async () => {
            if (categoryId && editedName) {
                const response = await fetch(`https://api.escuelajs.co/api/v1/categories/${categoryId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: editedName,
                    }),
                });
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Error al actualizar la categoría.');
                }
            }
        },
        {
            onSuccess: () => {
                setEditMode(false); // Salir del modo de edición después de la actualización
                // Actualizar la lista de categorías en el cache de React Query
                queryClient.invalidateQueries('categories');
            },
        }
    );

    // Función para manejar la eliminación de la categoría utilizando React Query
    const deleteCategoria = useMutation(
        async () => {
            if (categoryId) {
                const response = await fetch(`https://api.escuelajs.co/api/v1/categories/${categoryId}`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Error al eliminar la categoría.');
                }
            }
        },
        {
            onSuccess: () => {
                setCategoryId(undefined); // Limpiar el ID de la categoría después de la eliminación
                // Actualizar la lista de categorías en el cache de React Query
                queryClient.invalidateQueries('categories');
            },
        }
    );

    // Función para manejar el clic en el botón de eliminar con aviso de confirmación
    const handleDeleteClick = () => {
        const confirmarEliminar = window.confirm('¿Estás seguro de que deseas eliminar esta categoría?');
        if (confirmarEliminar) {
            deleteCategoria.mutate();
        }
    };

    return (
        <div>
            <h2>Consigue una categoría que deseas actualizar o borrar</h2>
            <form onSubmit={(e) => {
                e.preventDefault();
                updateCategoria.mutate();
            }}>
                <div className="form-group">
                    <label>ID de la Categoría:</label>
                    <input
                        type="number"
                        className="form-control"
                        value={categoryId}
                        onChange={(e) => setCategoryId(Number(e.target.value))}
                    />
                </div>

                <Link to="/administracion" className="btn btn-warning">
                    Volver
                </Link>
            </form>

            {isLoading && <Carga/>}

            {categoria && !editMode && (
                <div className="card mt-4">
                    <div className="card-body">
                        <h5 className="card-title">{categoria.name}</h5>
                        <p className="card-text">ID: {categoria.id}</p>
                        <button className="btn btn-primary" onClick={() => setEditMode(true)}>
                            Actualizar Categoría
                        </button>
                        <button className="btn btn-danger ml-2" onClick={handleDeleteClick}>
                            Eliminar Categoría
                        </button>
                    </div>
                </div>
            )}

            {editMode && (
                <form onSubmit={(e) => {
                    e.preventDefault();
                    updateCategoria.mutate();
                }}>
                    <div className="form-group mt-4">
                        <label>Nombre:</label>
                        <input
                            type="text"
                            className="form-control"
                            value={editedName}
                            onChange={(e) => setEditedName(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Guardar Cambios</button>
                    <button className="btn btn-secondary ml-2" onClick={() => setEditMode(false)}>
                        Cancelar
                    </button>
                </form>
            )}

            {updateCategoria.isSuccess && <p className="text-success mt-2">¡Categoría actualizada exitosamente!</p>}
            {updateCategoria.isError && <p className="text-danger mt-2">Error al actualizar la categoría.</p>}
            {deleteCategoria.isSuccess && <p className="text-success mt-2">¡Categoría eliminada exitosamente!</p>}
            {deleteCategoria.isError && <p className="text-danger mt-2">Error al eliminar la categoría.</p>}
        </div>
    );
};

export default EditarCategoria;
