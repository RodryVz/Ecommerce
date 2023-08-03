import { useCarritoContext } from "./CarritoContext";
import { Link } from "react-router-dom";

type Producto = {
    precioTotal: number;
    title: string;
    price: number;
    id: number;
    titulo: string;
    precio: number;
    cantidad: number;
};

const DetalleCarrito = () => {
    const { carrito, setCarrito } = useCarritoContext();

    const precioTotalCarrito = carrito.reduce((total, producto) => total + producto.precioTotal, 0);

    const finalizarCompra = () => {
        setCarrito([]); 
    };

    const aumentarCantidad = (productoId: number) => {
        setCarrito(prevCarrito => {
            return prevCarrito.map((producto: { id: number; cantidad: number; price: number; }) => {
                if (producto.id === productoId) {
                    return {
                        ...producto,
                        cantidad: producto.cantidad + 1,
                        precioTotal: producto.price * (producto.cantidad + 1),
                    };
                } else {
                    return producto;
                }
            });
        });
    };

    const disminuirCantidad = (productoId: number) => {
        setCarrito(prevCarrito => {
            return prevCarrito.map((producto: { id: number; cantidad: number; price: number; }) => {
                if (producto.id === productoId && producto.cantidad > 1) {
                    return {
                        ...producto,
                        cantidad: producto.cantidad - 1,
                        precioTotal: producto.price * (producto.cantidad - 1),
                    };
                } else {
                    return producto;
                }
            });
        });
    };

    return (
        <div className="card border-primary mt-4">
            <div className="card-header bg-primary text-white">
                <h2 className="mb-0">Detalle del Carrito</h2>
            </div>
            <div className="card-body">
                {carrito.map((producto: Producto) => (
                    <div key={producto.id} className="mb-3 border-bottom">
                        <h3 className="mb-0">{producto.title}</h3>
                        <p className="mb-1">Precio: ${producto.price}</p>
                        <div className="d-flex align-items-center mb-1">
                            <button className="btn btn-secondary me-3" onClick={() => disminuirCantidad(producto.id)}>
                                -
                            </button>
                            <p className="mb-0">Cantidad: {producto.cantidad}</p>
                            <button className="btn btn-secondary ms-3" onClick={() => aumentarCantidad(producto.id)}>
                                +
                            </button>
                        </div>
                        <p className="mb-1">Precio SubTotal: ${producto.precioTotal}</p>
                    </div>
                ))}
                {carrito.length === 0 && <p className="text-muted mb-0">No hay productos en el carrito.</p>}
                {carrito.length > 0 && (
                    <div className="mt-3">
                        <hr />
                        <p className="mb-0">Total del Carrito: ${precioTotalCarrito}</p>
                    </div>
                )}

                {carrito.length > 0 && (
                    <Link to="/finalizarCompra" onClick={finalizarCompra} className="btn btn-success mt-3 ms-3">
                        Finalizar Compra
                    </Link>
                )}
            </div>
        </div>
    );
};

export default DetalleCarrito;