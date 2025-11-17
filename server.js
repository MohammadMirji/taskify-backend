// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { connectDB } = require('./config/db');
const authRoutes = require('./src/routes/authRoutes');
const taskRoutes = require('./src/routes/tasks.routes');

const app = express();

// --- Middleware ---
app.use(helmet());
app.use(cors());
app.use(express.json());

// --- Routes ---
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// --- Global Error Handler ---
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Server Error',
  });
});

// --- Connect to DB (for serverless) ---
let isConnected = false; // prevent DB reconnects in serverless

async function ensureDBConnection() {
  if (!isConnected) {
    await connectDB();
    isConnected = true;
  }
}

// Wrap routes to ensure DB is connected
app.use(async (req, res, next) => {
  try {
    await ensureDBConnection();
    next();
  } catch (err) {
    next(err);
  }
});

// Export the Express app (NO app.listen)
module.exports = app;
