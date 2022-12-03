const Sequelize = require('sequelize');
const { BlogPost, User, Category } = require('../models');

const config = require('../config/config');

const env = process.env.NODE_ENV || 'development';
// Ajustamos para usar a configuração correta para nosso ambiente
const sequelize = new Sequelize(config[env]);

// const createBlogPost = async ({ id, title, content }) => {
// const newBlogPost = await BlogPost.create({ id, title, content }); teste

// return newBlogPost;
// };

const getAllBlogPost = async () => {
    const blogPosts = await BlogPost.findAll({
        include: [
            { model: User, as: 'user', attributes: { exclude: ['password'] } },
            { model: Category, as: 'categories', through: { attributes: [] } },
          ],
    });
  
    return blogPosts;
  };

const getPostId = (id) => BlogPost.findOne({
    where: { id },
    include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories', through: { attributes: [] } },
      ],
});

const createBlogPost = async (id, title, content, categoryIds) => {
    const t = await sequelize.transaction();
    try {
      // Depois executamos as operações
      const result = await sequelize.transaction(async () => {
        const newPost = await BlogPost.create(
          { id, title, content, categoryIds }, { transaction: t },
);
         // const newPatient = await Patient.create({ fullname, planId: planId.planId }, { transaction: t });
  
        return newPost;
      });
      return result;
      // Se chegou até aqui é porque as operações foram concluídas com sucesso,
      // não sendo necessário finalizar a transação manualmente.
      // `result` terá o resultado da transação, no caso um empregado e o endereço cadastrado
    } catch (e) {
      // Se entrou nesse bloco é porque alguma operação falhou.
      // Nesse caso, o sequelize irá reverter as operações anteriores com a função rollback, não sendo necessário fazer manualmente
      console.log(e);
      throw e; // Jogamos o erro para a controller tratar
    }
  };

  const updatePost = async (id, { title, content }) => {
    const [updated] = await BlogPost.update({ title, content }, 
      { where: { id } });
  
    return updated;
  };

module.exports = {
  createBlogPost,
  getAllBlogPost,
  getPostId,
  updatePost,
};