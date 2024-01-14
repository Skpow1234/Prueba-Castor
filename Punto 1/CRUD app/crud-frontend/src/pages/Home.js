import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

export default function Home() {

    const [users, setUsers] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        try {
            const result = await axios.get("http://localhost:8080/users");
            console.log(result.data); // Agrega esta línea para imprimir los datos
            setUsers(result.data);
        } catch (error) {
            console.error("Error loading users:", error);
        }
    }

    const deleteUser = async (id) => {
        await axios.delete(`http://localhost:8080/user/${id}`);
        loadUsers();
    }

    return (
        <div className='container'>
            <div className="py-4">
                <table className="table border shadow">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Cedula</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Foto</th>
                            <th scope="col">Fecha Ingreso</th>
                            <th scope="col">Cargo</th>
                            <th scope="col">Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user.id}>
                                <th scope='row'>{index + 1}</th>
                                <td>{user.cedula}</td>
                                <td>{user.nombre || "Nombre no disponible"}</td>
                                <td>
    {user.foto && (
        <img
            src={`data:image/png;base64,${user.foto}`}
            alt={`Foto de ${user.nombre || "Usuario"}`}
            style={{ maxWidth: '100px', maxHeight: '100px' }}
        />
    )}
</td>

                                <td>{user.fechaIngreso}</td>
                                <td>{user.cargo && user.cargo.nombre}</td>
                                <td>
                                    <Link to={`/viewuser/${user.id}`} className='btn btn-info mx-2'>Ver</Link>
                                    <Link to={`/edituser/${user.id}`} className='btn btn-outline-info'>Editar</Link>
                                    <button className='btn btn-danger mx-2' onClick={() => deleteUser(user.id)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
