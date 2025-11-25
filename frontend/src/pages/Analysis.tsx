import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
    AreaChart, Area, ResponsiveContainer
} from 'recharts';
import './Analysis.css';

const Analysis: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { prediction } = location.state || {};

    React.useEffect(() => {
        if (!prediction) {
            navigate('/dashboard');
        }
    }, [prediction, navigate]);

    // Mock Data for Visualizations
    const radarData = [
        { subject: 'Tenure', A: 120, B: 110, fullMark: 150 },
        { subject: 'Satisfaction', A: 98, B: 130, fullMark: 150 },
        { subject: 'Usage', A: 86, B: 130, fullMark: 150 },
        { subject: 'Orders', A: 99, B: 100, fullMark: 150 },
        { subject: 'Complaints', A: 85, B: 90, fullMark: 150 },
        { subject: 'Cashback', A: 65, B: 85, fullMark: 150 },
    ];

    const trendData = [
        { name: 'Jan', usage: 4000, orders: 2400 },
        { name: 'Feb', usage: 3000, orders: 1398 },
        { name: 'Mar', usage: 2000, orders: 9800 },
        { name: 'Apr', usage: 2780, orders: 3908 },
        { name: 'May', usage: 1890, orders: 4800 },
        { name: 'Jun', usage: 2390, orders: 3800 },
    ];

    const featureImportanceData = [
        { name: 'Tenure', impact: 85 },
        { name: 'Complain', impact: 75 },
        { name: 'DaySinceLastOrder', impact: 60 },
        { name: 'Cashback', impact: 40 },
        { name: 'Satisfaction', impact: 30 },
    ];

    return (
        <div className="page-container">
            <motion.div
                className="analysis-container"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="page-title">Detailed Analysis</h1>

                <div className="charts-grid">
                    {/* Radar Chart: Customer Profile vs Ideal */}
                    <div className="chart-card">
                        <h3>Customer Profile vs Ideal</h3>
                        <div className="chart-wrapper">
                            <ResponsiveContainer width="100%" height="100%">
                                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                                    <PolarGrid stroke="#444" />
                                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#A0A0A0', fontSize: 12 }} />
                                    <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                                    <Radar name="Customer" dataKey="A" stroke="#FF6B00" fill="#FF6B00" fillOpacity={0.6} />
                                    <Radar name="Ideal Average" dataKey="B" stroke="#4FD1C5" fill="#4FD1C5" fillOpacity={0.3} />
                                    <Legend />
                                    <Tooltip contentStyle={{ backgroundColor: '#121212', border: '1px solid #333' }} itemStyle={{ color: '#fff' }} />
                                </RadarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Area Chart: Usage Trends */}
                    <div className="chart-card">
                        <h3>6-Month Usage Trend</h3>
                        <div className="chart-wrapper">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={trendData}>
                                    <defs>
                                        <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#FF6B00" stopOpacity={0.8} />
                                            <stop offset="95%" stopColor="#FF6B00" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <XAxis dataKey="name" stroke="#666" />
                                    <YAxis stroke="#666" />
                                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                                    <Tooltip contentStyle={{ backgroundColor: '#121212', border: '1px solid #333' }} itemStyle={{ color: '#fff' }} />
                                    <Area type="monotone" dataKey="usage" stroke="#FF6B00" fillOpacity={1} fill="url(#colorUsage)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Bar Chart: Key Risk Factors */}
                    <div className="chart-card full-width">
                        <h3>Key Risk Factors Impact</h3>
                        <div className="chart-wrapper">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={featureImportanceData} layout="vertical">
                                    <CartesianGrid strokeDasharray="3 3" stroke="#333" horizontal={false} />
                                    <XAxis type="number" stroke="#666" />
                                    <YAxis dataKey="name" type="category" stroke="#A0A0A0" width={100} />
                                    <Tooltip cursor={{ fill: 'rgba(255,255,255,0.05)' }} contentStyle={{ backgroundColor: '#121212', border: '1px solid #333' }} itemStyle={{ color: '#fff' }} />
                                    <Bar dataKey="impact" fill="#EF4444" radius={[0, 4, 4, 0]} barSize={20} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                <div className="action-buttons">
                    <button onClick={() => navigate('/result', { state: location.state })} className="btn btn-secondary">
                        Back to Summary
                    </button>
                    <button onClick={() => navigate('/dashboard')} className="btn btn-primary">
                        New Prediction
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default Analysis;
