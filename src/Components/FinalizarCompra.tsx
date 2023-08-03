import { Link } from "react-router-dom";

const FinaizarCompra = () => {
    return (
        <div className="container mt-5">
            <div className="alert alert-success" role="alert">
                <h4 className="alert-heading">¡Compra realizada con éxito!</h4>
                <p>Su compra se ha realizado correctamente. ¡Gracias por su compra!</p>
                <hr />
                <p className="mb-0">¿Desea realizar otra compra? Vuelva a la página de inicio.</p>
            </div>
            <div className="text-center">
                <Link to="/" className="btn btn-primary mt-3">Volver a Inicio</Link>
            </div>
        </div>
    );
};

export default FinaizarCompra;
