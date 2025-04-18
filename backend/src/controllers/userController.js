const handleAsync = require('../utils/handleAsync');
const userService = require('../services/userServices');

exports.getUserProfile = handleAsync(async (req, res, next) => {
  const userID = req.user.id;
  const user = await userService.getUserProfileService(userID);

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

exports.deleteUser = handleAsync(async (req, res, next) => {
  const userID = req.user.id;
  // Delete User
});

exports.updateUserPassword = handleAsync(async (req, res, next) => {
  // Update user's password
});
