# Job Portal Application

![Cover](frontend/assets/cover_page.png)


## 📝 Project Description

The **Job Portal Application** is a web-based platform designed to streamline the recruitment process by connecting job seekers with employers in an efficient, user-friendly, and organized manner. The platform facilitates job postings, applications, resume submissions, and employer-candidate interactions.

---

## 🚀 Live Demo

Check out the live version of this project here:

🔗 [View Live Site](https://job-portal-1-ssaf.onrender.com/)
---

## 🚀 Features

### 👤 User Module (Job Seekers)
- User registration and login
- Profile creation and resume upload
- Job search with filters (title, location, experience, etc.)
- Apply to jobs directly from the platform
- Track application status

### 🏢 Employer Module
- Employer registration and login
- Post and manage job listings
- View, filter, and shortlist applicants
- Schedule interviews and communicate with candidates

---

## 🛠️ Tech Stack

| Layer       | Technology                     |
|-------------|--------------------------------|
| Frontend    | HTML, CSS, JavaScript, React.js |
| Backend     | Node.js |
| Database    | MySQL MongoDB   |
| Auth        | JWT              |
| Deployment  | Render |

---

## 🛠️ How to Clone and Run Locally

Follow these steps to clone and run the Dice Game locally on your machine:

```bash
# Step 1: Clone the repository
git clone https://github.com/IamProgrammer24/Job_portal.git

# Step 2: Navigate into the project folder
cd Job_portal

# Step 3: Navigate into the client/server folder
cd Job_portal/frontend
cd Job_portal/backend

# Step 4: Install the dependencies
npm install

# Step 5: Run
cd npm run dev

# Now open your browser and go to:
http://localhost:1573

```

## 🔐 Environment Variable Setup

Before running the application, create `.env` files in both the **backend** and **frontend** folders with the following variables:

---

### 📁 Backend (`/backend/.env`)

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/job_portal_db
SECRET_KEY=your_secrect_key
FRONTEND_URI=http://localhost:5173

```
### 📁 Frontend (`/frontend/.env`)

```env
VITE_API_BASE_URL=http://localhost:3000/api/v1

```
## API Reference

#### Job Seeker/Recruiter Endpoints

* **POST /api/v1/user/register** : Register a new User account.
* **POST /api/v1/user/login**: Log in to an existing User accound.
* **POST /api/v1/user/logout**: Logs out the currently authenticated user.
* **GET /api/v1/user/update**: Update the Profile details.

Adding Soon...

---

## Contributing

Contributions are welcome! If you'd like to help improve this project, feel free to:

- 🔧 Fix bugs.
- 💡 Suggest or add new features
- 🧪 Improve design or responsiveness
- 📝 Enhance documentation

---

## 👨‍💻 Author

**Brajesh Chhekur**

📧 Email: 281092322419e@gmail.com  
If you like this project, feel free to ⭐ star it, fork it, or open an issue!
