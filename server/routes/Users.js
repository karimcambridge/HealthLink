const express = require('express');

const users = express.Router();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../models/User');

users.use(cors());

process.env.SECRET_KEY = 'secret';

users.post('/register', (req, res) => {
  const today = new Date();
  const userData = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
    created: today,
    title: req.body.title,
    role: req.body.role,
  };

  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((user) => {
      if (!user) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          userData.password = hash;
          User.create(userData)
            .then((createdUser) => {
              res.json({ status: `(${createdUser.email}) Registered!` });
            })
            .catch((authErr) => {
              res.send(`error: ${authErr}`);
            });
        });
      } else {
        res.json({ error: 'User already exists' });
      }
    })
    .catch((err) => {
      res.send(`error: ${err}`);
    });
});

users.post('/login', (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((user) => {
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          const token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
            expiresIn: 1440,
          });
          // res.send(`${user.dataValues.first_name} ${user.dataValues.last_name} has logged in with ${user.dataValues.email}.`);
          res.send(token);
        } else {
          res.send({ error: 'Invalid password' });
        }
      } else {
        res.send({ error: 'User does not exist' });
      }
    })
    .catch((err) => {
      res.status(400).json({ error: err });
    });
});

users.get('/profile', (req, res) => {
  const decoded = jwt.verify(req.headers.authorization, process.env.SECRET_KEY);

  User.findOne({
    where: {
      id: decoded.id,
    },
  })
    .then((user) => {
      if (user) {
        res.json(user);
      } else {
        res.send('User does not exist');
      }
    })
    .catch((err) => {
      res.send(`error: ${err}`);
    });
});

module.exports = users;
