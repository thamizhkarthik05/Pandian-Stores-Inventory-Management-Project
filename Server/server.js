const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const billRoutes = require('./routes/billRoutes');
const itemRoutes = require('./routes/itemRoutes');

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// 🔥 THIS LINE CREATES /api/items URL
app.use('/api/items', itemRoutes);

app.use('/api/bills', billRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
