const { User } = require('../models');

const createUser = ({ email, password }) => User.create({ email, password });

const getUsers = () => User.findAll();

const getByEmail = (email) => User.findOne({ where: { email } });

const getByUserId = (userId) => User.findByPk(userId);

module.exports = {
  createUser,
  getUsers,
  getByEmail,
  getByUserId,
};