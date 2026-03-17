# Member Portal React + Flask

A full stack member portal built with **React** and **Flask** to demonstrate secure authentication, OTP-based flows, dashboard workflows, and enterprise integration patterns.

## Overview

This project is a portfolio-safe version of a member portal architecture where a React frontend communicates with a Flask backend, which in turn integrates with external business systems through APIs.

## Tech Stack

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS
- Axios
- React Router

### Backend
- Python
- Flask
- Flask-CORS
- Flask-Mail
- Requests
- bcrypt
- python-dotenv

## Features

- User registration
- OTP generation and verification
- Password setup
- Login flow
- Dashboard UI
- Backend integration service layer

## Screenshots

### Login Page
![Login Page](docs/screenshots/login-page.png)

### Register Page
![Register Page](docs/screenshots/register-page.png)

### Verify OTP Page
![Verify OTP Page](docs/screenshots/verify-otp-page.png)

### Set Password Page
![Set Password Page](docs/screenshots/set-password-page.png)

### Homepage Dashboard
![Homepage Dashboard](docs/screenshots/homepage-dashboard.png)

## Project Structure

```text
member-portal-react-flask/
├── backend/
│   ├── app/
│   ├── requirements.txt
│   ├── run.py
│   └── .env.example
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
├── .gitignore
└── README.md
```

## Running the Project

### Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate
python -m pip install -r requirements.txt
python run.py
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Configuration

Copy `.env.example` to `.env` and replace the placeholder values with your local configuration before running the backend.

## Portfolio Note

The public version of this repository has been sanitized to remove organization-specific branding, logos, hardcoded credentials, and private endpoints.
