import React from 'react';
import { motion } from 'framer-motion';
import './About.css';

const About: React.FC = () => {
    return (
        <div className="page-container">
            <motion.div
                className="content-card"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h1 className="page-title">About ChurnAI</h1>

                <div className="about-content">
                    <motion.section
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <p className="lead-text">
                            Customer churn is a critical metric for businesses. ChurnAI uses advanced machine learning
                            algorithms to predict whether a customer is likely to leave a service based on their behavior
                            and demographics.
                        </p>
                    </motion.section>

                    <motion.section
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <h3 className="section-title">How It Works</h3>
                        <p>
                            We utilize a Random Forest Classifier trained on historical customer data. By analyzing features
                            such as tenure, satisfaction score, order habits, and more, the model provides a probability
                            score for churn risk with high accuracy.
                        </p>
                    </motion.section>

                    <motion.section
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 }}
                    >
                        <h3 className="section-title">Key Features</h3>
                        <ul className="feature-list">
                            <li>Real-time churn prediction</li>
                            <li>Interactive 3D visualization</li>
                            <li>High accuracy Random Forest model</li>
                            <li>Secure authentication system</li>
                            <li>Beautiful, modern UI/UX</li>
                        </ul>
                    </motion.section>

                    <motion.div
                        className="cta-section"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9 }}
                    >
                        <a href="/dashboard" className="btn btn-primary">Try It Now</a>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default About;
