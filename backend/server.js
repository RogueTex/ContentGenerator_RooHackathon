require('dotenv').config();
const express = require('express');
const cors = require('cors');
const contentRoutes = require('./routes/contentRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/content', contentRoutes);

app.get('/', (req, res) => {
  res.send('AI Content Generator Backend is running!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});