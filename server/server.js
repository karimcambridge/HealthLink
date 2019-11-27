const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./database/db');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

const Users = require('./routes/Users');
const Patients = require('./routes/Patients');
const Prescription = require('./routes/Prescription');
const Prescriptions = require('./routes/Prescriptions');

app.use('/users', Users);
app.use('/patients', Patients);
app.use('/prescription', Prescription);
app.use('/prescriptions', Prescriptions);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}.`);
});

db.sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database: ', err);
  });
