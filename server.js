const express = require('express');
const cors = require('cors');
const path = require('path');

const testimonialsRoute = require('./routes/testimonials.routes');
const concertsRoute = require('./routes/concerts.routes');
const seatsRoute = require('./routes/seats.routes');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use('/api', testimonialsRoute);
app.use('/api', concertsRoute);
app.use('/api', seatsRoute);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found...'});
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});