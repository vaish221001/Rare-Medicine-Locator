# Rare Medicine Locator - Backend

## Project Overview

The backend of Rare Medicine Locator is responsible for authentication, medicine management, emergency SOS handling, and database operations. It provides secure APIs for users and pharmacies.

## Tech Stack

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT Authentication
* bcryptjs

## Folder Structure

```txt
backend
├── config
│   └── db.js
├── controllers
│   ├── authController.js
│   ├── medicineController.js
│   └── emergencyController.js
├── middleware
│   ├── authMiddleware.js
│   └── roleMiddleware.js
├── models
│   ├── User.js
│   ├── Medicine.js
│   └── EmergencyRequest.js
├── routes
│   ├── authRoutes.js
│   ├── medicineRoutes.js
│   └── emergencyRoutes.js
├── .env
├── server.js
└── package.json
```

## Features

* User & Pharmacy Registration
* Login with JWT Authentication
* Role-Based Access Control
* Medicine Inventory Management
* Emergency SOS Requests
* Medicine Reservation System
* User-Specific SOS Tracking

## Setup

```bash
npm install
npm run dev
```

## Environment Variables

```env
PORT=5000
MONGO_URL=your_mongodb_url
JWT_SECRET=your_secret_key
FRONTEND_URL=your_frontend_url
```

## Main API Routes

### Authentication

* POST /auth/register
* POST /auth/login

### Medicines

* POST /medicines/add
* GET /medicines/all
* GET /medicines/search

### Emergency SOS

* POST /emergency/create
* GET /emergency/my-requests
* GET /emergency/all
* PUT /emergency/accept/:id
* PUT /emergency/reserve/:id
* PUT /emergency/complete/:id

## Deployment

Backend deployed using Render.
