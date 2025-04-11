const prisma = require('../config/db');
const bcrypt = require('bcrypt');
const AppError = require('../utils/appError');
const jwt = require('../utils/jwt');

exports.signUpUserService = async ({ nameSurname, email, password }) => {
  const existingUser = await prisma.users.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    throw new AppError('User already exists with this email.', 401);
  }

  password = await bcrypt.hash(password, 12);

  try {
    const newUser = await prisma.users.create({
      data: {
        nameSurname,
        email,
        password,
      },
    });

    return newUser;
  } catch (e) {
    await prisma.users.deleteMany({ where: { email: email } });

    throw new AppError('User creation failed. Try again later.', 500);
  }
};

exports.signInUserService = async (email, password) => {
  if (!email || !password) {
    throw new AppError('Please provide an email or password.', 400);
  }

  const user = await prisma.users.findUnique({
    where: { email: email },
  });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new AppError('Invalid email or password.', 401);
  }

  delete user.password;

  const token = jwt.signTokenLocal(user.id, user.userRole);

  return { user, token };
};

exports.getAllUsersService = async () => {
  const users = await prisma.users.findMany({
    select: {
      id: true,
      email: true,
      nameSurname: true,
      createdAt: true,
    },
  });

  return users;
};
