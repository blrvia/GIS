const express = require('express');
const cors = require('cors');
const landParcelRoutes = require('./routes/landParcelRoutes');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/parcels', landParcelRoutes);

app.get('/', (req, res) => {
  res.send('Land Bank Backend Running');
});

module.exports = app;

