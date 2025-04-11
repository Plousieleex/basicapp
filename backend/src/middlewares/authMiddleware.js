const handleAsync = require('../utils/handleAsync');
const jwt = require('../utils/jwt');

exports.protect = handleAsync(async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized.' });

  try {
    const decoded = jwt.verifyToken(token);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ message: 'Invalid token.' });
  }
});
