# Course Selling Platform

A full-stack MERN application that provides a complete platform for users to browse, purchase, and access courses, with a separate, secure admin panel for course management.

[![Course Selling App Demo](https://i.ytimg.com/vi/v7IVd8er5aI/maxresdefault.jpg)](https://youtu.be/v7IVd8er5aI)
> *Click the thumbnail above to watch the video demo.*

---

## ✨ Key Features

### User Features
- **User Authentication:** Secure sign-up and sign-in functionality for users.
- **Browse Courses:** View all available courses fetched directly from the backend.
- **Shopping Cart:** Add/remove courses and manage quantities. Cart data persists using local storage.
- **My Purchases:** A dedicated page to view all courses purchased by the logged-in user.
- **User Profile:** View your profile information.
- **Settings:** A comprehensive settings page with options for profile updates, password changes, and notifications.
- **Responsive Design:** A modern, clean UI that works seamlessly across all devices.

### Admin Features
- **Separate Admin Panel:** A completely separate and secure area for administrators.
- **Secure Admin Signup:** New admin registrations are protected by a secret key.
- **Admin Sign-in:** Dedicated authentication for admins.
- **Course Management:** Admins can easily add new courses to the platform via a dashboard.

---

## 🛠️ Technologies Used

- **Frontend:**
  - **React.js:** For building the user interface.
  - **Vite:** As the blazing-fast frontend build tool.
  - **Tailwind CSS:** For modern and responsive styling.
  - **React Router:** For client-side routing and navigation.

- **Backend:**
  - **Node.js & Express.js:** For building the server-side API.
  - **MongoDB:** As the primary NoSQL database.
  - **Mongoose:** As the Object Data Modeling (ODM) library for MongoDB.
  - **JSON Web Tokens (JWT):** For securing user and admin authentication.
  - **bcrypt:** For hashing user passwords.
  - **Zod:** For robust schema validation.

---

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.x or later recommended)
- [MongoDB](https://www.mongodb.com/try/download/community) (or a MongoDB Atlas cloud instance)

### 1. Clone the Repository
```sh
git clone https://github.com/iakshkhurana/course-selling-app.git
cd course-selling-app
```

### 2. Set Up Environment Variables

In the `backend` directory, create a `.env` file and add the following required variables. Your server will not start without this file.

```env
# /backend/.env

# Your MongoDB connection string
MONGO_URL="mongodb+srv://<username>:<password>@cluster.mongodb.net/your_db_name"

# JWT secrets (replace with your own long, random strings)
JWT_USER_PASSWORD="your_user_secret"
JWT_ADMIN_PASSWORD="your_admin_secret"

# The secret key required for new admin signups
ADMIN_SECRET_KEY="course-sellerx"
```

### 3. Install Dependencies & Run the App

This project requires two terminals to run both the frontend and backend servers simultaneously.

**In Terminal 1 (run the backend):**
```sh
# Navigate to the backend folder
cd backend

# Install dependencies
npm install

# Start the server
node index.js
```
> The backend will be running on `http://localhost:3000`.

**In Terminal 2 (run the frontend):**
```sh
# Navigate to the frontend folder
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```
> The frontend will be running on a port like `http://localhost:5173`.
