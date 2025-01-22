import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import RegisterAdmin from './components/RegisterAdmin';
import ChangePassword from './components/ChangePassword';
import Goals from './components/Goals';
import TrainingPreferences from './components/TrainingPreferences';
import Routines from './components/Routines';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register-admin" element={<RegisterAdmin />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/goals" element={<Goals />} />
        <Route path="/training-preferences" element={<TrainingPreferences />} />
        <Route path="/routines" element={<Routines />} />
      </Routes>
    </Router>
  );
}

export default App;

