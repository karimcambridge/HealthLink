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
    created: today,
    data: req.body.data,
    patient_id: req.body.patient_id,
  };
  Prescription.create(prescriptionData)
    .then((created) => {
      res.json({ status: `prescription (${created.id}) ${created.first_name} ${created.last_name} created!` });
    })
    .catch((err) => {
      res.send({ error: err });
    });
});

prescriptions.get('/get', (req, res) => {false 
  Prescription.findOne({
      where: {
        id: req.body.id,
      },
    })
    .then((prescription) => {
      //console.log(`prescription: ${JSON.stringify(prescription)}`);
      if (prescription) {
        res.json(prescription);
      } else {
        res.send({ error: 'Prescription does not exist' });
      }
    })
    .catch((err) => {
      res.send({ error: err });
    });
});

prescriptions.get('/getall', (req, res) => {
  Prescription.findAll()
    .then((results) => {
      if (results) {
        res.json(results);
      } else {
        res.send({ error: 'Getting all prescriptions error' });
      }
    })
    .catch((err) => {
      res.send({ error: err });
    });
});

module.exports = prescriptions;
