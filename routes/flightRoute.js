const express = require('express');

const router = express.Router();
const controller = require('../controllers/flightController');

router.get('/', controller.getFlights)
router.get('/:id', controller.getFlightById);
router.post('/', controller.bookFlight);
router.put('/:id', controller.updateFlight);
router.delete('/:id', controller.deleteFlight);

module.exports = router;

