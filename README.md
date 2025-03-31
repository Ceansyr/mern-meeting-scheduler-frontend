# MERN Meeting Scheduler

This is a full-stack meeting scheduler built with the **MERN stack (MongoDB, Express, React, Node.js)**. The application allows users to schedule and manage meetings efficiently.

---

## 📌 Features Implemented

### ✅ Backend (Node.js, Express, MongoDB)
- User authentication (Register/Login with JWT)
- CRUD operations for meetings
- Middleware for error handling & request logging
- CORS enabled for frontend integration
- MongoDB database connection

### ✅ Frontend (React)
- User-friendly interface for scheduling meetings
- Authentication system with protected routes
- Dynamic filtering and searching of meetings
- Responsive UI for various screen sizes

---

## 🛠️ Setup Instructions

### 🔹 Backend Setup

1. Clone the backend repository:
   ```bash
   git clone  https://github.com/Ceansyr/mern-meeting-scheduler-backend
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory and add the following:
   ```env
   PORT=5000
   MONGO_URI=<your-mongodb-uri>
   JWT_SECRET=<your-secret-key>
   CLIENT_URL=<your-frontend-url>
   ```
4. Start the backend server:
   ```bash
   npm run dev
   ```

### 🔹 Frontend Setup

1. Clone the frontend repository:
   ```bash
   git clone https://github.com/Ceansyr/mern-meeting-scheduler-frontend
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory and add:
   ```env
   VITE_API_URL=https://mern-meeting-scheduler-backend.vercel.app
   ```
4. Start the React app:
   ```bash
   npm run dev
   ```

---

## 🎥 Demo Credentials

Use the following credentials for testing:

- **User**
  - Username: `user`
  - Email: `user@example.com`
  - Password: `user123`

---

## 📄 API Endpoints (Backend)

| Method | Endpoint           | Description             |
|--------|-------------------|-------------------------|
| POST   | `/api/user/register` | Register a new user    |
| POST   | `/api/user/login`    | User login & token generation |
| GET    | `/api/events`        | Get all meetings       |
| POST   | `/api/events`        | Schedule a new meeting |
| DELETE | `/api/events/:id`    | Cancel a meeting       |

---

## 🚀 Deployment

### Backend:
- Hosted on **Vercel**: `(https://mern-meeting-scheduler-backend.vercel.app/)`

### Frontend:
- Hosted on **Netlify**: `(https://astonishing-smakager-a8b308.netlify.app/)`

---

## 🛠 Technologies Used

### Backend:
- Node.js
- Express.js
- MongoDB & Mongoose
- JWT Authentication
- CORS

### Frontend:
- React.js
- React Router
- Axios for API requests

---



