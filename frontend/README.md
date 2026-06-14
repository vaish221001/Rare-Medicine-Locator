# Rare Medicine Locator - Frontend

## Project Overview

The frontend of Rare Medicine Locator provides an easy-to-use interface for users and pharmacies to manage medicines and emergency SOS requests.

## Tech Stack

* React.js
* Vite
* Tailwind CSS
* Axios
* React Router DOM

## Folder Structure

```txt
frontend
├── public
├── src
│   ├── api
│   │   └── axios.js
│   ├── components
│   │   └── Navbar.jsx
│   ├── pages
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Dashboard.jsx
│   │   ├── SearchMedicine.jsx
│   │   ├── EmergencySOS.jsx
│   │   └── PharmacyDashboard.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── vite.config.js
└── package.json
```

## Features

* User Registration & Login
* Pharmacy Login
* Dashboard
* Medicine Search
* Emergency SOS Requests
* User-Specific Request Tracking
* Pharmacy Dashboard
* Responsive UI

## Setup

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Application Workflow

1. User registers and logs in.
2. User searches for medicine availability.
3. If unavailable, user creates an Emergency SOS request.
4. Pharmacy logs in and views requests.
5. Pharmacy accepts and reserves medicine.
6. Pharmacy completes the request after collection.
7. User tracks request status.

## Backend Connection

```js
baseURL: "https://rare-medicine-backend.onrender.com"
```

## Deployment

Frontend deployed using Vercel.
