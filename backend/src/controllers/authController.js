const handleAsync = require('../utils/handleAsync');
const authService = require('../services/authServices');

exports.signUpUserController = handleAsync(async (req, res, next) => {
  const { newUser, token } = await authService.signUpUserService({
    nameSurname: req.body.nameSurname,
    email: req.body.email,
    password: req.body.password,
  });

  res.status(201).json({
    status: 'success',
    message: 'User signed up successfully.',
    token,
    data: {
      newUser,
    },
  });
});

exports.signInUserController = handleAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const { user, token } = await authService.signInUserService(email, password);

  res.status(200).json({
    status: 'success',
    token,
    data: { user },
  });
});
