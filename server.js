require('dotenv').config(); 

const express = require('express');
const path = require('path');
const connectDB = require('./config/connection');
const userRoutes = require('./routes/api/userRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

// Routes
app.use('/api/users', userRoutes);

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// Test route
app.get('/', (req, res) => res.send('Server is running!'));

// Database connection

// Start server
app.listen(PORT, () => console.log(`🌍 Server listening on port ${PORT}`));