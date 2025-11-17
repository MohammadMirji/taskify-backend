const mongoose = require('mongoose');

let isConnected = false; // track connection state for Vercel serverless

const connectDB = async () => {
  if (isConnected) {
    return; // Use existing connection
  }

  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = conn.connections[0].readyState === 1;

    console.log('MongoDB connected:', conn.connection.host);
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    throw new Error('Database connection failed');
  }
};

module.exports = { connectDB };
