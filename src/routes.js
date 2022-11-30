const getPosts = require('./controllers/posts');
const createUser = require('./controllers/getUsers');
const login = require('./controllers/login');
const getUsers = require('./controllers/getUsers');

module.exports = {
  getPosts,
  createUser,
  getUsers,
  login,
};