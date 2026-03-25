# 🚀 CollegeFinder

### A Full-Stack College Discovery & Admission Support Platform

<p align="center">
  <b>Helping students discover the right college with smart filters, guidance & seamless admission support 🎓</b>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Status-Active-success?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/Backend-Node.js-green?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/Frontend-React-blue?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/Database-MongoDB-darkgreen?style=for-the-badge"/>
</p>

---

## 📌 Overview

**CollegeFinder** is a modern full-stack web application designed to simplify the college search and admission process for students.

It provides an intuitive platform where users can explore colleges, get personalized career guidance, and manage admission enquiries - all in one place.

---

## 🔗 Live Demo

🌐 https://frontend-nine-phi-85.vercel.app

---

## 🖼️ Preview

<p align="center">
  <img src="assets/demo.png" alt="CollegeFinder Preview" width="100%"/>
</p>

---

## ✨ Features

### 🎓 Student Side

* 🔍 Explore colleges using smart filters (budget, location, course, type)
* 📄 View detailed college information
* 📝 Submit admission enquiries
* 🧠 Take career guidance tests
* 📊 Track enquiry status via dashboard

### 🛠️ Admin Panel

* 📥 Manage student requests
* ➕ Add / update colleges
* 📊 Monitor platform activity

---

## 🧱 Tech Stack

### 💻 Frontend

* React (Vite)
* Tailwind CSS
* React Router
* Framer Motion
* Axios

### ⚙️ Backend

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication

---

## 📂 Project Structure

```text
college-finder/
│
├── frontend/   # React Application
├── backend/    # Express API & Database Models
```

---

## ⚡ Local Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/groot736/college-finder.git
cd college-finder
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file based on `.env.example` and add:

```env
MONGO_URI=
JWT_SECRET=
ADMIN_EMAIL=
ADMIN_PASSWORD=
```

Run backend:

```bash
npm run dev
```

📍 Backend runs at:

```text
http://localhost:5000
```

---

### 3️⃣ Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

📍 Frontend runs at:

```text
http://localhost:5173
```

---

## 📜 Scripts

### Backend

```bash
npm run dev           # Start server with nodemon
npm start             # Start production server
npm run create-admin  # Create or update admin
```

### Frontend

```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run preview  # Preview build
```

---

## 🌐 Deployment

### 🔹 Backend (Render)

* Deploy as a Web Service
* Build Command:

  ```bash
  npm install
  ```
* Start Command:

  ```bash
  npm start
  ```
* Add Environment Variables:

  ```text
  MONGO_URI
  JWT_SECRET
  NODE_ENV=production
  CORS_ORIGIN=https://your-frontend-domain.vercel.app
  ```

📍 Example:

```text
https://your-backend.onrender.com
```

---

### 🔹 Frontend (Vercel)

* Import repo -> Select `frontend` as root
* Add environment variable:

  ```text
  VITE_API_URL=https://your-backend.onrender.com/api
  ```

📍 Example:

```text
https://your-project.vercel.app
```

---

## 🔒 Important Notes

* 🚫 Never commit `.env` files
* 🔑 Keep secrets secure
* 🔐 Use GitHub Personal Access Token for authentication

---

## 👨‍💻 Author

**Subhadeep Mondal**
💡 Passionate about building real-world scalable applications

---

## ⭐ Support

If you like this project, don't forget to ⭐ the repo and share it!

---

<p align="center">
  Made with ❤️ by Subhadeep
</p>
