const models = require('../models');

const { Domo } = models;

const makerPage = (req, res) => res.render('app');

const makeDomo = async (req, res) => {
  if (!req.body.name || !req.body.age || !req.body.situps) {
    return res.status(400).json({ error: 'All fields are needed!' });
  }

  const domoData = {
    name: req.body.name,
    age: req.body.age,
    situps: req.body.situps,
    owner: req.session.account._id,
  };

  console.log(domoData);

  try {
    const newDomo = new Domo(domoData);
    await newDomo.save();
    return res.status(201).json({ name: newDomo.name, age: newDomo.age, situps: newDomo.situps});
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Domo already exists!' });
    }
    return res.status(500).json({ error: 'An error occurred making domo!' });
  }
};

const getDomos = async (req, res) => {
  try {
    const query = { owner: req.session.account._id };
    const docs = await Domo.find(query).select('name age situps').lean().exec();

    return res.json({ domos: docs });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Error retrieving domos!' });
  }
};

module.exports = {
  makerPage,
  makeDomo,
  getDomos,
};
