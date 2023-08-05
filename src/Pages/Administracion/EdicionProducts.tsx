import { useState } from 'react';
import { useQuery, useMutation } from 'react-query';
import { Link } from 'react-router-dom';


interface Producto {
    id: number;
    title: string;
    price: number;
    description: string;
    images: string[];
}

const EdicionProducts = () => {
    const [productoId, setProductoId] = useState<number>();
    const [editMode, setEditMode] = useState<boolean>(false);
    const [editedTitle, setEditedTitle] = useState<string>('');
    const [editedPrice, setEditedPrice] = useState<number>();

    // Función para obtener el producto por su ID utilizando React Query
    const { data: producto, isLoading } = useQuery<Producto | null>(
        ['producto', productoId], // Clave única para la consulta
        async () => {
            if (productoId) {
                const response = await fetch(`https://api.escuelajs.co/api/v1/products/${productoId}`);
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Error al obtener el producto por su ID.');
                }
            }
            return null;
        }
    );

    // Función para manejar el envío del formulario de actualización utilizando React Query
    const updateProducto = useMutation(
        async () => {
            if (productoId && editedTitle && editedPrice) {
                const response = await fetch(`https://api.escuelajs.co/api/v1/products/${productoId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        title: editedTitle,
                        price: editedPrice,
                    }),
                });
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Error al actualizar el producto.');
                }
            }
        },
        {
            onSuccess: () => {
                setEditMode(false);
            },
        }
    );

    // Función para manejar la eliminación del producto utilizando React Query
    const deleteProducto = useMutation(
        async () => {
            if (productoId) {
                const response = await fetch(`https://api.escuelajs.co/api/v1/products/${productoId}`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Error al eliminar el producto.');
                }
            }
        },
        {
            onSuccess: () => {
                setProductoId(undefined); 
            },
        }
    );

    // Función para manejar el clic en el botón de eliminar con aviso de confirmación
    const handleDeleteClick = () => {
        const confirmarEliminar = window.confirm('¿Estás seguro de que deseas eliminar este producto?');
        if (confirmarEliminar) {
            deleteProducto.mutate();
        }
    };

    return (
        <div>
            <h2>Consigue un producto que deseas actualizar o borrar</h2>
            <form onSubmit={(e) => {
                e.preventDefault();
                updateProducto.mutate();
            }}>
                <div className="form-group">
                    <label>ID del Producto:</label>
                    <input
                        type="number"
                        className="form-control"
                        value={productoId}
                        onChange={(e) => setProductoId(Number(e.target.value))}
                    />
                </div>
                
                <Link to="/administracion" className="btn btn-warning">
                    Volver
                </Link>
            </form>

            {isLoading && <p>Cargando...</p>}

            {producto && !editMode && (
                <div className="card mt-4">
                    <img src={producto.images[0]} className="card-img-top" alt={producto.title} />
                    <div className="card-body">
                        <h5 className="card-title">{producto.title}</h5>
                        <p className="card-text">ID: {producto.id}</p>
                        <p className="card-text">Descripción: {producto.description}</p>
                        <p className="card-text">Precio: {producto.price}</p>
                        <button className="btn btn-primary" onClick={() => setEditMode(true)}>
                            Actualizar Producto
                        </button>
                        <button className="btn btn-danger ml-2" onClick={handleDeleteClick}>
                            Eliminar Producto
                        </button>
                    </div>
                </div>
            )}

            {editMode && (
                <form onSubmit={(e) => {
                    e.preventDefault();
                    updateProducto.mutate();
                }}>
                    <div className="form-group mt-4">
                        <label>Título:</label>
                        <input
                            type="text"
                            className="form-control"
                            value={editedTitle}
                            onChange={(e) => setEditedTitle(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Precio:</label>
                        <input
                            type="number"
                            className="form-control"
                            value={editedPrice}
                            onChange={(e) => setEditedPrice(Number(e.target.value))}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Guardar Cambios</button>
                    <button className="btn btn-secondary ml-2" onClick={() => setEditMode(false)}>
                        Cancelar
                    </button>
                </form>
            )}

            {updateProducto.isSuccess && <p className="text-success mt-2">¡Producto actualizado exitosamente!</p>}
            {updateProducto.isError && <p className="text-danger mt-2">Error al actualizar el producto.</p>}
            {deleteProducto.isSuccess && <p className="text-success mt-2">¡Producto eliminado exitosamente!</p>}
            {deleteProducto.isError && <p className="text-danger mt-2">Error al eliminar el producto.</p>}
        </div>
    );
};

export default EdicionProducts;
