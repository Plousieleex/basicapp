const prisma = require('../config/db');
const AppError = require('../utils/appError');

exports.getUserProfileService = async (userID) => {
  const user = await prisma.users.findUnique({
    where: {
      id: userID,
    },
    select: {
      nameSurname: true,
      email: true,
    },
  });

  if (!user) {
    throw new AppError('Cant get user.', 404);
  }

  return user;
};
