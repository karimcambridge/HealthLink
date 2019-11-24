const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./database/db');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

const Users = require('./routes/Users');
const Patients = require('./routes/Patients');

app.use('/users', Users);
app.use('/patients', Patients);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

db.sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });
