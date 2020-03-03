const express = require('express');
const router = express.Router();
const db = require('../db/db');
const uuidv1 = require('uuid/v1');

const msg = { message: 'OK' };

router.route('/testimonials').get((req, res) => {
  res.json(db.testimonials);
});

router.route('/testimonials/random').get((req, res) => {
  let random = Math.floor(Math.random()*(db.testimonials.length));
  res.json(db.testimonials[random]);
});

router.route('/testimonials/:id').get((req, res) => {
  res.json(db.testimonials[req.params.id-1]);
});

router.route('/testimonials').post((req, res) => {
  const newObject = {
    id: uuidv1(),
    author: req.body.author,
    text: 'Lorem Ipsum',
  };
  db.testimonials.push(newObject);
  res.json(msg);
});

router.route('/testimonials/:id').put((req, res) => {
  db.testimonials = db.testimonials.map(data => data.id == req.params.id? {...data, author: req.body.author, text: 'Lorem Ipsum' }: data );
  res.json(msg);
});

router.route('/testimonials/:id').delete((req, res) => {
  db.testimonials.splice(req.params.id - 1, 1);
  res.json(msg);
});

module.exports = router;