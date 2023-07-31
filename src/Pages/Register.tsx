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

const Register = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        correo: '',
        contrasena: '',
    });

    const handleChange = (e: { target: { name: string; value: any; }; }) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const navigate = useNavigate();

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        try {
            if (!formData.nombre || !formData.correo || !formData.contrasena) {
                alert('Por favor, complete todos los campos.');
                return;
            }

            const correoRegistrado = usuariosRegistrados.some(
                (user) => user.correo === formData.correo
            );

            if (correoRegistrado) {
                alert('Este correo electrónico ya está registrado. Por favor, usa otro.');
                return;
            }


            const nuevoUsuario = {
                nombre: formData.nombre,
                correo: formData.correo,
                contrasena: formData.contrasena,
            };


            localStorage.setItem('userData', JSON.stringify(nuevoUsuario));

            alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
            setFormData({
                nombre: '',
                correo: '',
                contrasena: '',
            });


            navigate('/');
        } catch (error) {
            alert('Ocurrió un error al enviar la solicitud de registro.');
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
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-lg-5 col-md-7">
                    <div className="card border">
                        <div className="card-header">
                            <h3 className="pt-3 font-weight-bold">Registro</h3>
                        </div>
                        <div className="card-body p-3">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group py-2">
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            placeholder="Ingresa tu nombre"
                                            required
                                            name="nombre"
                                            value={formData.nombre}
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
                                            name="correo"
                                            value={formData.correo}
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
                                            name="contrasena"
                                            value={formData.contrasena}
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
