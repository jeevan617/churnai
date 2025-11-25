import React from 'react';
import { motion } from 'framer-motion';
import './Devs.css';

const developers = [
    { name: 'Developer 1', role: 'Full Stack Engineer', gradient: 'linear-gradient(135deg, #00d4ff 0%, #06b6d4 100%)' },
    { name: 'Developer 2', role: 'ML Specialist', gradient: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)' },
    { name: 'Developer 3', role: 'UI/UX Designer', gradient: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)' },
];

const Devs: React.FC = () => {
    return (
        <div className="page-container">
            <motion.div
                className="content-card"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h1 className="page-title">Meet the Developers</h1>

                <div className="devs-grid">
                    {developers.map((dev, index) => (
                        <motion.div
                            key={index}
                            className="dev-card"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1 * (index + 1), duration: 0.5 }}
                            whileHover={{ scale: 1.05, y: -10 }}
                        >
                            <div
                                className="dev-avatar"
                            >
                                {dev.name.charAt(0)}
                            </div>
                            <h3 className="dev-name">{dev.name}</h3>
                            <p className="dev-role">{dev.role}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

export default Devs;
