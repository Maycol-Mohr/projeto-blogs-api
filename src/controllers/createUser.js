const { UserService } = require('../services/userService');

module.exports = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userEmail = await UserService.createUser({ email, password });

    if (!userEmail) throw Error;

    res.status(201).json({ message: 'Novo usuário criado com sucesso', user: userEmail });
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Erro ao salvar o usuário no banco', error: err.message });
  }
};