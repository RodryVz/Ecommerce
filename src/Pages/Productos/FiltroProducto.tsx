import React, { useState } from 'react';
import { useQuery } from 'react-query'; // Importamos useQuery desde react-query
import Carga from '../../Components/Carga';
import Error from '../../Components/Error';

interface Categoria {
    id: number;
    name: string;
}

interface FiltroProductoProps {
    onFiltrar: (titulo: string,
                categoriaId: number, 
                precio: number) => void;
}

const FiltroProducto: React.FC<FiltroProductoProps> = ({ onFiltrar }) => {
    const [titulo, setTitulo] = useState('');
    const [categoriaId, setCategoriaId] = useState<number>(0);
    const [precio, setPrecio] = useState<number | null>(null);

    // Usamos useQuery para realizar el fetching de las categorías
    const { data: categorias, isLoading, isError } = useQuery<Categoria[]>('categorias', fetchCategorias);

    // Función para obtener las categorías desde el servidor
    async function fetchCategorias(): Promise<Categoria[]> {
        const response = await fetch('https://api.escuelajs.co/api/v1/categories');
        if (!response.ok) {
            <Error/>;
        }
        return response.json();
    }

    const handleChangeTitulo = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitulo(event.target.value);
    };

    const handleChangeCategoria = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCategoriaId(Number(event.target.value));
    };

    const handleChangePrecio = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPrecio(Number(event.target.value));
    };

    const handleFiltrar = () => {
        onFiltrar(titulo, categoriaId, precio || 0);
    };

    return (
        <div className="my-4">
            <h4>Filtrar Productos</h4>
            {isLoading ? (
                <Carga/>
            ) : isError ? (
                <Error/>
            ) : (
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Buscar por título..."
                        value={titulo}
                        onChange={handleChangeTitulo}
                    />
                    <select className="form-select" onChange={handleChangeCategoria} value={categoriaId}>
                        <option value={0}>Todas las categorías</option>
                        {categorias?.map((categoria) => (
                            <option key={categoria.id} value={categoria.id}>
                                {categoria.name}
                            </option>
                        ))}
                    </select>
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Ingrese un precio"
                        value={precio === null ? '' : precio}
                        onChange={handleChangePrecio}
                    />
                    <button className="btn btn-primary" onClick={handleFiltrar}>
                        Filtrar
                    </button>
                </div>
            )}
        </div>
    );
};

export default FiltroProducto;
