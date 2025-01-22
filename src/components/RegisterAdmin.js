import React, { useState, useEffect } from 'react';

const RegisterAdmin = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('admin'); // Por defecto, el rol es administrador
  const [errorMessage, setErrorMessage] = useState('');
  const [admins, setAdmins] = useState([]); // Lista de administradores
  const apiUrl = process.env.REACT_APP_API_URL;

  // Obtener los administradores al cargar el componente
  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const response = await fetch(`${apiUrl}/admins`);
      if (response.ok) {
        const data = await response.json();
        setAdmins(data);
      } else {
        console.error('Error al obtener los administradores');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newAdmin = {
      name,
      email,
      password,
      role,
    };

    try {
      const response = await fetch(`${apiUrl}/register-admin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newAdmin),
      });

      if (response.ok) {
        console.log('Administrador registrado exitosamente');
        setErrorMessage('');
        fetchAdmins(); // Actualiza la lista de administradores
      } else {
        setErrorMessage('Hubo un problema al registrar el administrador. Intenta de nuevo.');
      }
    } catch (error) {
      console.error('Error al registrar el administrador:', error);
      setErrorMessage('Ocurrió un error. Por favor, intenta más tarde.');
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${apiUrl}/admins/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        console.log('Administrador eliminado');
        fetchAdmins(); // Actualiza la lista de administradores
      } else {
        console.error('Error al eliminar el administrador');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleEdit = (admin) => {
    setName(admin.name);
    setEmail(admin.email);
    setPassword(''); // Limpia el campo de contraseña
    setRole(admin.role);
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100 flex-column"
      style={{
        background: 'linear-gradient(to bottom, lightgray, black)',
      }}
    >
      <div className="card p-4 shadow-lg mb-4" style={{ width: '500px', backgroundColor: '#ffffff' }}>
        <h1 className="text-center mb-4" style={{ color: 'black' }}>PAIT</h1>
        <h2 className="text-center mb-4" style={{ color: 'gray' }}>Registro de Administrador</h2>
        {errorMessage && (
          <div className="alert alert-danger" role="alert">
            {errorMessage}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Nombre</label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Correo Electrónico</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="role" className="form-label">Rol</label>
            <select
              className="form-select"
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="admin">Administrador</option>
              <option value="user">Usuario</option>
            </select>
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100"
            style={{ backgroundColor: 'black', borderColor: 'black' }}
          >
            Registrar Administrador
          </button>
        </form>
      </div>
      <div className="container">
        <h3 className="text-center" style={{ color: 'white' }}>Administradores Registrados</h3>
        <table className="table table-striped table-dark">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => (
              <tr key={admin.id}>
                <td>{admin.name}</td>
                <td>{admin.email}</td>
                <td>{admin.role}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleEdit(admin)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(admin.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RegisterAdmin;
