import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const apiUrl = process.env.REACT_APP_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${apiUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Login exitoso:', data);
        setErrorMessage('');
      } else {
        setErrorMessage('Credenciales incorrectas. Por favor, intenta de nuevo.');
      }
    } catch (error) {
      console.error('Error en el login:', error);
      setErrorMessage('Ocurrió un error. Por favor, intenta más tarde.');
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background: 'linear-gradient(to bottom, gray, darkred)', // Fondo con degradado
      }}
    >
      <div className="card p-4 shadow-lg" style={{ width: '400px', backgroundColor: '#ffffff' }}>
        <h1 className="text-center mb-4" style={{ color: 'darkred' }}>
          PAIT
        </h1>
        <h2 className="text-center mb-4" style={{ color: 'gray' }}>
          Login
        </h2>
        {errorMessage && (
          <div className="alert alert-danger" role="alert">
            {errorMessage}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
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
            <label htmlFor="password" className="form-label">
              Contraseña
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100"
            style={{ backgroundColor: 'darkred', borderColor: 'darkred' }}
          >
            Ingresar
          </button>
        </form>
        <div className="text-center mt-3">
          <a href="/forgot-password" style={{ color: 'darkred', textDecoration: 'none' }}>
            He olvidado mi contraseña
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
