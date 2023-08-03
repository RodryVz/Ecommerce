import { createContext, useContext, useState } from 'react';

type Producto = {
    precioTotal: number;
    title: string;
    price: number;
    id: number;
    titulo: string;
    precio: number;
    cantidad: number;
};

type CarritoContextType = {
    carrito: Producto[];
    setCarrito: (productos: Producto[]) => void;
};

const CarritoContext = createContext<CarritoContextType>({
    carrito: [],
    setCarrito: () => { },
});

export const useCarritoContext = () => useContext(CarritoContext);

type CarritoProviderProps = {
    children: React.ReactNode;
};

export const CarritoProvider = ({ children }: CarritoProviderProps) => {
    const [carrito, setCarrito] = useState<Producto[]>([]);

    return (
        <CarritoContext.Provider value={{ carrito, setCarrito }}>
            {children}
        </CarritoContext.Provider>
    );
};