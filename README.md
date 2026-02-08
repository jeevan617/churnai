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

## 📦 Installation & Setup

### 1. Backend Setup

Open a terminal and navigate to the backend directory:

```bash
cd backend
```

Create and activate a virtual environment (optional but recommended):

```bash
# macOS/Linux
python -m venv venv
source venv/bin/activate

# Windows
python -m venv venv
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run the backend server:

```bash
python app.py
```

The backend will run on `http://127.0.0.1:5051`.

### 2. Frontend Setup

Open a new terminal and navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will run on `http://localhost:5173`.

## 🚀 Usage

1.  **Start the Backend**: Ensure `python app.py` is running in `backend/`.
2.  **Start the Frontend**: Ensure `npm run dev` is running in `frontend/`.
3.  **Open Browser**: Visit `http://localhost:5173`.
4.  **Login/Signup**:
    *   **Signup**: Create a new account.
    *   **Login**: Use your new credentials or the default admin account.
        *   Username: `admin`
        *   Password: `admin`
    *   **Demo Login**: Click "Demo Login" for instant access.
5.  **Success**: Upon successful login, you will see the "Login Successful" page.

*Note: The current version of the app is simplified to focus on the Authentication flow (Login -> Success).*

## 🎨 Pages

- **Login**: Authentication page with Demo option.
- **Signup**: User registration page.
- **Login Successful**: Confirmation page after logging in.


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