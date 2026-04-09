# School Management API

A RESTful backend API built with Node.js, Express.js, and MySQL for managing school data.

This project allows users to:

* Add new schools
* Store school location details
* Retrieve schools sorted by proximity to a user’s location
* Calculate geographical distance using the Haversine Formula

---

##  Live Deployment

**Render Live URL:**
https://school-management-api-z4qa.onrender.com

---

##  Postman Collection

**Shared Postman Workspace:**
https://martian-shuttle-450060.postman.co/workspace/Team-Workspace~c4fdb5f4-59e1-4b39-8dde-f2a6e0c5907a/collection/43064851-1f6d6432-1995-4746-a650-c2c206a223b4?action=share&source=copy-link&creator=43064851

---

##  Tech Stack

* Node.js
* Express.js
* MySQL
* Railway (Database Hosting)
* Render (API Hosting)
* Postman (API Testing)

---

##  Project Setup

### Prerequisites

Make sure you have installed:

* Node.js (v16 or above)
* npm
* MySQL OR Railway MySQL database

---

##  Installation Steps

### 1. Clone Repository

```bash
git clone https://github.com/PeyalaAnandanaidu/School-Management-api.git
cd School-Management-api
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

##  Database Schema

The application uses a `schools` table.

### Table Structure

| Column    | Type         | Description      |
| --------- | ------------ | ---------------- |
| id        | INT          | Primary Key      |
| name      | VARCHAR(255) | School name      |
| address   | VARCHAR(500) | School address   |
| latitude  | FLOAT        | School latitude  |
| longitude | FLOAT        | School longitude |

---

##  API Endpoints

| Method | Endpoint              | Description                      |
| ------ | --------------------- | -------------------------------- |
| GET    | `/`                   | API information                  |
| GET    | `/health`             | Health check                     |
| POST   | `/api/v1/addSchool`   | Add a new school                 |
| GET    | `/api/v1/listSchools` | List schools sorted by proximity |
| GET    | `/api/v1/school/:id`  | Get school by ID                 |
| DELETE | `/api/v1/school/:id`  | Delete school by ID              |

---

##  Add School API

### Endpoint

```http
POST https://school-management-api-z4qa.onrender.com/api/v1/addSchool
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

##  List Schools API

### Endpoint

```http
GET https://school-management-api-z4qa.onrender.com/api/v1/listSchools?latitude=16.5062&longitude=80.6480
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

##  Distance Calculation Logic

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

##  Features Implemented

* Input validation
* Duplicate school prevention
* Distance-based sorting
* Health monitoring endpoint
* Global error handling
* Secure middleware using Helmet
* CORS enabled
* Production-ready logging

---

##  Testing

Use Postman to test APIs.

### Recommended tests:

* Add school
* List schools
* Invalid validation
* Duplicate entries

---

##  Deliverables

### Deliverable 1

[GitHub source code repository]
(https://github.com/PeyalaAnandanaidu/School-Management-api.git)

### Deliverable 2

Live deployed API endpoints
https://school-management-api-z4qa.onrender.com

### Deliverable 3

Postman collection shared link
https://martian-shuttle-450060.postman.co/workspace/Team-Workspace~c4fdb5f4-59e1-4b39-8dde-f2a6e0c5907a/collection/43064851-1f6d6432-1995-4746-a650-c2c206a223b4?action=share&source=copy-link&creator=43064851

---

##  Author

**Peyala Ananda Naidu**

Backend Developer | Node.js | Express.js | MySQL
