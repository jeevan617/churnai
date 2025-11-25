from flask import Flask, request, jsonify, session
from flask_cors import CORS
import joblib
import pandas as pd
import numpy as np
from functools import wraps
import os

app = Flask(__name__)
app.secret_key = os.environ.get('SECRET_KEY', 'dev_secret_key')

# Configure CORS to allow requests from the frontend
CORS(app, supports_credentials=True, resources={r"/*": {"origins": ["http://localhost:5173", "http://127.0.0.1:5173"]}})

# Load the trained model
try:
    model = joblib.load('rf_churn_model.pkl')
    print("Model loaded successfully.")
except Exception as e:
    print(f"Error loading model: {e}")
    model = None

# Define feature columns
feature_cols = [
    'Tenure', 'CityTier', 'WarehouseToHome', 'HourSpendOnApp', 'NumberOfDeviceRegistered',
    'SatisfactionScore', 'NumberOfAddress', 'Complain', 'OrderAmountHikeFromlastYear',
    'CouponUsed', 'OrderCount', 'DaySinceLastOrder', 'CashbackAmount',
    'PreferredLoginDevice_Mobile Phone', 'PreferredLoginDevice_Phone',
    'PreferredPaymentMode_COD', 'PreferredPaymentMode_Cash on Delivery',
    'PreferredPaymentMode_Credit Card', 'PreferredPaymentMode_Debit Card',
    'PreferredPaymentMode_E wallet', 'PreferredPaymentMode_UPI', 'Gender_Male',
    'MaritalStatus_Married', 'MaritalStatus_Single', 'PreferedOrderCat_Grocery',
    'PreferedOrderCat_Laptop & Accessory', 'PreferedOrderCat_Mobile',
    'PreferedOrderCat_Mobile Phone', 'PreferedOrderCat_Others'
]

# Login required decorator
def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'logged_in' not in session:
            return jsonify({'error': 'Unauthorized'}), 401
        return f(*args, **kwargs)
    return decorated_function

@app.route('/api/auth/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        print(f"Login attempt: {data}")
        
        # Demo login
        if data.get('demo'):
            session.permanent = True
            session['logged_in'] = True
            session['username'] = 'Demo User'
            print("Demo login successful")
            return jsonify({'success': True, 'username': 'Demo User'})
    
        username = data.get('username')
        password = data.get('password')
        
        # Simple hardcoded check
        if username == 'admin' and password == 'admin':
            session.permanent = True
            session['logged_in'] = True
            session['username'] = username
            return jsonify({'success': True, 'username': username})
        
        return jsonify({'success': False, 'message': 'Invalid credentials'}), 401

    except Exception as e:
        print(f"Login error: {str(e)}")
        return jsonify({'success': False, 'message': 'Server error'}), 500

@app.route('/api/auth/logout', methods=['POST'])
def logout():
    session.pop('logged_in', None)
    session.pop('username', None)
    return jsonify({'success': True})

@app.route('/api/auth/status', methods=['GET'])
def auth_status():
    if 'logged_in' in session:
        return jsonify({
            'authenticated': True,
            'username': session.get('username')
        })
    return jsonify({'authenticated': False})

@app.route('/api/predict', methods=['POST'])
@login_required
def predict():
    if model is None:
        return jsonify({'error': 'Model not loaded'}), 500

    try:
        data = request.get_json()
        
        # Prepare input data
        input_data = {
            'Tenure': float(data['Tenure']),
            'CityTier': int(data['CityTier']),
            'WarehouseToHome': float(data['WarehouseToHome']),
            'HourSpendOnApp': float(data['HourSpendOnApp']),
            'NumberOfDeviceRegistered': int(data['NumberOfDeviceRegistered']),
            'SatisfactionScore': int(data['SatisfactionScore']),
            'NumberOfAddress': int(data['NumberOfAddress']),
            'Complain': int(data['Complain']),
            'OrderAmountHikeFromlastYear': float(data['OrderAmountHikeFromlastYear']),
            'CouponUsed': float(data['CouponUsed']),
            'OrderCount': float(data['OrderCount']),
            'DaySinceLastOrder': float(data['DaySinceLastOrder']),
            'CashbackAmount': float(data['CashbackAmount']),
            'PreferredLoginDevice': data['PreferredLoginDevice'],
            'PreferredPaymentMode': data['PreferredPaymentMode'],
            'Gender': data['Gender'],
            'MaritalStatus': data['MaritalStatus'],
            'PreferedOrderCat': data['PreferedOrderCat']
        }

        # Convert to DataFrame
        input_df = pd.DataFrame([input_data])

        # One-hot encoding
        input_df_encoded = pd.get_dummies(input_df, columns=[
            'PreferredLoginDevice', 'PreferredPaymentMode', 'Gender', 'MaritalStatus', 'PreferedOrderCat'
        ])

        # Ensure all required columns
        for col in feature_cols:
            if col not in input_df_encoded.columns:
                input_df_encoded[col] = 0

        # Reorder columns
        input_df_encoded = input_df_encoded[feature_cols]
        input_df_encoded = input_df_encoded.astype(int)

        # Make prediction
        prediction = model.predict(input_df_encoded)[0]
        probability = model.predict_proba(input_df_encoded)[0][1]

        result = 'Churn' if prediction == 1 else 'No Churn'
        
        return jsonify({
            'prediction': result,
            'probability': float(probability),
            'probability_formatted': f'{probability:.2%}'
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True, port=5051)