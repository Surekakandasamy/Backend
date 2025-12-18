const express = require('express');
const app = express();
const PORT = process.env.PORT || 10000;

app.get('/', (req, res) => {
  res.json({ message: 'API is working!', status: 'OK' });
});

app.get('/test', (req, res) => {
  res.json({ message: 'Test endpoint working!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});