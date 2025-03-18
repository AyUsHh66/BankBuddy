const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Initialize express
const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/loans', require('./routes/loanRoutes'));
app.use('/api/documents', require('./routes/documentRoutes'));
app.use('/api/videos', require('./routes/videoRoutes'));

// Basic route
app.get('/', (req, res) => {
  res.send('BankBuddy API is running');
});

// Server setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});