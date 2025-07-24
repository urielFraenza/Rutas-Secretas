const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { auth, soloJefe } = require('../middleware/auth');

// Registro de cliente
router.post('/register', async (req, res) => {
  const { nombre, correo, password } = req.body;
  try {
    const existe = await User.findOne({ correo });
    if (existe) return res.status(400).json({ msg: 'Correo ya registrado' });
    const user = new User({ nombre, correo, password, rol: 'cliente' });
    await user.save();
    res.json({ msg: 'Usuario registrado' });
  } catch (err) {
    res.status(500).json({ msg: 'Error en el servidor' });
  }
});

// Login (cliente o jefe)
router.post('/login', async (req, res) => {
  const { correo, password } = req.body;
  try {
    const user = await User.findOne({ correo });
    if (!user) return res.status(400).json({ msg: 'Usuario no encontrado' });
    const ok = await user.compararPassword(password);
    if (!ok) return res.status(400).json({ msg: 'Contraseña incorrecta' });
    const token = jwt.sign(
      { id: user._id, rol: user.rol, nombre: user.nombre },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );
    res.json({ token, rol: user.rol, nombre: user.nombre });
  } catch (err) {
    res.status(500).json({ msg: 'Error en el servidor' });
  }
});

// Ruta protegida solo para jefe de ventas
router.get('/jefe', auth, soloJefe, (req, res) => {
  res.json({ msg: 'Bienvenido jefe de ventas' });
});

module.exports = router;