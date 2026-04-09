const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

const { initializeDatabase, testConnection } = require("./config/database");
const schoolRoutes = require("./routes/schoolRoutes");

const app = express();
const PORT = process.env.PORT || 3000;
const API_VERSION = process.env.API_VERSION || "v1";


app.use(helmet());
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// ============================================
// Health Check Route
// ============================================
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "School Management API is running!",
    version: API_VERSION,
    environment: process.env.NODE_ENV || "development",
    timestamp: new Date().toISOString(),
    endpoints: {
      health: "GET /health",
      addSchool: `POST /api/${API_VERSION}/addSchool`,
      listSchools: `GET /api/${API_VERSION}/listSchools?latitude={lat}&longitude={lon}`,
      getSchool: `GET /api/${API_VERSION}/school/:id`,
      deleteSchool: `DELETE /api/${API_VERSION}/school/:id`,
    },
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    status: "healthy",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    memory: process.memoryUsage(),
  });
});


// API Routes

app.use(`/api/${API_VERSION}`, schoolRoutes);


// 404 Handler

app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
    available_endpoints: {
      addSchool: `POST /api/${API_VERSION}/addSchool`,
      listSchools: `GET /api/${API_VERSION}/listSchools?latitude={lat}&longitude={lon}`,
    },
  });
});


// Global Error Handler

app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
    error: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
});


// Start Server

const startServer = async () => {
  try {
    // Initialize database and tables
    await initializeDatabase();
    await testConnection();

    // Start Express server
    app.listen(PORT, () => {
      console.log(`\n School Management API Started`);
      console.log(` Server: http://localhost:${PORT}`);
      console.log(` Environment: ${process.env.NODE_ENV || "development"}`);
      console.log(`API Base: http://localhost:${PORT}/api/${API_VERSION}`);
      console.log("\n Available Endpoints:");
      console.log(
        `   POST   http://localhost:${PORT}/api/${API_VERSION}/addSchool`
      );
      console.log(
        `   GET    http://localhost:${PORT}/api/${API_VERSION}/listSchools?latitude=XX&longitude=YY`
      );
      console.log(
        `   GET    http://localhost:${PORT}/api/${API_VERSION}/school/:id`
      );
      console.log(
        `   DELETE http://localhost:${PORT}/api/${API_VERSION}/school/:id`
      );
    });
  } catch (error) {
    console.error(" Failed to start server:", error.message);
    process.exit(1);
  }
};

// Handle unhandled promise rejections
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  process.exit(1);
});

// Handle uncaught exceptions
process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  process.exit(1);
});

startServer();

module.exports = app;