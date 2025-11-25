import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Dashboard.css';

interface FormData {
    Tenure: string;
    CityTier: string;
    WarehouseToHome: string;
    HourSpendOnApp: string;
    NumberOfDeviceRegistered: string;
    SatisfactionScore: string;
    NumberOfAddress: string;
    Complain: string;
    OrderAmountHikeFromlastYear: string;
    CouponUsed: string;
    OrderCount: string;
    DaySinceLastOrder: string;
    CashbackAmount: string;
    PreferredLoginDevice: string;
    PreferredPaymentMode: string;
    Gender: string;
    MaritalStatus: string;
    PreferedOrderCat: string;
}

const Dashboard: React.FC = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        Tenure: '',
        CityTier: '1',
        WarehouseToHome: '',
        HourSpendOnApp: '',
        NumberOfDeviceRegistered: '',
        SatisfactionScore: '',
        NumberOfAddress: '',
        Complain: '0',
        OrderAmountHikeFromlastYear: '',
        CouponUsed: '',
        OrderCount: '',
        DaySinceLastOrder: '',
        CashbackAmount: '',
        PreferredLoginDevice: 'Mobile Phone',
        PreferredPaymentMode: 'Debit Card',
        Gender: 'Male',
        MaritalStatus: 'Single',
        PreferedOrderCat: 'Laptop & Accessory',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('http://localhost:5051/api/predict', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                navigate('/result', { state: data });
            } else {
                alert('Prediction failed. Please try again.');
            }
        } catch (error) {
            console.error('Prediction error:', error);
            alert('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page-container">
            <motion.div
                className="dashboard-card"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h1 className="page-title">Churn Prediction Dashboard</h1>

                <form onSubmit={handleSubmit} className="prediction-form">

                    {/* Customer Details */}
                    <div className="form-section">
                        <h3 className="section-header">Customer Details</h3>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Gender</label>
                                <select name="Gender" value={formData.Gender} onChange={handleChange} className="form-control">
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Marital Status</label>
                                <select name="MaritalStatus" value={formData.MaritalStatus} onChange={handleChange} className="form-control">
                                    <option value="Single">Single</option>
                                    <option value="Married">Married</option>
                                    <option value="Divorced">Divorced</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>City Tier</label>
                                <select name="CityTier" value={formData.CityTier} onChange={handleChange} className="form-control">
                                    <option value="1">Tier 1</option>
                                    <option value="2">Tier 2</option>
                                    <option value="3">Tier 3</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Tenure (Months)</label>
                                <input type="number" name="Tenure" value={formData.Tenure} onChange={handleChange} className="form-control" required min="0" />
                            </div>

                            <div className="form-group">
                                <label>Number of Addresses</label>
                                <input type="number" name="NumberOfAddress" value={formData.NumberOfAddress} onChange={handleChange} className="form-control" required min="1" />
                            </div>
                        </div>
                    </div>

                    {/* Usage & Behavior */}
                    <div className="form-section">
                        <h3 className="section-header">Usage & Behavior</h3>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Preferred Login Device</label>
                                <select name="PreferredLoginDevice" value={formData.PreferredLoginDevice} onChange={handleChange} className="form-control">
                                    <option value="Mobile Phone">Mobile Phone</option>
                                    <option value="Phone">Phone</option>
                                    <option value="Computer">Computer</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Devices Registered</label>
                                <input type="number" name="NumberOfDeviceRegistered" value={formData.NumberOfDeviceRegistered} onChange={handleChange} className="form-control" required min="1" />
                            </div>

                            <div className="form-group">
                                <label>Hours Spent on App</label>
                                <input type="number" step="0.1" name="HourSpendOnApp" value={formData.HourSpendOnApp} onChange={handleChange} className="form-control" required min="0" />
                            </div>

                            <div className="form-group">
                                <label>Satisfaction Score (1-5)</label>
                                <input type="number" name="SatisfactionScore" value={formData.SatisfactionScore} onChange={handleChange} className="form-control" required min="1" max="5" />
                            </div>

                            <div className="form-group">
                                <label>Complaints Raised</label>
                                <select name="Complain" value={formData.Complain} onChange={handleChange} className="form-control">
                                    <option value="0">No</option>
                                    <option value="1">Yes</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Order History */}
                    <div className="form-section">
                        <h3 className="section-header">Order History</h3>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Preferred Order Category</label>
                                <select name="PreferedOrderCat" value={formData.PreferedOrderCat} onChange={handleChange} className="form-control">
                                    <option value="Laptop & Accessory">Laptop & Accessory</option>
                                    <option value="Mobile">Mobile</option>
                                    <option value="Mobile Phone">Mobile Phone</option>
                                    <option value="Grocery">Grocery</option>
                                    <option value="Others">Others</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Preferred Payment Mode</label>
                                <select name="PreferredPaymentMode" value={formData.PreferredPaymentMode} onChange={handleChange} className="form-control">
                                    <option value="Debit Card">Debit Card</option>
                                    <option value="Credit Card">Credit Card</option>
                                    <option value="E wallet">E-Wallet</option>
                                    <option value="UPI">UPI</option>
                                    <option value="COD">COD</option>
                                    <option value="Cash on Delivery">Cash on Delivery</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Order Count</label>
                                <input type="number" name="OrderCount" value={formData.OrderCount} onChange={handleChange} className="form-control" required min="0" />
                            </div>

                            <div className="form-group">
                                <label>Days Since Last Order</label>
                                <input type="number" name="DaySinceLastOrder" value={formData.DaySinceLastOrder} onChange={handleChange} className="form-control" required min="0" />
                            </div>

                            <div className="form-group">
                                <label>Warehouse to Home (km)</label>
                                <input type="number" step="0.1" name="WarehouseToHome" value={formData.WarehouseToHome} onChange={handleChange} className="form-control" required min="0" />
                            </div>

                            <div className="form-group">
                                <label>Order Amount Hike (%)</label>
                                <input type="number" step="0.1" name="OrderAmountHikeFromlastYear" value={formData.OrderAmountHikeFromlastYear} onChange={handleChange} className="form-control" required min="0" />
                            </div>

                            <div className="form-group">
                                <label>Coupons Used</label>
                                <input type="number" name="CouponUsed" value={formData.CouponUsed} onChange={handleChange} className="form-control" required min="0" />
                            </div>

                            <div className="form-group">
                                <label>Cashback Amount</label>
                                <input type="number" step="0.1" name="CashbackAmount" value={formData.CashbackAmount} onChange={handleChange} className="form-control" required min="0" />
                            </div>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary submit-btn" disabled={loading}>
                        {loading ? 'Predicting...' : 'Predict Churn Risk'}
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

export default Dashboard;
