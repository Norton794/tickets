const ticketService = require('../services/ticketService');

async function getTickets(req, res) {
  try {
    const tickets = await ticketService.getAllTickets();
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while fetching tickets' });
  }
}


async function createTicket(req, res) {
    const { title, description, status, priority, assignedTo, origin } = req.body;
    try {
      const newTicket = await ticketService.createTicket(title, description, status, priority, assignedTo, origin);
      res.json(newTicket);
    } catch (error) {
      res.status(500).json({ message: 'An error occurred while creating a ticket' });
    }
  }
  
  async function updateTicketStatus(req, res) {
    const { id } = req.params;
    const { status } = req.body;
    try {
      const updatedTicket = await ticketService.updateTicketStatus(parseInt(id), status);
      if (updatedTicket) {
        res.json(updatedTicket);
      } else {
        res.status(404).json({ message: 'Ticket not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'An error occurred while updating the ticket status' });
    }
  }
  

  async function getTickets(req, res) {
    try {
      const tickets = await ticketService.getAllTickets();
      res.json(tickets);
    } catch (error) {
      res.status(500).json({ message: 'An error occurred while fetching tickets' });
    }
  }
  
  async function createTicket(req, res) {
    const { title, description, status, priority, assignedTo, origin } = req.body;
    try {
      const newTicket = await ticketService.createTicket(title, description, status, priority, assignedTo, origin);
      res.json(newTicket);
    } catch (error) {
      res.status(500).json({ message: 'An error occurred while creating a ticket' });
    }
  }
  
  async function getTicket(req, res) {
    const { id } = req.params;
    try {
      const ticket = await ticketService.getTicketById(parseInt(id));
      if (ticket) {
        res.json(ticket);
      } else {
        res.status(404).json({ message: 'Ticket not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'An error occurred while fetching the ticket' });
    }
  }
  
  async function updateTicket(req, res) {
    const { id } = req.params;
    const { title, description, status, priority, assignedTo, origin } = req.body;
    try {
      const updatedTicket = await ticketService.updateTicket(
        parseInt(id),
        title,
        description,
        status,
        priority,
        assignedTo,
        origin
      );
      if (updatedTicket) {
        res.json(updatedTicket);
      } else {
        res.status(404).json({ message: 'Ticket not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'An error occurred while updating the ticket' });
    }
  }
  
  async function deleteTicket(req, res) {
    const { id } = req.params;
    try {
      const deleted = await ticketService.deleteTicket(parseInt(id));
      if (deleted) {
        res.json({ message: 'Ticket deleted successfully' });
      } else {
        res.status(404).json({ message: 'Ticket not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'An error occurred while deleting the ticket' });
    }
  }
  
  module.exports = {
    getTickets,
    createTicket,
    getTicket,
    updateTicket,
    updateTicketStatus,
    deleteTicket,
  };
