import React, { Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Spline from '@splinetool/react-spline';
import './Home.css';

const Home: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="home-container">
            {/* Spline 3D Scene - Optimized */}
            <div className="spline-container">
                <Suspense fallback={
                    <div className="spline-loading">
                        <div className="loading-spinner"></div>
                        <p>Loading Scene...</p>
                    </div>
                }>
                    <Spline
                        scene="/scene.spline"
                        renderOnDemand={true}
                        style={{ width: '100%', height: '100%' }}
                    />
                </Suspense>
            </div>

            <motion.div
                className="home-content"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
            >
                <motion.h1
                    className="home-title"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                >
                    Predict Customer <span>Churn</span>
                </motion.h1>

                <motion.p
                    className="home-subtitle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                >
                    AI-powered insights for your business
                </motion.p>

                <motion.div
                    className="home-buttons"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.9 }}
                >
                    <button onClick={() => navigate('/dashboard')} className="btn btn-primary">
                        Get Started
                    </button>
                    <button onClick={() => navigate('/about')} className="btn btn-secondary">
                        Learn More
                    </button>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Home;
