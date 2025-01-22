import React, { useState } from 'react';

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const apiUrl = process.env.REACT_APP_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar que las contraseñas nuevas coincidan
    if (newPassword !== confirmPassword) {
      setErrorMessage('La nueva contraseña y la confirmación no coinciden.');
      return;
    }

    const passwordData = {
      currentPassword,
      newPassword,
    };

    try {
      const response = await fetch(`${apiUrl}/change-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`, // Token de autenticación
        },
        body: JSON.stringify(passwordData),
      });

      if (response.ok) {
        setSuccessMessage('La contraseña se ha cambiado exitosamente.');
        setErrorMessage('');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        const error = await response.json();
        setErrorMessage(error.message || 'Error al cambiar la contraseña.');
      }
    } catch (error) {
      console.error('Error al cambiar la contraseña:', error);
      setErrorMessage('Ocurrió un error. Por favor, intenta más tarde.');
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background: 'linear-gradient(to bottom, #f8f9fa, #343a40)',
      }}
    >
      <div className="card p-4 shadow-lg" style={{ width: '400px', backgroundColor: '#ffffff' }}>
        <h1 className="text-center mb-4" style={{ color: '#343a40' }}>PAIT</h1>
        <h2 className="text-center mb-4" style={{ color: 'gray' }}>Cambiar Contraseña</h2>
        {errorMessage && (
          <div className="alert alert-danger" role="alert">
            {errorMessage}
          </div>
        )}
        {successMessage && (
          <div className="alert alert-success" role="alert">
            {successMessage}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="currentPassword" className="form-label">Contraseña Actual</label>
            <input
              type="password"
              className="form-control"
              id="currentPassword"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="newPassword" className="form-label">Nueva Contraseña</label>
            <input
              type="password"
              className="form-control"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">Confirmar Nueva Contraseña</label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100"
            style={{ backgroundColor: '#343a40', borderColor: '#343a40' }}
          >
            Cambiar Contraseña
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
