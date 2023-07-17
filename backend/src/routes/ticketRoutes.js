const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');

router.get('/', ticketController.getTickets);
router.post('/', ticketController.createTicket);
router.get('/:id', ticketController.getTicket);
router.put('/:id', ticketController.updateTicket);
router.patch('/:id', ticketController.updateTicketStatus);
router.delete('/:id', ticketController.deleteTicket);


module.exports = router;
