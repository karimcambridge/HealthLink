const express = require('express');

const prescription = express.Router();
const cors = require('cors');
const Prescription = require('../models/Prescription');

prescription.use(cors());

process.env.SECRET_KEY = 'secret';

prescription.get('/:id', (req, res) => {
    Prescription.findOne({
        where: {
            id: req.query.id,
        },
    })
    .then((prescription) => {
        //console.log(`prescription: ${JSON.stringify(prescription)}`);
        if (prescription) {
            res.json(prescription);
        } else {
            res.send({ error: `Prescription ${req.body.id} does not exist` });
        }
    })
    .catch((err) => {
        res.send({ error: err });
    });
});

module.exports = prescription;
