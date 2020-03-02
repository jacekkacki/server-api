const express = require('express');
const cors = require('cors');
const uuidv1 = require('uuid/v1');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

let db = [
  { id: 1, author: 'John Doe', text: 'This company is worth every coin!' },
  { id: 2, author: 'Amanda Doe', text: 'They really know how to make you happy.' },
  { id: 3, author: 'Andrew Smith', text: 'The measure of our success is a satisfied customer.' },
];

const msg = { message: 'OK' };

app.get('/testimonials', (req, res) => {
  res.json(db);
});

app.get('/testimonials/random', (req, res) => {
  let random = Math.floor(Math.random()*(db.length));
  res.json(db[random]);
});

app.get('/testimonials/:id', (req, res) => {
  res.json(db[`${req.params.id}`-1]);
});

app.post('/testimonials', (req, res) => {
  const newObject = {
    id: uuidv1(),
    author: req.body.author,
    text: 'Lorem Ipsum',
  };
  db.push(newObject);
  res.json(msg);
});

app.put('/testimonials/:id', (req, res) => {
  db = db.map(data => data.id == `${req.params.id}`? {...data, author: req.body.author, text: 'Lorem Ipsum' }: data );
  res.json(msg);
});

app.delete('/testimonials/:id', (req, res) => {
  db.splice(`${req.params.id}`-1, 1);
  res.json(msg);
});

app.use((req, res) => {
  res.status(404).json({ message: 'Not found...'});
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});