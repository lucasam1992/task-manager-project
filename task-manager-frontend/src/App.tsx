import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';
import TaskList from './Components/Tasks/TaskList';

const App: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);
  const isAuthenticated = !!token;

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route path="/tasks" element={<TaskList token={token || ''} />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
