# ChurnAI - Customer Churn Prediction App

A modern, full-stack web application for predicting customer churn using machine learning, featuring a stunning 3D Earth visualization and premium UI/UX.

## 🌟 Features

- **3D Earth Visualization**: Interactive day/night Earth using Three.js
- **Machine Learning**: Random Forest model for accurate churn prediction
- **Modern UI**: Glassmorphism design with smooth animations
- **Authentication**: Secure login system with demo mode
- **Responsive**: Works beautifully on all devices

## 🏗️ Architecture

- **Frontend**: React + TypeScript + Vite
- **Backend**: Flask REST API
- **3D Graphics**: Three.js + React Three Fiber
- **Animations**: Framer Motion
- **Routing**: React Router

## 📦 Installation

### Backend Setup

```bash
cd backend
pip install -r requirements.txt
python app.py
```

The backend will run on `http://localhost:5000`

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will run on `http://localhost:5173`

## 🚀 Usage

1. **Start the Backend**: Navigate to `backend/` and run `python app.py`
2. **Start the Frontend**: Navigate to `frontend/` and run `npm run dev`
3. **Open Browser**: Visit `http://localhost:5173`
4. **Login**: Click "Demo Login" or use credentials (admin/admin)
5. **Predict**: Fill out the form and get churn predictions!

## 🎨 Pages

- **Home**: 3D Earth hero section with call-to-action
- **Login/Signup**: Authentication pages
- **About**: Information about the project
- **Devs**: Meet the development team
- **Dashboard**: Prediction form (protected)
- **Result**: Prediction results with visualization (protected)

## 🔐 Demo Login

Click the "Demo Login" button on the login page for instant access, or use:
- Username: `admin`
- Password: `admin`

## 🛠️ Tech Stack

### Frontend
- React 18
- TypeScript
- Vite
- Three.js / React Three Fiber
- Framer Motion
- React Router

### Backend
- Flask
- Flask-CORS
- Scikit-learn
- Pandas
- NumPy

## 📝 License

MIT License