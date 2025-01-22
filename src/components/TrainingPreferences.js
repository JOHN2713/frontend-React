import React, { useState } from 'react';

const TrainingPreferences = () => {
  const [daysPerWeek, setDaysPerWeek] = useState('');
  const [hoursPerDay, setHoursPerDay] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const apiUrl = process.env.REACT_APP_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar que la disponibilidad inicial sea antes de la final
    if (startTime >= endTime) {
      setErrorMessage('La disponibilidad inicial debe ser antes de la disponibilidad final.');
      return;
    }

    const preferencesData = {
      daysPerWeek,
      hoursPerDay,
      startTime,
      endTime,
    };

    try {
      const response = await fetch(`${apiUrl}/training-preferences`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: JSON.stringify(preferencesData),
      });

      if (response.ok) {
        setSuccessMessage('Preferencias de entrenamiento guardadas correctamente.');
        setErrorMessage('');
        setDaysPerWeek('');
        setHoursPerDay('');
        setStartTime('');
        setEndTime('');
      } else {
        const error = await response.json();
        setErrorMessage(error.message || 'Error al guardar las preferencias.');
      }
    } catch (error) {
      console.error('Error al guardar preferencias:', error);
      setErrorMessage('Ocurrió un error. Por favor, intenta más tarde.');
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background: 'linear-gradient(to bottom, #f5f7fa, #c3cfe2)',
      }}
    >
      <div className="card p-4 shadow-lg" style={{ width: '500px', backgroundColor: '#ffffff' }}>
        <h1 className="text-center mb-4" style={{ color: '#343a40' }}>PAIT</h1>
        <h2 className="text-center mb-4" style={{ color: 'gray' }}>Preferencias de Entrenamiento</h2>
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
            <label htmlFor="daysPerWeek" className="form-label">¿Cuántos días por semana puedes entrenar?</label>
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
            <label htmlFor="hoursPerDay" className="form-label">¿Cuántas horas por día puedes entrenar?</label>
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
          <div className="mb-3">
            <label htmlFor="startTime" className="form-label">Disponibilidad Inicial</label>
            <input
              type="time"
              className="form-control"
              id="startTime"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="endTime" className="form-label">Disponibilidad Final</label>
            <input
              type="time"
              className="form-control"
              id="endTime"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100"
            style={{ backgroundColor: '#343a40', borderColor: '#343a40' }}
          >
            Guardar Preferencias
          </button>
        </form>
      </div>
    </div>
  );
};

export default TrainingPreferences;
