CollegeFinder
A full-stack college discovery and admission support platform for students.

Created and maintained by Subhadeep Mondal.

Overview
CollegeFinder helps students:

explore colleges with filters (budget, location, course, type)
view detailed college information
submit admission enquiries
take a career test for guidance
track request status from a student dashboard
manage requests and add colleges from an admin dashboard
Tech Stack
Frontend
React (Vite)
Tailwind CSS
React Router
Framer Motion
Axios
Backend
Node.js
Express.js
MongoDB (Mongoose)
JWT authentication
Project Structure
frontend: React application
backend: Express API and database models
Local Setup
1) Clone repository
git clone https://github.com/groot736/college-finder.git
cd college-finder
2) Backend setup
cd backend
npm install
Create a backend .env file based on .env.example and set required values:

MONGO_URI
JWT_SECRET
ADMIN_EMAIL
ADMIN_PASSWORD
Run backend:

npm run dev
Backend runs on:

http://localhost:5000
3) Frontend setup
cd ../frontend
npm install
npm run dev
Frontend runs on:

http://localhost:5173
Scripts
Backend
npm run dev: start server with nodemon
npm start: start production server
npm run create-admin: create or update admin account
Frontend
npm run dev: start Vite dev server
npm run build: create production build
npm run preview: preview production build
Notes
Keep .env files private and never commit secrets.
Use a GitHub Personal Access Token for HTTPS git push.
Author
Subhadeep Mondal
