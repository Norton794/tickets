const express = require('express');
const cors = require('cors');
const ticketRoutes = require('./routes/ticketRoutes');
const departmentRoutes = require('./routes/departmentRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
//app.use(cors());

app.use('/api/tickets', ticketRoutes);
app.use('/api/departments', departmentRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
