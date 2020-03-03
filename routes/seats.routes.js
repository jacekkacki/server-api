const express = require('express');
const router = express.Router();
const db = require('../db/db');
const uuidv1 = require('uuid/v1');


const msg = { message: 'OK' };

router.route('/seats').get((req, res) => {
  res.json(db.seats);
});

router.route('/seats/:id').get((req, res) => {
  res.json(db.seats[req.params.id - 1]);
});

router.route('/seats').post((req, res) => {
  const newObject = {
    id: uuidv1(),
    day: req.body.day,
    seat: req.body.seat,
    client: req.body.client,
    email: req.body.email,
  };
  if(!db.seats.some(data => data.day === req.body.day && data.seat === req.body.seat)) {
    db.seats.push(newObject);
    res.json(msg);
  } else {
    res.json({ message: 'The slot is already taken...'});
  };
});

router.route('/seats/:id').put((req, res) => {
  db.seats = db.seats.map(data =>
     data.id == req.params.id?
     {...data, day: req.body.day, seat: req.body.seat,
     client: req.body.client, email: req.body.email}: data );
  res.json(msg);
});

router.route('/seats/:id').delete((req, res) => {
  db.seats.splice(req.params.id - 1, 1);
  res.json(msg);
});

module.exports = router;