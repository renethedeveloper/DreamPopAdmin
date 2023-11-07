// authMiddleware.js

function checkAdminRole(req, res, next) {
    if (req.user && req.user.role === 'admin') {
      // User has 'admin' role, proceed to the next middleware
      return next();
    }
    // User does not have 'admin' role, respond with an unauthorized error
    return res.status(403).json({ message: 'Unauthorized: Admin access required.' });
  }
  
  module.exports = {
    checkAdminRole,
  };
  