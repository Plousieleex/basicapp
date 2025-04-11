const jwt = require('jsonwebtoken');
const promisify = require('util').promisify;

exports.signTokenLocal = (id, userRole) => {
  return jwt.sign({ id: id, userRole: userRole }, process.env.JWT_SECRET, {
    algorithm: 'HS256',
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.verifyToken = async (token) => {
  return await promisify(jwt.verify)(token, process.env.JWT_SECRET);
};
