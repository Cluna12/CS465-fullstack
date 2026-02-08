const express = require('express');
const router = express.Router();

// import
const tripsController = require('../controllers/trips');

//define route endpoint
router
    .route("/trips")
    .get(tripsController.tripsList);
router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode);

module.exports = router;
