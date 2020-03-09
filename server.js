const express = require('express');
const cors = require('cors');
const path = require('path');
const socket = require('socket.io');

const testimonialsRoute = require('./routes/testimonials.routes');
const concertsRoute = require('./routes/concerts.routes');
const seatsRoute = require('./routes/seats.routes');

const app = express();


const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});

const io = socket(server);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/client/build')));

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use('/api', testimonialsRoute);
app.use('/api', concertsRoute);
app.use('/api', seatsRoute);


app.use((req, res) => {
  res.status(404).json({ message: 'Not found...'});
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

io.on('connection', (socket) => {
  console.log('New socket!');
});