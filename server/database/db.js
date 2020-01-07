
const Sequelize = require('sequelize');

const db = {};
const sequelize = new Sequelize('database', 'username', 'password', {
  host: '127.0.0.1',
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
