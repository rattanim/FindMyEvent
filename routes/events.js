const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Event = require('../models/Event');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// Get event list
router.get('/', (req, res) => 
  Event.findAll()
    .then(events => res.render('events', {
        events
      }))
    .catch(err => console.log(err)));

// Display add event form
router.get('/add', (req, res) => res.render('add'));

// Add a event
router.post('/add', (req, res) => {
  let { title, notes, details, description, contact_email } = req.body;
  let errors = [];

  // Validate Fields
  if(!title) {
    errors.push({ text: 'Please add a title' });
  }
  if(!notes) {
    errors.push({ text: 'Please add some notes' });
  }
  if(!description) {
    errors.push({ text: 'Please add a description' });
  }
  if(!contact_email) {
    errors.push({ text: 'Please add a contact email' });
  }

  // Check for errors
  if(errors.length > 0) {
    res.render('add', {
      errors,
      title, 
      notes, 
      details, 
      description, 
      contact_email
    });
  } else {
    if(!details) {
      details = 'Unknown';
    } else {
      details = `${details}`;
    }

    // Make lowercase and remove space after comma
    notes = notes.toLowerCase().replace(/, /g, ',');

    // Insert into table
    Event.create({
      title,
      notes,
      description,
      details,
      contact_email
    })
      .then(event => res.redirect('/events'))
      .catch(err => console.log(err));
  }
});

// Search for events
router.get('/search', (req, res) => {
  let { term } = req.query;

  // Make lowercase
  term = term.toLowerCase();

  Event.findAll({ where: { notes: { [Op.like]: '%' + term + '%' } } })
    .then(events => res.render('events', { events }))
    .catch(err => console.log(err));
});

module.exports = router;