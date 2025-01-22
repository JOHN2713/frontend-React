import React, { useState, useEffect } from 'react';

const Goals = () => {
  const [objective, setObjective] = useState('');
  const [weight, setWeight] = useState('');
  const [structure, setStructure] = useState('');
  const [daysPerWeek, setDaysPerWeek] = useState('');
  const [hoursPerDay, setHoursPerDay] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    // Obtener el peso y la estructura corporal del usuario desde el backend
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${apiUrl}/user-data`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`, // Token de autenticación
          },
        });

        if (response.ok) {
          const data = await response.json();
          setWeight(data.weight);
          setStructure(data.bodyStructure);
        } else {
          setErrorMessage('No se pudo cargar la información del usuario.');
        }
      } catch (error) {
        console.error('Error al obtener la información del usuario:', error);
        setErrorMessage('Ocurrió un error al cargar los datos del usuario.');
      }
    };

    fetchUserData();
  }, [apiUrl]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const goalData = {
      objective,
      weight,
      structure,
      daysPerWeek,
      hoursPerDay,
    };

    try {
      const response = await fetch(`${apiUrl}/goals`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: JSON.stringify(goalData),
      });

      if (response.ok) {
        setSuccessMessage('Tus metas se han registrado exitosamente.');
        setErrorMessage('');
      } else {
        setErrorMessage('Hubo un problema al registrar tus metas. Intenta de nuevo.');
      }
    } catch (error) {
      console.error('Error al registrar metas:', error);
      setErrorMessage('Ocurrió un error. Por favor, intenta más tarde.');
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background: 'linear-gradient(to bottom, #ffefba, #ffffff)', // Fondo con degradado
      }}
    >
      <div className="card p-4 shadow-lg" style={{ width: '500px', backgroundColor: '#ffffff' }}>
        <h1 className="text-center mb-4" style={{ color: '#343a40' }}>PAIT</h1>
        <h2 className="text-center mb-4" style={{ color: 'gray' }}>Metas</h2>
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
            <label htmlFor="objective" className="form-label">Objetivo</label>
            <select
              className="form-select"
              id="objective"
              value={objective}
              onChange={(e) => setObjective(e.target.value)}
              required
            >
              <option value="">Selecciona un objetivo</option>
              <option value="Ganar músculo">Ganar músculo</option>
              <option value="Perder peso">Perder peso</option>
              <option value="Calistenia">Calistenia</option>
              <option value="Powerlifting">Powerlifting</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="weight" className="form-label">Peso</label>
            <input
              type="text"
              className="form-control"
              id="weight"
              value={weight}
              readOnly
            />
          </div>
          <div className="mb-3">
            <label htmlFor="structure" className="form-label">Estructura Corporal</label>
            <input
              type="text"
              className="form-control"
              id="structure"
              value={structure}
              readOnly
            />
          </div>
          <div className="mb-3">
            <label htmlFor="daysPerWeek" className="form-label">¿Cuántos días a la semana puedes entrenar?</label>
            <input
              type="number"
              className="form-control"
              id="daysPerWeek"
              value={daysPerWeek}
              onChange={(e) => setDaysPerWeek(e.target.value)}
              min="1"
              max="7"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="hoursPerDay" className="form-label">¿Cuántas horas puedes entrenar por día?</label>
            <input
              type="number"
              className="form-control"
              id="hoursPerDay"
              value={hoursPerDay}
              onChange={(e) => setHoursPerDay(e.target.value)}
              min="1"
              max="24"
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100"
            style={{ backgroundColor: '#343a40', borderColor: '#343a40' }}
          >
            Guardar Metas
          </button>
        </form>
      </div>
    </div>
  );
};

export default Goals;
