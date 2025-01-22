import React, { useState } from 'react';

const Routines = () => {
  const [trainingFocus, setTrainingFocus] = useState(''); // Tren superior, inferior, cardio
  const [specificRoutine, setSpecificRoutine] = useState(''); // Rutina específica
  const [generatedRoutine, setGeneratedRoutine] = useState(''); // Rutina generada
  const [editMode, setEditMode] = useState(false); // Modo de edición
  const [selectedRoutine, setSelectedRoutine] = useState(''); // Rutina seleccionada para edición
  const [errorMessage, setErrorMessage] = useState('');
  const apiUrl = process.env.REACT_APP_API_URL;

  const handleGenerateRoutine = async () => {
    if (!trainingFocus) {
      setErrorMessage('Por favor selecciona un enfoque de entrenamiento.');
      return;
    }

    const routineData = {
      trainingFocus,
      specificRoutine,
    };

    try {
      const response = await fetch(`${apiUrl}/generate-routine`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: JSON.stringify(routineData),
      });

      if (response.ok) {
        const data = await response.json();
        setGeneratedRoutine(data.routine);
        setErrorMessage('');
      } else {
        setErrorMessage('Hubo un problema al generar la rutina. Intenta de nuevo.');
      }
    } catch (error) {
      console.error('Error al generar la rutina:', error);
      setErrorMessage('Ocurrió un error. Por favor, intenta más tarde.');
    }
  };

  const handleEditRoutine = () => {
    setEditMode(true);
    setSelectedRoutine(generatedRoutine);
  };

  const handleSaveEditedRoutine = async () => {
    // Guardar la rutina editada
    setGeneratedRoutine(selectedRoutine);
    setEditMode(false);
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100 flex-column"
      style={{
        background: 'linear-gradient(to bottom, #d3cce3, #e9e4f0)',
      }}
    >
      <div className="card p-4 shadow-lg" style={{ width: '500px', backgroundColor: '#ffffff' }}>
        <h1 className="text-center mb-4" style={{ color: '#343a40' }}>PAIT</h1>
        <h2 className="text-center mb-4" style={{ color: 'gray' }}>Rutinas</h2>
        {errorMessage && (
          <div className="alert alert-danger" role="alert">
            {errorMessage}
          </div>
        )}
        <div className="mb-3">
          <label htmlFor="trainingFocus" className="form-label">Enfoque de entrenamiento</label>
          <select
            className="form-select"
            id="trainingFocus"
            value={trainingFocus}
            onChange={(e) => setTrainingFocus(e.target.value)}
            required
          >
            <option value="">Selecciona un enfoque</option>
            <option value="Tren Superior">Tren Superior</option>
            <option value="Tren Inferior">Tren Inferior</option>
            <option value="Cardio">Cardio</option>
          </select>
        </div>
        {trainingFocus && (
          <div className="mb-3">
            <label htmlFor="specificRoutine" className="form-label">Rutina específica (opcional)</label>
            <select
              className="form-select"
              id="specificRoutine"
              value={specificRoutine}
              onChange={(e) => setSpecificRoutine(e.target.value)}
            >
              <option value="">Selecciona una rutina específica</option>
              {trainingFocus === 'Tren Superior' && (
                <>
                  <option value="Brazos">Brazos</option>
                  <option value="Bíceps">Bíceps</option>
                  <option value="Tríceps">Tríceps</option>
                  <option value="Pecho">Pecho</option>
                  <option value="Espalda">Espalda</option>
                </>
              )}
              {trainingFocus === 'Tren Inferior' && (
                <option value="Piernas">Piernas</option>
              )}
            </select>
          </div>
        )}
        <button
          className="btn btn-primary w-100 mb-3"
          onClick={handleGenerateRoutine}
          style={{ backgroundColor: '#343a40', borderColor: '#343a40' }}
        >
          Generar Rutina
        </button>
        {generatedRoutine && !editMode && (
          <div className="card mt-3 p-3" style={{ backgroundColor: '#f9f9f9' }}>
            <h4>Rutina Generada:</h4>
            <ul>
              {generatedRoutine.split('\n').map((line, index) => (
                <li key={index}>{line}</li>
              ))}
            </ul>
            <button className="btn btn-warning w-100" onClick={handleEditRoutine}>
              Editar Rutina
            </button>
          </div>
        )}
        {editMode && (
          <div className="card mt-3 p-3" style={{ backgroundColor: '#f9f9f9' }}>
            <h4>Editar Rutina:</h4>
            <select
              className="form-select"
              value={selectedRoutine}
              onChange={(e) => setSelectedRoutine(e.target.value)}
            >
              <option value="">Selecciona una nueva rutina</option>
              <option value="Rutina personalizada 1">Rutina personalizada 1</option>
              <option value="Rutina personalizada 2">Rutina personalizada 2</option>
              <option value="Rutina personalizada 3">Rutina personalizada 3</option>
            </select>
            <button
              className="btn btn-success w-100 mt-3"
              onClick={handleSaveEditedRoutine}
            >
              Guardar Cambios
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Routines;
