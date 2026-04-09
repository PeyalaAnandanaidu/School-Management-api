const mysql2 = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

// Create MySQL Connection Pool
const pool = mysql2.createPool({
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "school_management",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

// Promisify pool for async/await usage
const promisePool = pool.promise();

// Function to initialize database and create tables
const initializeDatabase = async () => {
  try {
    // First, create database if it doesn't exist
    const tempPool = mysql2
      .createPool({
        host: process.env.DB_HOST || "localhost",
        port: process.env.DB_PORT || 3306,
        user: process.env.DB_USER || "root",
        password: process.env.DB_PASSWORD || "",
        waitForConnections: true,
        connectionLimit: 1,
      })
      .promise();

    await tempPool.execute(
      `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME || "school_management"}`
    );

    console.log(
      `Database '${process.env.DB_NAME || "school_management"}' ready`
    );

    // Create schools table if it doesn't exist
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS schools (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        address VARCHAR(500) NOT NULL,
        latitude FLOAT NOT NULL,
        longitude FLOAT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_latitude (latitude),
        INDEX idx_longitude (longitude)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `;

    await promisePool.execute(createTableQuery);
    console.log(" Schools table ready");

    return true;
  } catch (error) {
    console.error(" Database initialization failed:", error.message);
    throw error;
  }
};

// Test database connection
const testConnection = async () => {
  try {
    const connection = await promisePool.getConnection();
    console.log(" MySQL Database connected successfully");
    connection.release();
    return true;
  } catch (error) {
    console.error(" Database connection failed:", error.message);
    throw error;
  }
};

module.exports = {
  pool: promisePool,
  initializeDatabase,
  testConnection,
};