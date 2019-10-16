
const Sequelize = require('sequelize');

const db = {};
const sequelize = new Sequelize('healthlink', 'healthlink', 'x5P05C5Wtglz', {
  host: 'localhost',
  dialect: 'mariadb',
  dialectOptions: { connectTimeout: 1000 }, // mariadb connector option
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
