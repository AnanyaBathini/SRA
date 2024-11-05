// authMiddleware.js
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_jwt_secret';

const authenticate = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(403).json({ message: 'Access denied' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

const isAdmin = (req, res, next) => {
  authenticate(req, res, () => {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }
    next();
  });
};

module.exports = { authenticate, isAdmin };


// // authMiddleware.js
// const isAdmin = (req, res, next) => {
//     if (req.user && req.user.role === 'admin') {
//       next();
//     } else {
//       res.status(403).json({ message: 'Access denied. Admins only.' });
//     }
//   };
  
//   module.exports = { isAdmin };
  