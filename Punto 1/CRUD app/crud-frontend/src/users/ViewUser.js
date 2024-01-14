import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function ViewUser() {

    const [user, setUser] = useState({
        cedula: "",
        nombre: "",
        foto: null,
        fechaIngreso: "",
        cargo: null,
    });

    const { id } = useParams();

    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        try {
            const result = await axios.get(`http://localhost:8080/user/${id}`);
            setUser(result.data);
        } catch (error) {
            console.error("Error loading user:", error);
        }
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">
                        User Details
                    </h2>
                    <div className="card">
                        <div className="card-header">
                            Details of user id: {id}
                            <ul className='list-group-flush'>
                                <li className="list-group-item">
                                    <b>Cedula:</b> {user.cedula}
                                </li>
                                <li className="list-group-item">
                                    <b>Nombre:</b> {user.nombre}
                                </li>
                                <li className="list-group-item">
                                    <b>Foto:</b> {user.foto ? <img src={user.foto} alt="User" /> : "N/A"}
                                </li>
                                <li className="list-group-item">
                                    <b>Fecha de Ingreso:</b> {user.fechaIngreso}
                                </li>
                                <li className="list-group-item">
                                    <b>Cargo:</b> {user.cargo ? user.cargo.nombre : "N/A"}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <Link className='btn btn-info my-2' to={"/"}> Back </Link>
                </div>
            </div>
        </div>
    )
}
