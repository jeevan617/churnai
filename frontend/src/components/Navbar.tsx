import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Navbar.css';

const Navbar: React.FC = () => {
    const { isAuthenticated, logout } = useAuth();

    const handleLogout = async () => {
        await logout();
    };

    return (
        <nav className="navbar">
            <Link to="/" className="logo">ChurnAI</Link>
            <div className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/devs">Devs</Link>
                {isAuthenticated ? (
                    <>
                        <Link to="/dashboard">Dashboard</Link>
                        <button onClick={handleLogout} className="btn-login">Logout</button>
                    </>
                ) : (
                    <Link to="/login" className="btn-login">Login</Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
