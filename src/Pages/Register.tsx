import { useState } from 'react';
import { useMutation } from 'react-query';

interface FormData {
    name: string;
    email: string;
    password: string;
    avatar: string;
}

const Register = () => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        password: '',
        avatar: 'https://api.lorem.space/image/face?w=640&h=480&r=867',
    });

    const [successMessage, setSuccessMessage] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
    };

    const registerUserMutation = useMutation(
        (userData: FormData) =>
            fetch('https://api.escuelajs.co/api/v1/users/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            }).then((response) => response.json()),
        {
            onSuccess: (data) => {
                setSuccessMessage(`Usuario registrado correctamente. ID: ${data.id}`);
                setErrorMessage('');
            },
            onError: (error) => {
                setErrorMessage('Ocurrió un error al registrar el usuario. Por favor, inténtalo nuevamente.');
                setSuccessMessage('');
            },
        }
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        registerUserMutation.mutate(formData);
    };

    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-lg-5 col-md-7">
                    <div className="card border">
                        <div className="card-header">
                            <h3 className="pt-3 font-weight-bold">Registro</h3>
                        </div>
                        <div className="card-body p-3">
                            {successMessage && <p className="text-success">{successMessage}</p>}
                            {errorMessage && <p className="text-danger">{errorMessage}</p>}
                            <form onSubmit={handleSubmit}>
                                <div className="form-group py-2">
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            placeholder="Ingresa tu nombre"
                                            required
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="form-control"
                                        />
                                    </div>
                                </div>
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
                                    Registrarse
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
