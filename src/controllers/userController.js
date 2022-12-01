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

  const getUserId = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await UserService.getByUserId(id);
  
      if (!user) { return res.status(404).json({ message: 'User does not exist' }); }
  
      return res.status(200).json(user);
    } catch (e) {
      console.log(e.message);
      res.status(500).json({ message: 'Algo deu errado' });
    }
  };

module.exports = {
  createNewUser,
  getAll,
  getUserId,
};
