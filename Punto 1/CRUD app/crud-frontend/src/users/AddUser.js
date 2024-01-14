import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function AddUser() {
    let navigate = useNavigate();

    const [user, setUser] = useState({
        cedula: "",
        nombre: "",
        foto: null,
        fechaIngreso: "",
        cargo: null,  // Inicializa el campo 'cargo' como un objeto, no como una cadena vacía
    });

    const { cedula, nombre, foto, fechaIngreso, cargo } = user;
    const [cargos, setCargos] = useState([]);

    useEffect(() => {
        loadCargos();
    }, []);

    const loadCargos = async () => {
        try {
            const result = await axios.get("http://localhost:8080/cargos");
            setCargos(result.data);
        } catch (error) {
            console.error("Error loading cargos:", error);
        }
    }

    const onChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.name === 'cargo' ? JSON.parse(e.target.value) : e.target.value,
        });
    }

    const onFileChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.files[0] });
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("userDTO", JSON.stringify({ cedula, nombre, fechaIngreso, cargo }));
        formData.append("foto", foto);

        try {
            await axios.post("http://localhost:8080/user", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            navigate("/");
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    return (
        <div className='container'>
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">
                        Registro Empleados
                    </h2>
                    <form onSubmit={(e) => onSubmit(e)} encType="multipart/form-data">
                        <div className="mb-3">
                            <label htmlFor="cedula" className='form-label'>
                                Cedula
                            </label>
                            <input type="text" name="cedula" className='form-control' value={cedula} onChange={(e) => onChange(e)} placeholder='Ingresa la cedula...' />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="nombre" className='form-label'>
                                Nombre
                            </label>
                            <input type="text" name="nombre" className='form-control' value={nombre} onChange={(e) => onChange(e)} placeholder='Ingresa tu nombre...' />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="foto" className='form-label'>
                                Foto
                            </label>
                            <input type="file" name="foto" className='form-control' onChange={(e) => onFileChange(e)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="fechaIngreso" className='form-label'>
                                Fecha Ingreso
                            </label>
                            <input type="text" name="fechaIngreso" className='form-control' value={fechaIngreso} onChange={(e) => onChange(e)} placeholder='Ingresa la fecha de ingreso...' />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="cargo" className='form-label'>
                                Cargo
                            </label>
                            <select name="cargo" className='form-control' value={cargo ? JSON.stringify(cargo) : ''} onChange={(e) => onChange(e)}>
                                <option value="" disabled>Selecciona Cargo</option>
                                {cargos.map(cargo => (
                                    <option key={cargo.id} value={JSON.stringify(cargo)}>{cargo.nombre}</option>
                                ))}
                            </select>
                        </div>
                        <button type='submit' className='btn btn-outline-info'>
                            Submit
                        </button>
                        <Link to="/" className='btn btn-outline-danger mx-2'>
                            Cancel
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    )
}
