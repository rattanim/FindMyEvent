const Sequelize = require('sequelize');
const db = require('../config/database');

const Event = db.define('event', {
  title: {
    type: Sequelize.STRING
  },
  details: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.STRING
  },
  notes: {
    type: Sequelize.STRING
  },
  contact_email: {
    type: Sequelize.STRING
  }
})

module.exports = Event;