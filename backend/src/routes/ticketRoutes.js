// src/routes/ticketRoutes.js
const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');

router.get('/', ticketController.getTickets);
router.post('/', ticketController.createTicket);
router.put('/:id', ticketController.updateTicketStatus);

module.exports = router;
