import { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from 'react-query';

interface FormData {
    email: string;
    password: string;
}

const Login = () => {
    const [formData, setFormData] = useState<FormData>({
        email: '',
        password: '',
    });

    const [successMessage, setSuccessMessage] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');

    const queryClient = useQueryClient();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
    };

    const loginMutation = useMutation(
        async () => {
            try {
                const response = await fetch('https://api.escuelajs.co/api/v1/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                const data = await response.json();

                if (response.ok) {
                    setSuccessMessage('Inicio de sesión exitoso.');
                    setErrorMessage('');
                    localStorage.setItem('userToken', data.access_token);
                } else {
                    setErrorMessage('Credenciales inválidas. Por favor, verifica tu email y contraseña.');
                    setSuccessMessage('');
                    localStorage.removeItem('userToken');
                }
            } catch (error) {
                setErrorMessage('Ocurrió un error al iniciar sesión. Por favor, inténtalo nuevamente.');
                setSuccessMessage('');
                localStorage.removeItem('userToken');
            }
        },
        {
            onSuccess: () => {
                setFormData({
                    email: '',
                    password: '',
                });
                queryClient.invalidateQueries('userProfile');
            },
        }
    );

    const handleLogout = () => {
        localStorage.removeItem('userToken');
        setSuccessMessage('');
    };

    useEffect(() => {
        // Verificar si hay un token almacenado en el Local Storage al cargar el componente
        const userToken = localStorage.getItem('userToken');
        if (userToken) {
            setSuccessMessage('Sesión iniciada.');
        }
    }, []);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        loginMutation.mutate();
    };

    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-lg-5 col-md-7">
                    <div className="card border">
                        <div className="card-header">
                            <h3 className="pt-3 font-weight-bold">Iniciar Sesión</h3>
                        </div>
                        <div className="card-body p-3">
                            {errorMessage && <p className="text-danger">{errorMessage}</p>}
                            {successMessage && <p className="text-success">{successMessage}</p>}
                            {successMessage ? (
                                <button onClick={handleLogout} className="btn btn-danger btn-block mt-3">
                                    Cerrar Sesión
                                </button>
                            ) : (
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group py-2">
                                        <div className="input-group">
                                            <input
                                                type="email"
                                                placeholder="Ingresa tu correo electrónico"
                                                required
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="form-control"
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group py-2">
                                        <div className="input-group">
                                            <input
                                                type="password"
                                                placeholder="Ingresa tu contraseña"
                                                required
                                                name="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                className="form-control"
                                            />
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn-primary btn-block mt-3">
                                        Iniciar Sesión
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
