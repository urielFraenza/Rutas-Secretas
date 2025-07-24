const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ msg: 'No token, acceso denegado' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ msg: 'Token inválido' });
  }
}

function soloJefe(req, res, next) {
  if (req.user.rol !== 'jefe') return res.status(403).json({ msg: 'Solo para jefe de ventas' });
  next();
}

module.exports = { auth, soloJefe };