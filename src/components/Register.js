import React, { useState, useEffect } from 'react';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bodyStructure, setBodyStructure] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [users, setUsers] = useState([]); // Lista de usuarios
  const apiUrl = process.env.REACT_APP_API_URL;

  // Obtener los usuarios registrados al cargar el componente
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${apiUrl}/users`);
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else {
        console.error('Error al obtener los usuarios');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newUser = {
      name,
      email,
      password,
      weight,
      height,
      bodyStructure,
    };

    try {
      const response = await fetch(`${apiUrl}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        console.log('Usuario registrado exitosamente');
        setErrorMessage('');
        fetchUsers(); // Actualiza la lista de usuarios
      } else {
        setErrorMessage('Hubo un problema al registrar el usuario. Intenta de nuevo.');
      }
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
      setErrorMessage('Ocurrió un error. Por favor, intenta más tarde.');
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${apiUrl}/users/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        console.log('Usuario eliminado');
        fetchUsers(); // Actualiza la lista de usuarios
      } else {
        console.error('Error al eliminar el usuario');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleEdit = (user) => {
    setName(user.name);
    setEmail(user.email);
    setPassword(user.password);
    setWeight(user.weight);
    setHeight(user.height);
    setBodyStructure(user.bodyStructure);
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100 flex-column"
      style={{
        background: 'linear-gradient(to bottom, lightblue, darkblue)',
      }}
    >
      <div className="card p-4 shadow-lg mb-4" style={{ width: '500px', backgroundColor: '#ffffff' }}>
        <h1 className="text-center mb-4" style={{ color: 'darkblue' }}>PAIT</h1>
        <h2 className="text-center mb-4" style={{ color: 'gray' }}>Registro de Usuario</h2>
        {errorMessage && (
          <div className="alert alert-danger" role="alert">
            {errorMessage}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Nombre</label>
            <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Correo Electrónico</label>
            <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label htmlFor="weight" className="form-label">Peso (kg)</label>
            <input type="number" className="form-control" id="weight" value={weight} onChange={(e) => setWeight(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label htmlFor="height" className="form-label">Estatura (cm)</label>
            <input type="number" className="form-control" id="height" value={height} onChange={(e) => setHeight(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label htmlFor="bodyStructure" className="form-label">Estructura Corporal</label>
            <select className="form-select" id="bodyStructure" value={bodyStructure} onChange={(e) => setBodyStructure(e.target.value)} required>
              <option value="">Selecciona una opción</option>
              <option value="Ectomorfo">Ectomorfo</option>
              <option value="Mesomorfo">Mesomorfo</option>
              <option value="Endomorfo">Endomorfo</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary w-100" style={{ backgroundColor: 'darkblue', borderColor: 'darkblue' }}>Registrar</button>
        </form>
      </div>
      <div className="container">
        <h3 className="text-center" style={{ color: 'white' }}>Usuarios Registrados</h3>
        <table className="table table-striped table-dark">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Peso</th>
              <th>Estatura</th>
              <th>Estructura</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.weight}</td>
                <td>{user.height}</td>
                <td>{user.bodyStructure}</td>
                <td>
                  <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(user)}>Editar</button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(user.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Register;
