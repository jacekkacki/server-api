const Testimonial = require('../models/testimonial.model');
const msg = { message: 'OK' };
const sanitize = require('mongo-sanitize');

exports.getAll = async (req, res) => {
  try {
    res.json(await Testimonial.find({}));
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getRandom = async (req, res) => {
  try {
    const count = await Testimonial.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const tes = await Testimonial.findOne().skip(rand);
    if(!tes) res.status(404).json({ message: 'Not found' });
    else res.json(tes);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getId = async (req, res) => {
  try {
    const con = await Testimonial.findById(req.params.id);
    if(!con) res.status(404).json({ message: 'Not found' });
    else res.json(con);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.postOne = async (req, res) => {
  const { author, text } = req.body;

  const cleanAuthor = sanitize(author);
  const cleanText = sanitize(text);

  try {
    const newTestimonial = new Testimonial({
       author: cleanAuthor, text: cleanText});
    await newTestimonial.save();
    res.json(msg);
  } catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.putId = async (req, res) => {
  const { author, text } = req.body;
  try {
    const tes = await(Testimonial.findById(req.params.id));
    if(tes) {
      await Testimonial.updateOne({ _id: req.params.id }, { $set: {
         author: author, text: text}});
      res.json(await Testimonial.find());
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.deleteId = async (req, res) => {
  const { author, text } = req.body;
  try {
    const con = await(Testimonial.findById(req.params.id));
    if(con) {
      await Testimonial.deleteOne({ _id: req.params.id }, { $set: {
        author: author, text: text}},);
      res.json(await Testimonial.find());
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};