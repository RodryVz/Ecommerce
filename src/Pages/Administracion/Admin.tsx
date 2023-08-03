import { useState, useEffect } from 'react';
import { useQueryClient, useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import Carga from '../../Components/Carga';

const Admin = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const queryClient = useQueryClient();

    const { data, isLoading, isError } = useQuery('userProfile', async () => {
        const userToken = localStorage.getItem('userToken');

        if (userToken) {
            try {
                const response = await fetch('https://api.escuelajs.co/api/v1/auth/profile', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${userToken}`,
                    },
                });

                if (response.status === 401) {
                    setIsAdmin(false);
                    return null;
                }

                return response.json();
            } catch (error) {
                setIsAdmin(false);
                throw new Error('Error al obtener el perfil del usuario');
            }
        } else {
            setIsAdmin(false);
            throw new Error('No se encontró el token de usuario');
        }
    });

    useEffect(() => {
        if (data && data.role === 'admin') {
            setIsAdmin(true);
        } else {
            setIsAdmin(false);
        }
    }, [data]);

    const handleLogout = () => {
        localStorage.removeItem('userToken');
        queryClient.invalidateQueries('userProfile');
    };

    if (isLoading) {
        return <Carga />;
    }

    if (isError || !isAdmin) {
        return <p className="alert alert-danger text-center">No tienes acceso como administrador.</p>;
    }

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h2 className="text-center">Bienvenido, {data.name}.</h2>
                    <p className="text-center">Rol: {data.role}</p>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title">Gestión de Productos</h3>
                            <Link to="/crearProducto">
                                <button className="btn btn-primary btn-block my-4">Crear Producto</button>
                            </Link>
                            <Link to="/edicionProducto">
                                <button className="btn btn-primary btn-block my-4">Editar Productos</button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title">Gestión de Categorías</h3>
                            <Link to="/crearCategoria">
                                <button className="btn btn-success btn-block my-4">Crear Categoría</button>
                            </Link>
                            <Link to="/edicionCategoria">
                                <button className="btn btn-success btn-block my-4">Editar Categorías</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col-md-6 offset-md-3 text-center">
                    <button className="btn btn-danger" onClick={handleLogout}>Cerrar Sesión</button>
                </div>
            </div>
        </div>
    );
};

export default Admin;
