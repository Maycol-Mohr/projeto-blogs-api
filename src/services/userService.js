const { User } = require('../models');

const getByEmail = (email) => User.findOne({ where: { email } });

const createUser = async ({ displayName, email, password, image }) => {
  const validateEmail = await getByEmail(email);
  if (validateEmail) return null;
  const newUser = await User.create({ displayName, email, password, image });

  return newUser;
};

// const create = async ({ title, author, pageQuantity }) => {
//   const book = await Book.create({ title, author, pageQuantity });
//   return book;
// };

// const getAll = async () => {
//   const users = await User.findAll();

//   return users;
// };

// const getByUserId = (userId) => User.findByPk(userId);

module.exports = {
  createUser,
  // getAll,
  getByEmail,
  // getByUserId,
};