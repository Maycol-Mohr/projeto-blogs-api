const jwt = require('jsonwebtoken');

const UserService = require('../services/userService');

const secret = process.env.JWT_SECRET || 'seusecretdetoken';

const createNewUser = async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;
    const newUser = await UserService.createUser({ displayName, email, password, image });
    if (!newUser) return res.status(409).json({ message: 'User already registered' });
    const jwtConfig = {
      expiresIn: '7d',
      algorithm: 'HS256',
    };
    const token = jwt.sign({ data: newUser }, secret, jwtConfig);

    return res.status(201).json({ token });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Ocorreu um erro' });
  }
};

const getAll = async (_req, res) => {
    try {
      const users = await UserService.getAll();
      return res.status(200).json(users);
    } catch (e) {
      console.log(e.message);
      res.status(500).json({ message: 'Ocorreu um erro' });
    }
  };

module.exports = {
  createNewUser,
  getAll,
};
