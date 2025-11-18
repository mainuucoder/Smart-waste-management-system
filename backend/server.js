

const connectDB = async () => {
  try {
    // HARDCODE your actual MongoDB URI here for testing
    const mongoURI = 'mongodb+srv://smart_waste_user:mongodbuser2020@wasteadmin.emz9rfc.mongodb.net/smart-waste-management?retryWrites=true&w=majority';
    
    console.log('Using URI:', mongoURI);
    
    const conn = await mongoose.connect(mongoURI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

connectDB();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Set development mode explicitly
process.env.NODE_ENV = 'development';

// EXTENSIVE ENVIRONMENT DEBUGGING
console.log('🔧 ===== DEVELOPMENT SERVER DEBUG =====');
console.log('🔧 PORT:', process.env.PORT);
console.log('🔧 NODE_ENV:', process.env.NODE_ENV);
console.log('🔧 MONGO_URI:', process.env.MONGO_URI ? 'PRESENT' : 'MISSING');
console.log('🔧 JWT_SECRET:', process.env.JWT_SECRET ? `PRESENT (${process.env.JWT_SECRET.length} chars)` : 'MISSING');
console.log('🔧 ===== END DEBUG =====');

const app = express();

// Development-friendly CORS configuration
app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:5173", "http://127.0.0.1:5173"],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// IMPORTANT: Parse JSON BEFORE logging
app.use(express.json());

// Enhanced logging middleware for development
app.use((req, res, next) => {
  console.log(`📝 ${new Date().toISOString()} - ${req.method} ${req.path}`);
  console.log(`   Query:`, req.query);
  console.log(`   Body:`, req.body);
  next();
});

// MongoDB Connection with development options
const connectDB = async () => {
  try {
    console.log('🔗 Attempting to connect to MongoDB...');
    
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      bufferCommands: false,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    console.log('💡 Development Tips:');
    console.log('   - Check if MongoDB Compass can connect to the same URI');
    console.log('   - Verify MONGO_URI in .env file');
    console.log('   - Check network connectivity');
    process.exit(1);
  }
};

// Connect to MongoDB
connectDB();

// MongoDB connection events with detailed logging
mongoose.connection.on('connected', () => {
  console.log('✅ Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.log('❌ Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('⚠️  Mongoose disconnected from MongoDB');
});

// Debug route imports
console.log('🔍 Checking route imports...');

try {
  const userRoutes = require('./routes/userRoutes');
  console.log('✅ userRoutes loaded successfully');
  
  const reportRoutes = require('./routes/reportRoutes');
  console.log('✅ reportRoutes loaded successfully');
  
  // Use routes
  app.use('/api/users', userRoutes);
  app.use('/api/reports', reportRoutes);

  console.log('✅ Core routes mounted successfully');

} catch (error) {
  console.log('❌ Error importing routes:', error.message);
  console.log('💡 Stack trace:', error.stack);
}

/// Try to load optional routes
try {
  const scheduleRoutes = require('./routes/scheduleRoutes');
  app.use('/api/schedules', scheduleRoutes);
  console.log('✅ schedules routes loaded successfully');
} catch (error) {
  console.log('❌ SCHEDULES ROUTES FAILED TO LOAD:', error.message);
  console.log('💡 Check if file exists: routes/scheduleRoutes.js');
  console.log('💡 Error details:', error.stack);
}
try {
  const adminRoutes = require('./routes/adminRoutes');
  app.use('/api/admin', adminRoutes);
  console.log('✅ adminRoutes loaded successfully');
} catch (error) {
  console.log('⚠️  adminRoutes not available:', error.message);
}

// Enhanced test MongoDB connection route
app.get('/api/test-db', (req, res) => {
  const isConnected = mongoose.connection.readyState === 1;
  
  if (isConnected) {
    res.json({ 
      message: 'MongoDB is connected!',
      environment: 'development',
      connection: {
        host: mongoose.connection.host,
        database: mongoose.connection.name,
        readyState: mongoose.connection.readyState,
        models: Object.keys(mongoose.connection.models),
        collections: Object.keys(mongoose.connection.collections)
      },
      timestamp: new Date().toISOString()
    });
  } else {
    res.status(500).json({ 
      error: 'MongoDB is not connected',
      environment: 'development',
      readyState: mongoose.connection.readyState,
      readyStateMeaning: getReadyStateMeaning(mongoose.connection.readyState)
    });
  }
});

// Helper function for MongoDB ready state
function getReadyStateMeaning(state) {
  const states = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting'
  };
  return states[state] || 'unknown';
}

// Development health check route with detailed info
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    environment: 'development',
    timestamp: new Date().toISOString(),
    database: {
      status: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
      readyState: mongoose.connection.readyState,
      host: mongoose.connection.host,
      name: mongoose.connection.name
    },
    memory: process.memoryUsage(),
    uptime: process.uptime()
  });
});

// Development-only routes
app.get('/api/debug', (req, res) => {
  res.json({
    environment: process.env.NODE_ENV,
    nodeVersion: process.version,
    platform: process.platform,
    memory: process.memoryUsage(),
    uptime: process.uptime(),
    database: {
      readyState: mongoose.connection.readyState,
      models: Object.keys(mongoose.connection.models),
      collections: Object.keys(mongoose.connection.collections || {})
    }
  });
});

// Basic test route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Development Server is working! by mainuu',
    environment: 'development',
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
    timestamp: new Date().toISOString()
  });
});

// Development error handler (more verbose)
app.use((err, req, res, next) => {
  console.error('💥 Development Error Stack:', err.stack);
  res.status(500).json({
    error: 'Development Server Error',
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    path: req.path,
    method: req.method
  });
});

// 404 handler for development
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route not found',
    path: req.originalUrl,
    method: req.method,
    availableRoutes: [
      '/',
      '/health',
      '/api/debug',
      '/api/test-db',
      '/api/users/*',
      '/api/reports/*',
      '/api/schedule/* (if available)',
      '/api/admin/* (if available)'
    ]
  });
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 DEVELOPMENT Server running on port ${PORT}`);
  console.log(`🌐 Environment: ${process.env.NODE_ENV}`);
  console.log(`📊 MongoDB Status: ${mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/health`);
  console.log(`🔗 API test: http://localhost:${PORT}/api/test-db`);
  console.log(`🔗 Debug info: http://localhost:${PORT}/api/debug`);
});