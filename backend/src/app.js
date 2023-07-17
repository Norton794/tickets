// src/app.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const ticketRoutes = require('./routes/ticketRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(cors());

app.use('/api/tickets', ticketRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
