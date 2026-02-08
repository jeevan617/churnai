import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
// import Navbar from './components/Navbar';
// import ProtectedRoute from './components/ProtectedRoute';
// import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import LoginSuccessful from './pages/LoginSuccessful';
// import About from './pages/About';
// import Devs from './pages/Devs';
// import Dashboard from './pages/Dashboard';
// import Result from './pages/Result';
// import Analysis from './pages/Analysis';
import './App.css';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          {/* <Navbar /> */}
          <Routes>
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login-successful" element={<LoginSuccessful />} />
            {/* <Route path="/about" element={<About />} /> */}
            {/* <Route path="/devs" element={<Devs />} /> */}
            {/* <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            /> */}
            {/* <Route
              path="/result"
              element={
                <ProtectedRoute>
                  <Result />
                </ProtectedRoute>
              }
            /> */}
            {/* <Route
              path="/analysis"
              element={
                <ProtectedRoute>
                  <Analysis />
                </ProtectedRoute>
              }
            /> */}
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
