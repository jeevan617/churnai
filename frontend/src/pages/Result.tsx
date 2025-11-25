import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    PieChart, Pie, Cell, ResponsiveContainer,
    BarChart, Bar, XAxis, YAxis, Tooltip, Legend
} from 'recharts';
import './Result.css';

const Result: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { prediction, probability, probability_formatted } = location.state || {};

    // If no state, redirect to dashboard
    React.useEffect(() => {
        if (!prediction) {
            navigate('/dashboard');
        }
    }, [prediction, navigate]);

    const isHighRisk = prediction === 'Churn';
    const riskColor = isHighRisk ? '#EF4444' : '#10B981';

    // Data for Pie Chart
    const pieData = [
        { name: 'Risk', value: probability * 100 },
        { name: 'Safe', value: (1 - probability) * 100 }
    ];
    const pieColors = [riskColor, '#2D2D2D'];

    // Mock Data for Comparison (In a real app, this would come from backend)
    const comparisonData = [
        { name: 'Tenure', user: 12, avg: 24 },
        { name: 'Satisfaction', user: 3, avg: 3.5 },
        { name: 'Complaints', user: 1, avg: 0.4 },
        { name: 'Orders', user: 5, avg: 8 },
    ];

    return (
        <div className="page-container">
            <motion.div
                className="result-card"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="result-title">Prediction Result</h2>

                <div className={`result-icon ${isHighRisk ? 'high-risk' : 'low-risk'}`}>
                    {isHighRisk ? '⚠️' : '🛡️'}
                </div>

                <div className="result-status">
                    {isHighRisk ? (
                        <span className="high-risk-text">High Risk</span>
                    ) : (
                        <span className="low-risk-text">Low Risk</span>
                    )}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                >
                    <div className="probability-bar-container">
                        <div className="probability-bar">
                            <motion.div
                                className={`probability-fill ${isHighRisk ? 'high-risk-fill' : 'low-risk-fill'}`}
                                initial={{ width: 0 }}
                                animate={{ width: `${probability * 100}%` }}
                                transition={{ duration: 1, delay: 0.5 }}
                            />
                        </div>
                        <div className="probability-labels">
                            <span>Safe</span>
                            <span className="probability-value">{probability_formatted} Probability</span>
                            <span>Risk</span>
                        </div>
                    </div>

                    {/* Graphs Section */}
                    <div className="graphs-container">
                        <div className="graph-box">
                            <h3>Churn Probability</h3>
                            <div style={{ width: '100%', height: 200 }}>
                                <ResponsiveContainer>
                                    <PieChart>
                                        <Pie
                                            data={pieData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={80}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {pieData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={pieColors[index]} stroke="none" />
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            contentStyle={{ backgroundColor: '#121212', border: '1px solid #333', borderRadius: '8px' }}
                                            itemStyle={{ color: '#fff' }}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        <div className="graph-box">
                            <h3>User vs Average</h3>
                            <div style={{ width: '100%', height: 200 }}>
                                <ResponsiveContainer>
                                    <BarChart data={comparisonData}>
                                        <XAxis dataKey="name" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                                        <YAxis hide />
                                        <Tooltip
                                            cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                            contentStyle={{ backgroundColor: '#121212', border: '1px solid #333', borderRadius: '8px' }}
                                            itemStyle={{ color: '#fff' }}
                                        />
                                        <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                                        <Bar dataKey="user" name="User" fill="#FF6B00" radius={[4, 4, 0, 0]} />
                                        <Bar dataKey="avg" name="Average" fill="#4A5568" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>

                    <div className="action-buttons" style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                        <button onClick={() => navigate('/analysis', { state: location.state })} className="btn btn-secondary">
                            View Detailed Analysis
                        </button>
                        <button onClick={() => navigate('/dashboard')} className="btn btn-primary">
                            New Prediction
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Result;
