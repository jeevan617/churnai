import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const LoginSuccessful: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="auth-container">
            <motion.div
                className="auth-card"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{ textAlign: 'center' }}
            >
                <div style={{ marginBottom: '20px' }}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{ width: '64px', height: '64px', color: '#4ade80' }}
                    >
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                </div>

                <h2 className="auth-title">Login Successful!</h2>
                <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>
                    Welcome back to ChurnAI. You have successfully authenticated.
                </p>

                <button
                    onClick={() => navigate('/login')}
                    className="btn btn-primary full-width"
                >
                    Back to Login
                </button>
            </motion.div>
        </div>
    );
};

export default LoginSuccessful;
