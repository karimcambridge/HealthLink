const express = require('express');

const patients = express.Router();
const cors = require('cors');
const Patient = require('../models/Patient');

patients.use(cors());

process.env.SECRET_KEY = 'secret';

patients.post('/create', (req, res) => {
  const today = new Date();
  const patientData = {
    created: today,
    national_id: req.body.national_id,
    title: req.body.title,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    dob: req.body.dob,
    contact_information: req.body.contact_information,
    address: req.body.address,
  };

  Patient.findOne({
    where: {
      national_id: req.body.national_id,
    },
  })
    .then((patient) => {
      if (!patient) {
        Patient.create(patientData)
          .then((createdPatient) => {
            res.json({ status: `${createdPatient.first_name} ${createdPatient.last_name} (${createdPatient.national_id}) created!` });
          })
          .catch((authErr) => {
            res.send(`error: ${authErr}`);
          });
      } else {
        res.json({ error: 'patient already exists' });
      }
    })
    .catch((err) => {
      res.send(`error: ${err}`);
    });
});

patients.get('/get', (req, res) => {
  Patient.findOne({
    where: {
      id: req.body.id,
    },
  })
    .then((patient) => {
      if (patient) {
        res.json(patient);
      } else {
        res.send({ error: 'Patient does not exist' });
      }
    })
    .catch((err) => {
      res.send(`error: ${err}`);
    });
});

patients.get('/getall', (req, res) => {
  Patient.findAll()
    .then((results) => {
      if (results) {
        res.json(results);
      } else {
        res.send({ error: 'Getting all patients error' });
      }
    })
    .catch((err) => {
      res.send(`error: ${err}`);
    });
});

module.exports = patients;
