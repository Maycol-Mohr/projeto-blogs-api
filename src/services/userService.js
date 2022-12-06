const { User } = require('../models');

const getByEmail = (email) => User.findOne({ where: { email } });

const createUser = async ({ displayName, email, password, image }) => {
  const validateEmail = await getByEmail(email);
  if (validateEmail) return null;
  const newUser = await User.create({ displayName, email, password, image });

  return newUser;
};

const getAll = async () => {
  const users = await User.findAll({ attributes: { exclude: ['password'] } });

  return users;
};

const getByUserId = (id) => User.findOne({
  where: { id },
  attributes: { exclude: ['password'] },
});

const removeUserService = async (id) => {
  const removed = await User.destroy(
    { where: { id } },
  );

  return removed;
};

module.exports = {
  createUser,
  getAll,
  getByEmail,
  getByUserId,
  removeUserService,
};