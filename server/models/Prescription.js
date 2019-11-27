const Sequelize = require('sequelize');
const db = require('../database/db.js');

module.exports = db.sequelize.define(
    'prescriptions',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        created: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
        },
        data: {
            type: Sequelize.STRING,
        },
        patient_id: {
            allowNull: true,
            type: Sequelize.INTEGER,
        },
    }, 
    {
        timestamps: false,
    },
);
