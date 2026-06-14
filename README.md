# Rare Medicine Locator

## Project Overview

Rare Medicine Locator is a full-stack MERN application designed to help patients quickly locate medicines and raise emergency SOS requests when medicines are unavailable. Pharmacies can manage inventory, respond to SOS requests, reserve medicines, and mark requests as completed.

The system aims to reduce delays in obtaining critical medicines during emergencies.

---

## Features

### User Features

* User Registration and Login
* Search Available Medicines
* Create Emergency SOS Requests
* View Personal SOS Requests
* Track Request Status

### Pharmacy Features

* Pharmacy Registration and Login
* Add Medicines to Inventory
* View Emergency SOS Requests
* Accept Requests
* Reserve Medicines for 20 Minutes
* Complete Requests

### System Features

* JWT Authentication
* Role-Based Access Control
* User-Specific SOS Tracking
* Real-Time Request Status Updates
* Responsive Dashboard
* Cloud Deployment

---

## Tech Stack

### Frontend

* React.js
* Vite
* Tailwind CSS
* Axios
* React Router DOM

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT Authentication
* bcryptjs

### Deployment

* Frontend: Vercel
* Backend: Render
* Database: MongoDB Atlas

---

## Project Structure

```txt
Rare-Medicine-Locator
│
├── frontend
│   ├── src
│   │   ├── api
│   │   ├── components
│   │   ├── pages
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── backend
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## Application Workflow

### User Flow

1. Register/Login
2. Search Medicine
3. Create SOS Request if medicine is unavailable
4. Track SOS Request Status

### Pharmacy Flow

1. Login
2. Add Medicines
3. View SOS Requests
4. Accept Request
5. Reserve Medicine
6. Complete Request

---

## Installation

### Clone Repository

```bash
git clone https://github.com/vaish221001/Rare-Medicine-Locator.git
```

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## Environment Variables

Create a `.env` file inside backend folder:

```env
PORT=5000
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_secret_key
FRONTEND_URL=your_frontend_url
```

---

## Deployment Links

### Frontend

https://rare-medicine-locator-three.vercel.app

### Backend

https://rare-medicine-backend.onrender.com

---

## Unique Feature

The project includes an Emergency SOS Medicine Reservation System where patients can raise urgent requests and pharmacies can reserve medicines for 20 minutes before collection.

---

## Future Enhancements

* GPS-based Pharmacy Search
* Medicine Availability Notifications
* Home Delivery Support
* Real-Time Chat
* Hospital Integration
* AI-Based Medicine Suggestions

---

## Developed By

K. Vaishnavi Goud

B.Tech Computer Science Engineering

Rare Medicine Locator - MERN Stack Project
