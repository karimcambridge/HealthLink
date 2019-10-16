
const Sequelize = require('sequelize');

const db = {};
const sequelize = new Sequelize('healthlink', 'healthlink', 'x5P05C5Wtglz', {
  host: '79.137.80.128',
  dialect: 'mariadb',
  dialectOptions: {
    connectTimeout: 2000,
    timezone: 'Etc/GMT-4',
  },

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
