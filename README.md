# 🚀 Job Sphere - Find Your Dream Job

Job Sphere is a modern, full-stack web application designed to seamlessly connect job seekers with top employers. Built with React and Node.js, it offers a fast, dynamic, and beautiful UI with advanced backend analytics and secure user management.

## 📹 Project Walkthrough Demonstration
## check out this video to watch the system functionalities
[ https://github.com/user-attachments/assets/95f990f4-9e20-4954-a399-61d020c720e2 ]

## ✨ Features

- **Secure Authentication:** JWT-based user login, signup, and a complete password recovery system (Forgot/Reset Password via robust email token verification).
- **Intelligent Job Search & Filtering:** Debounced search combined with numeric salary range filtering.
- **User Dashboard:** Save/Bookmark jobs, track application statuses, and edit user profile settings directly.
- **Admin Analytics Panel:** Real-time dashboard tracking total users, active jobs, and pending applications using database aggregation points.
- **Automated Email Notifications:** Users receive instant email updates when their application status is changed or a password reset is requested.
- **Dark Mode Support:** Smooth, context-aware dark/light mode toggle that persists across sessions.

## 🛠️ Technology Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Redux Toolkit, React Router, Vite.
- **Backend**: Node.js, Express.js, MongoDB + Mongoose, JSON Web Tokens (JWT), Nodemailer (for emails), Node Crypto.

## 🚀 Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed along with MongoDB running locally or via Atlas.

### 1️⃣ Installation

Clone the repository:

```bash
git clone https://github.com/Milkesa-T/Job-sphere.git
cd Job-sphere
```

Install frontend dependencies:

```bash
cd Frontend
npm install
```

Install backend dependencies:

```bash
cd ../Backend
npm install
```

### 2️⃣ Environment Variables Setup

Create a `.env` file in the `Backend` directory and exactly map these variables:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string_here
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRE=30d

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_EMAIL=milkesataye0450@gmail.com
SMTP_PASSWORD=your_gmail_app_password
FROM_EMAIL=noreply@jobsphere.com
FROM_NAME=JobSphere
```

### 3️⃣ Running the Application Locally

Open two separate terminal windows:

**Start the Backend Server (Port 5000)**

```bash
cd Backend
npm run dev
```

**Start the Frontend App (Port 5173)**

```bash
cd Frontend
npm run dev
```

Open your browser and navigate to `http://localhost:5173` to explore the application!

---

**Developed by Milkesa-T.**
