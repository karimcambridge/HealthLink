const express = require('express');

const prescriptions = express.Router();
const cors = require('cors');
const Prescription = require('../models/Prescription');

prescriptions.use(cors());

process.env.SECRET_KEY = 'secret';

prescriptions.post('/create', (req, res) => {
  const today = new Date();
  const prescriptionData = {
    id: null,
    data: null,
    created: today,
  };
});

prescriptions.get('/get', (req, res) => {
  Prescription.findOne({
    where: {
      id: req.body.id,
    },
  })
    .then((prescription) => {
      if (prescription) {
        res.json(prescription);
      } else {
        res.send({ error: 'Prescription does not exist' });
      }
    })
    .catch((err) => {
      res.send(`error: ${err}`);
    });
});

module.exports = prescriptions;
