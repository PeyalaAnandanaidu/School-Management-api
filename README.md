# 🏫 School Management API

A RESTful API built with Node.js, Express.js, and MySQL for managing school data
with proximity-based sorting using the Haversine Formula.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16+)
- MySQL (v8.0+)
- npm or yarn

### Installation

# Clone the repository
git clone https://github.com/yourusername/school-management-api.git
cd school-management-api

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your database credentials

# Start development server
npm run dev

# Start production server
npm start

## 📌 API Endpoints

| Method | Endpoint                    | Description                    |
|--------|-----------------------------|--------------------------------|
| GET    | /                           | API Info                       |
| GET    | /health                     | Health Check                   |
| POST   | /api/v1/addSchool           | Add a new school               |
| GET    | /api/v1/listSchools         | List schools by proximity      |
| GET    | /api/v1/school/:id          | Get school by ID               |
| DELETE | /api/v1/school/:id          | Delete school by ID            |

## 📥 Add School

POST /api/v1/addSchool

Request Body:
{
  "name": "Delhi Public School",
  "address": "Sector 45, Gurugram, Haryana",
  "latitude": 28.4089,
  "longitude": 77.0320
}

Success Response (201):
{
  "success": true,
  "message": "School added successfully",
  "data": {
    "school": {
      "id": 1,
      "name": "Delhi Public School",
      "address": "Sector 45, Gurugram, Haryana",
      "latitude": 28.4089,
      "longitude": 77.032,
      "created_at": "2024-01-15T10:30:00.000Z"
    }
  }
}

## 📋 List Schools

GET /api/v1/listSchools?latitude=28.4595&longitude=77.0266

Success Response (200):
{
  "success": true,
  "message": "Schools retrieved and sorted by proximity successfully",
  "data": {
    "user_location": {
      "latitude": 28.4595,
      "longitude": 77.0266
    },
    "total_schools": 5,
    "schools": [
      {
        "id": 2,
        "name": "Nearest School",
        "distance_km": 0.5
      }
    ]
  }
}

## 🧮 Distance Calculation

Uses the **Haversine Formula** for accurate geographical distance:

a = sin²(Δlat/2) + cos(lat1) × cos(lat2) × sin²(Δlong/2)
distance = 2R × atan2(√a, √(1-a))

Where R = 6371 km (Earth's radius)

## 🚀 Deployment (Railway/Render/Heroku)

1. Set environment variables on hosting platform
2. Ensure MySQL database is accessible
3. Deploy from GitHub repository