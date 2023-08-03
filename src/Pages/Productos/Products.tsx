import { useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import Error from '../../Components/Error';
import Carga from '../../Components/Carga';
import { Carousel } from 'react-bootstrap';
import FiltroProducto from './FiltroProducto';
import { Link } from 'react-router-dom';
import { useCarritoContext } from '../Carrito/CarritoContext';


interface Producto {
    id: number;
    title: string;
    price: number;
    category: {
        image: string;
    };
    images: string[];
}


const cardImageStyle = {
    height: '200px',
    objectFit: undefined,
};

const Productos = () => {
    const [offset, setOffset] = useState<number>(0);
    const limit: number = 10;
    const queryClient = useQueryClient();
    const [filtroTitulo, setFiltroTitulo] = useState<string>('');
    const [filtroCategoriaId, setFiltroCategoriaId] = useState<number>(0);
    const [filtroPrecio, setFiltroPrecio] = useState<number>();
    const [filtradoCompleto, setFiltradoCompleto] = useState(false);
    const navigate = useNavigate();

    const fetchProductos = async (title?: string, categoryId?: number, price?: number) => {
        let url = `https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${limit}`;

        if (title) {
            url += `&title=${title}`;
        }

        if (categoryId) {
            url += `&categoryId=${categoryId}`;
        }

        if (price) {
            url += `&price=${price}`;
        }

        const response = await fetch(url);

        if (!response.ok) {
            <Error/>;
        }

        return response.json();
    };

    const { data: productos, isLoading, isError } = useQuery<Producto[], Error>(
        ['productos', offset, filtroTitulo, filtroCategoriaId, filtroPrecio],
        () => fetchProductos(filtroTitulo, filtroCategoriaId, filtroPrecio),
        {
            keepPreviousData: true,
            onSuccess: () => setFiltradoCompleto(true),
            onError: () => setFiltradoCompleto(false),
        }
    );

    const handlePreviousPage = () => {
        setOffset((prevOffset) => Math.max(prevOffset - limit, 0));
    };

    const handleNextPage = () => {
        if (productos && productos.length === limit) {
            setOffset((prevOffset) => prevOffset + limit);
        }
    };

    const handleFiltrar = async (titulo: string, categoriaId: number, precio: number) => {
        setFiltroTitulo(titulo);
        setFiltroCategoriaId(categoriaId);
        setFiltroPrecio(precio);
        setOffset(0);
        queryClient.invalidateQueries('productos');

        try {
            await fetchProductos(filtroTitulo, filtroCategoriaId, filtroPrecio);
            setFiltradoCompleto(true);
            navigate('/productos');
        } catch (error) {
            console.error(error);
            setFiltradoCompleto(false);
        }
    };

    
    const { carrito, setCarrito } = useCarritoContext();

    
    const handleAgregarAlCarrito = (producto: Producto) => {
        
        const productoEnCarrito = carrito.find((p: { id: number }) => p.id === producto.id);

        if (productoEnCarrito) {
            const carritoActualizado = carrito.map((p: { id: number; cantidad: number }) =>
                p.id === producto.id
                    ? {
                        ...p,
                        cantidad: p.cantidad + 1,
                        precioTotal: (p.cantidad + 1) * producto.price, // Actualiza el precio total del producto en el carrito
                    }
                    : p
            );
            setCarrito(carritoActualizado);
        } else {
            setCarrito([...carrito, { ...producto, cantidad: 1, precioTotal: producto.price }]);
        }

        
        alert('¡Producto agregado al carrito!');
    };

    if (isLoading) return <Carga />;

    if (isError || productos === undefined) return <Error />;

    return (
        <div className="container">
            <FiltroProducto onFiltrar={handleFiltrar} />
            <h1 className="my-4">Lista de Productos Disponibles</h1>

            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {productos &&
                    productos.map((producto: Producto) => (
                        <div key={producto.id} className="col">
                            <div className="card h-100">
                                <Carousel>
                                    {producto.images.map((image, index) => (
                                        <Carousel.Item key={index}>
                                            <img src={image} className="d-block w-100" alt={`Imagen ${index + 1}`} style={cardImageStyle} />
                                        </Carousel.Item>
                                    ))}
                                </Carousel>
                                <div className="card-body">
                                    <h5 className="card-title">{producto.title}</h5>
                                    <p className="card-text">
                                        <b>Precio:</b> ${producto.price}
                                    </p>
                                    <button onClick={() => handleAgregarAlCarrito(producto)} className="btn btn-primary">
                                        Agregar al carrito
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>

            {filtradoCompleto && (
                <div className="my-4 d-flex justify-content-center">
                    <button onClick={handlePreviousPage} className="btn btn-secondary me-2" disabled={offset === 0}>
                        Página Anterior
                    </button>
                    <button onClick={handleNextPage} className="btn btn-primary" disabled={productos && productos.length < limit}>
                        Página Siguiente
                    </button>
                    <Link to="/" className="btn btn-warning" style={{ marginLeft: '10px' }}>
                        Volver a inicio
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Productos;
