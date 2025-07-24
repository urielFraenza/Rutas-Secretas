require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB conectado'))
  .catch(err => console.error(err));

// Rutas
app.use('/api/auth', require('./routes/auth'));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Servidor backend en puerto ${PORT}`));