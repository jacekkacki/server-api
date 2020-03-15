const Seat = require('../models/seat.model');
const msg = { message: 'OK' };

exports.getAll = async (req, res) => {
  try {
    res.json(await Seat.find({}));
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getId = async (req, res) => {
  try {
    const seat = await Seat.findById(req.params.id);
    if(!seat) res.status(404).json({ message: 'Not found' });
    else res.json(con);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.postOne = async (req, res) => {
  const { day, seat, client, email } = req.body;
  try {
    const newSeat = new Seat({
       day: day, seat: seat,
      client: client, email: email});
    await newSeat.save();
    res.json(msg);
  } catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.putId = async (req, res) => {
  const { day, seat, client, email } = req.body;
  try {
    const seat = await(Seat.findById(req.params.id));
    if(seat) {
      await Seat.updateOne({ _id: req.params.id }, { $set: {
         day: day, seat: seat, client: client, email: email}});
      res.json(await Seat.find());
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.deleteId = async (req, res) => {
  const { day, seat, client, email } = req.body;
  try {
    const con = await(Seat.findById(req.params.id));
    if(con) {
      await Seat.deleteOne({ _id: req.params.id }, { $set: {
        day: day, seat: seat, client: client, email: email}},);
      res.json(await Seat.find());
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};