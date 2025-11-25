import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import './Login.css';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login, demoLogin } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        const success = await login(username, password);
        if (success) {
            navigate('/dashboard');
        } else {
            setError('Invalid credentials');
        }
    };

    const handleDemoLogin = async () => {
        try {
            await demoLogin();
            // Force navigation to dashboard after successful login
            navigate('/dashboard', { replace: true });
        } catch (err) {
            setError('Demo login failed. Please try again.');
            console.error(err);
        }
    };

    return (
        <div className="auth-container">
            <motion.div
                className="auth-card"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="auth-title">Welcome Back</h2>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter username"
                            className="form-control"
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password"
                            className="form-control"
                        />
                    </div>

                    {error && <div className="error-message">{error}</div>}

                    <button type="submit" className="btn btn-primary full-width">
                        Login
                    </button>
                </form>

                <div className="auth-divider">
                    <span>Don't have an account?</span>
                    <a href="/signup" className="auth-link">Sign Up</a>
                </div>

                <div className="demo-section">
                    <p>For testing purposes:</p>
                    <button onClick={handleDemoLogin} className="btn btn-demo">
                        Demo Login
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
