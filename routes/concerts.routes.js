const express = require('express');
const router = express.Router();
const db = require('../db/db');
const uuidv1 = require('uuid/v1');

const msg = { message: 'OK' };

router.route('/concerts').get((req, res) => {
  res.json(db.concerts);
});

router.route('/concerts/:id').get((req, res) => {
  res.json(db.concerts[`${req.params.id}`-1]);
});

router.route('/concerts').post((req, res) => {
  const newObject = {
    id: uuidv1(),
    performer: req.body.performer,
    genre: req.body.genre,
    price: req.body.price,
    day: req.body.day,
    image: req.body.image,
  };
  db.concerts.push(newObject);
  res.json(msg);
});

router.route('/concerts/:id').put((req, res) => {
  db.concerts = db.concerts.map(data =>
     data.id == `${req.params.id}`?
     {...data, performer: req.body.performer, genre: req.body.genre,
     price: req.body.price, day: req.body.day, image: req.body.image}: data );
  res.json(msg);
});

router.route('/concerts/:id').delete((req, res) => {
  db.concerts.splice(`${req.params.id}`-1, 1);
  res.json(msg);
});

module.exports = router;