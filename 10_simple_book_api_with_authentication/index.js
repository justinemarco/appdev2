const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const bookRouter = require('./routers/bookRouter');
app.use('/api/books', bookRouter);

const authRoutes = require('./routers/authRouter');

const app = express();
app.use(express.json());
app.use('/api/books', bookRouter);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
