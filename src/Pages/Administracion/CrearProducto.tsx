import { useState } from 'react';
import { Link } from 'react-router-dom';

// Interfaz para definir la estructura de un nuevo producto
interface NuevoProducto {
    id: number;
    title: string;
    price: number;
    description: string;
    categoryId: number;
    images: string[];
}

const CrearProducto = () => {
    // Estados para almacenar los valores del formulario y los mensajes de éxito o error
    const [title, setTitle] = useState<string>('');
    const [price, setPrice] = useState<number>();
    const [description, setDescription] = useState<string>('');
    const [categoryId, setCategoryId] = useState<number>();
    const [image, setImage] = useState<string>('');
    const [successMessage, setSuccessMessage] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [nuevoProducto, setNuevoProducto] = useState<NuevoProducto | null>(null);

    // Función para manejar el envío del formulario
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newProduct: NuevoProducto = {
            id: 0, // Aún no conocemos el ID del producto creado, lo establecemos a 0 por ahora
            title,
            price,
            description,
            categoryId,
            images: [image],
        };

        try {
            // Realizar la petición POST a la API para crear un nuevo producto
            const response = await fetch('https://api.escuelajs.co/api/v1/products/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newProduct),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Producto creado:', data);
                setSuccessMessage('¡Producto creado exitosamente!');
                setErrorMessage('');
                // Actualizamos el ID del producto creado con el valor proporcionado por la API
                setNuevoProducto({ ...newProduct, id: data.id });
                // Reiniciar el formulario después de una respuesta exitosa
                setTitle('');
                setPrice(0);
                setDescription('');
                setCategoryId(0);
                setImage('');
            } else {
                setErrorMessage('Error al crear el producto.');
                setSuccessMessage('');
            }
        } catch (error) {
            console.log('Error al conectar con la API:', error);
            setErrorMessage('Error al conectar con la API.');
            setSuccessMessage('');
        }
    };

    return (
        <div className="container mt-4">
            <h2>Crear Producto</h2>
            {/* Mostrar el mensaje de éxito o error */}
            {successMessage && <p className="text-success">{successMessage}</p>}
            {errorMessage && <p className="text-danger">{errorMessage}</p>}
            {nuevoProducto ? ( // Mostrar la card con el producto creado solo si hay un producto en el estado nuevoProducto
                <div className="card mt-4">
                    <img src={nuevoProducto.images[0]} className="card-img-top" alt={nuevoProducto.title} />
                    <div className="card-body">
                        <h5 className="card-title">{nuevoProducto.title}</h5>
                        <p className="card-text">ID: {nuevoProducto.id}</p>
                        <p className="card-text">Precio: {nuevoProducto.price}</p>
                    </div>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Título:</label>
                        <input
                            type="text"
                            className="form-control"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Precio:</label>
                        <input
                            type="number"
                            className="form-control"
                            value={price}
                            onChange={(e) => setPrice(Number(e.target.value))}
                        />
                    </div>
                    <div className="form-group">
                        <label>Descripción:</label>
                        <textarea
                            className="form-control"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Categoría ID:</label>
                        <input
                            type="number"
                            className="form-control"
                            value={categoryId}
                            onChange={(e) => setCategoryId(Number(e.target.value))}
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
                    <button type="submit" className="btn btn-primary">Crear Producto</button>
                    <Link to="/administracion" className="btn btn-warning">
                        Volver
                    </Link>
                </form>
            )}
        </div>
    );
};

export default CrearProducto;
