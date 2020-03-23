const Concert = require('../models/concert.model');
const msg = { message: 'OK' };
const sanitize = require('mongo-sanitize');

exports.getAll = async (req, res) => {
  try {
    res.json(await Concert.find({}));
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getId = async (req, res) => {
  try {
    const con = await Concert.findById(req.params.id);
    if(!con) res.status(404).json({ message: 'Not found' });
    else res.json(con);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.postOne = async (req, res) => {
  const { performer, genre, price, day, image } = req.body;

  const cleanPerformer = sanitize(performer);
  const cleanGenre = sanitize(genre);
  const cleanPrice = sanitize(price);
  const cleanDay = sanitize(day);
  const cleanImage = sanitize(image);
  
  try {
    const newConcert = new Concert({
       performer: cleanPerformer, genre: cleanGenre,
       price: cleanPrice, day: cleanDay, image: cleanImage});
    await newConcert.save();
    res.json(msg);
  } catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.putId = async (req, res) => {
  const { performer, genre, price, day, image } = req.body;
  try {
    const con = await(Concert.findById(req.params.id));
    if(con) {
      await Concert.updateOne({ _id: req.params.id }, { $set: {
         performer: performer, genre: genre,
        price: price, day: day, image: image }});
      res.json(await Concert.find());
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.deleteId = async (req, res) => {
  const { performer, genre, price, day, image } = req.body;
  try {
    const con = await(Concert.findById(req.params.id));
    if(con) {
      await Concert.deleteOne({ _id: req.params.id }, { $set: {
        performer: performer, genre: genre,
      price: price, day: day, image: image }},);
      res.json(await Concert.find());
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};