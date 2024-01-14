import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

export default function EditUser() {
    let navigate = useNavigate();
    const { id } = useParams();

    const [user, setUser] = useState({
        cedula: "",
        nombre: "",
        foto: null,
        fechaIngreso: "",
        cargo: null,
    });

    const [cargos, setCargos] = useState([]);

    useEffect(() => {
        loadUser();
        loadCargos();
    }, []);

    const loadUser = async () => {
        try {
            const result = await axios.get(`http://localhost:8080/user/${id}`);
            setUser(result.data);
        } catch (error) {
            console.error("Error loading user:", error);
        }
    };

    const loadCargos = async () => {
        try {
            const result = await axios.get("http://localhost:8080/cargos");
            setCargos(result.data);
        } catch (error) {
            console.error("Error loading cargos:", error);
        }
    };

    const onChange = (e) => {
        const { name, value, type } = e.target;

        setUser((prevUser) => ({
            ...prevUser,
            [name]: type === 'file' ? e.target.files[0] : value,
            foto: type === 'file' ? e.target.files[0] : prevUser.foto, // Keep previous foto value if not a file input
            cargo: name === 'cargo' ? cargos.find(c => c.id === parseInt(value, 10)) : prevUser.cargo,
        }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("userDTO", JSON.stringify(user));
        formData.append("foto", user.foto);

        try {
            await axios.put(`http://localhost:8080/user/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            navigate(`/`);
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">
                        Edit User
                    </h2>
                    <form onSubmit={(e) => onSubmit(e)} encType="multipart/form-data">
                        <div className="mb-3">
                            <label htmlFor="cedula" className='form-label'>
                                Cedula
                            </label>
                            <input type="text" name="cedula" className='form-control' value={user.cedula} onChange={(e) => onChange(e)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="nombre" className='form-label'>
                                Nombre
                            </label>
                            <input type="text" name="nombre" className='form-control' value={user.nombre} onChange={(e) => onChange(e)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="foto" className='form-label'>
                                Foto
                            </label>
                            <input type="file" name="foto" className='form-control' onChange={(e) => onChange(e)} />
                            {user.foto ? <img src={user.foto} alt="User" className="mt-2" style={{ maxWidth: '100px' }} /> : null}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="fechaIngreso" className='form-label'>
                                Fecha Ingreso
                            </label>
                            <input type="text" name="fechaIngreso" className='form-control' value={user.fechaIngreso} onChange={(e) => onChange(e)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="cargo" className='form-label'>
                                Cargo
                            </label>
                            <select name="cargo" className='form-control' value={user.cargo ? user.cargo.id : ''} onChange={(e) => onChange(e)}>
                                <option value="" disabled>Selecciona Cargo</option>
                                {cargos.map(cargoOption => (
                                    <option key={cargoOption.id} value={cargoOption.id}>{cargoOption.nombre}</option>
                                ))}
                            </select>
                        </div>
                        <button type='submit' className='btn btn-outline-info'>
                            Save Changes
                        </button>
                        <Link to={`/`} className='btn btn-outline-danger mx-2'>
                            Cancel
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
}
