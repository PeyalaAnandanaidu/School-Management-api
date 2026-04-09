# School Management API

A RESTful backend API built with Node.js, Express.js, and MySQL for managing school data. This project allows users to:

* Add new schools
* Store school location details
* Retrieve schools sorted by proximity to a user’s location
* Calculate geographical distance using the Haversine Formula

---

##  Tech Stack

* Node.js
* Express.js
* MySQL
* Railway (Database Hosting)
* Postman (API Testing)

---

##  Project Setup

### Prerequisites

Make sure you have installed:

* Node.js (v16 or above)
* npm
* MySQL OR Railway MySQL database

---

## ⚙️ Installation Steps

### 1. Clone Repository

```bash
https://github.com/PeyalaAnandanaidu/School-Management-api.git
cd school-management-api
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root.

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration
DB_HOST=your_database_host
DB_PORT=your_database_port
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=your_database_name

# API Configuration
API_VERSION=v1
```

### 4. Start Development Server

```bash
npm run dev
```

### 5. Start Production Server

```bash
npm start
```

---

## 🗄️ Database Schema

The application uses a `schools` table.

### Table Structure

| Column     | Type         | Description          |
| ---------- | ------------ | -------------------- |
| id         | INT          | Primary Key          |
| name       | VARCHAR(255) | School name          |
| address    | VARCHAR(500) | School address       |
| latitude   | FLOAT        | School latitude      |
| longitude  | FLOAT        | School longitude     |

---

## 📌 API Endpoints

| Method | Endpoint              | Description                      |
| ------ | --------------------- | -------------------------------- |
| GET    | `/`                   | API information                  |
| GET    | `/health`             | Health check                     |
| POST   | `/api/v1/addSchool`   | Add a new school                 |
| GET    | `/api/v1/listSchools` | List schools sorted by proximity |
| GET    | `/api/v1/school/:id`  | Get school by ID                 |
| DELETE | `/api/v1/school/:id`  | Delete school by ID              |

---

## 📥 Add School API

### Endpoint

```http
POST /api/v1/addSchool
```

### Request Body

```json
{
  "name": "ABC School",
  "address": "Vijayawada",
  "latitude": 16.5062,
  "longitude": 80.6480
}
```

### Success Response

```json
{
  "success": true,
  "message": "School added successfully",
  "data": {
    "school": {
      "id": 1,
      "name": "ABC School",
      "address": "Vijayawada",
      "latitude": 16.5062,
      "longitude": 80.648,
      "created_at": "2026-04-09T10:30:00.000Z"
    }
  }
}
```

---

## 📋 List Schools API

### Endpoint

```http
GET /api/v1/listSchools?latitude=16.5062&longitude=80.6480
```

### Success Response

```json
{
  "success": true,
  "message": "Schools retrieved and sorted by proximity successfully",
  "data": {
    "user_location": {
      "latitude": 16.5062,
      "longitude": 80.6480
    },
    "total_schools": 2,
    "schools": [
      {
        "id": 1,
        "name": "ABC School",
        "distance_km": 2.1456
      }
    ]
  }
}
```

---

## 🧮 Distance Calculation Logic

This project uses the **Haversine Formula** to calculate accurate geographical distance between:

* User coordinates
* School coordinates

### Formula

```text
a = sin²(Δlat/2) + cos(lat1) × cos(lat2) × sin²(Δlong/2)

c = 2 × atan2(√a, √(1-a))

distance = R × c
```

Where:

```text
R = 6371 km
```

(Earth’s radius)

---

## 🛡️ Features Implemented

* Input validation
* Duplicate school prevention
* Distance-based sorting
* Health monitoring endpoint
* Global error handling
* Secure middleware using Helmet
* CORS enabled
* Production-ready logging

---

## 🚀 Deployment

This API can be deployed using:

* Railway
* Render


### Deployment Notes

* Set environment variables on hosting platform
* Connect hosted MySQL database
* Deploy GitHub repository

---

## 🧪 Testing

Use Postman to test APIs.

### Recommended tests:

* Add school
* List schools
* Invalid validation
* Duplicate entries

---

## 📦 Deliverables

### Deliverable 1

GitHub source code repository

### Deliverable 2

Live deployed API endpoints

### Deliverable 3

Postman collection shared link

---

## 👨‍💻 Author

**Peyala Ananda Naidu**

Backend Developer | Node.js | Express.js | MySQL
