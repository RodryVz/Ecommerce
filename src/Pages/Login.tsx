import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const usuariosRegistrados = [

    {
        correo: 'usuario1@example.com',
        contrasena: 'contrasena1',
        nombre: 'Usuario1',
    },
    {
        correo: 'usuario2@example.com',
        contrasena: 'contrasena2',
        nombre: 'Usuario2',
    },
];

const Login = () => {
    const [formData, setFormData] = useState({
        correo: '',
        contrasena: '',
    });

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const navigate = useNavigate();

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        try {
            if (!formData.correo || !formData.contrasena) {
                alert('Por favor, complete todos los campos.');
                return;
            }


            const usuarioValido = usuariosRegistrados.find(
                (user) =>
                    user.correo === formData.correo && user.contrasena === formData.contrasena
            );

            if (usuarioValido) {

                localStorage.setItem('userData', JSON.stringify(usuarioValido));

                alert('¡Inicio de sesión exitoso!');
                setFormData({
                    correo: '',
                    contrasena: '',
                });


                navigate('/');
            } else {
                alert('Credenciales inválidas. Por favor, verifica tu correo y contraseña.');
            }
        } catch (error) {
            alert('Ocurrió un error al enviar la solicitud de inicio de sesión.');
            console.error(error);
        }
    };

    const userDataString = localStorage.getItem('userData');
    const usuarioIniciadoSesion = userDataString ? JSON.parse(userDataString) : null;

    const handleCerrarSesion = () => {
        localStorage.removeItem('userData');
        navigate('/login');
    };

    if (usuarioIniciadoSesion) {
        return (
            <div className="container mt-4">
                <div className="alert alert-success">
                    <p>Bienvenido, {usuarioIniciadoSesion.nombre}.</p>
                    <button className="btn btn-primary" onClick={handleCerrarSesion}>
                        Cerrar Sesión
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-4" >
            <div className="row justify-content-center">
                <div className="col-lg-5 col-md-7">
                    <div className="card border">
                        <div className="card-header">
                            <h3 className="pt-3 font-weight-bold">Login</h3>
                        </div>
                        <div className="card-body p-3">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group py-2">
                                    <div className="input-group">
                                        <span className="input-group-text far fa-user p-2"></span>
                                        <input
                                            type="text"
                                            placeholder="Ingrese su Email"
                                            required
                                            name="correo"
                                            value={formData.correo}
                                            onChange={handleChange}
                                            className="form-control"
                                        />
                                    </div>
                                </div>
                                <div className="form-group py-1 pb-2">
                                    <div className="input-group">
                                        <span className="input-group-text fas fa-lock px-2"></span>
                                        <input
                                            type="password"
                                            placeholder="Ingrese su Contraseña"
                                            required
                                            name="contrasena"
                                            value={formData.contrasena}
                                            onChange={handleChange}
                                            className="form-control"
                                        />
                                        <button className="btn bg-white text-muted">
                                            <span className="far fa-eye-slash"></span>
                                        </button>
                                    </div>
                                </div>

                                <button type="submit" className="btn btn-primary btn-block mt-3">
                                    Login
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
