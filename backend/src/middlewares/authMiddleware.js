const handleAsync = require('../utils/handleAsync');
const prisma = require('../config/db');
const AppError = require('../utils/appError');
const jwt = require('../utils/jwt');

exports.protect = handleAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('You are not logged in.', 401));
  }

  // 2) Validate Token
  const decodedToken = await jwt.verifyToken(token);

  // 3) Check if user still exists
  const currentUser = await prisma.users.findUnique({
    where: { id: decodedToken.id },
  });

  if (!currentUser) {
    return next(new AppError('This user is not exist.', 401));
  }

  req.user = currentUser;
  next();
});
