// const Sequelize = require('sequelize');
const { BlogPost, User, Category, PostCategory } = require('../models');

// const config = require('../config/config');

// const env = process.env.NODE_ENV || 'development';
// Ajustamos para usar a configuração correta para nosso ambiente
// const sequelize = new Sequelize(config[env]);

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

const createBlogPost = async (title, content, userId, categoryIds) => {
    try {
        const newPost = await BlogPost.create(
          { title, content, userId },
        );
        const postCategories = categoryIds
        .map((categoryId) => ({ postId: newPost.id, categoryId }));
        await PostCategory.bulkCreate(
          postCategories,
        );

        return newPost;
    } catch (e) {
      console.log(e);
      throw e; 
    }
  };

  const updatePost = async (id, { title, content }) => {
    await BlogPost.update({ title, content }, 
      { where: { id } });
  };

  const removePostService = async (id) => {
    const removed = await BlogPost.destroy(
      { where: { id } },
    );
  
    return removed;
  };

module.exports = {
  createBlogPost,
  getAllBlogPost,
  getPostId,
  updatePost,
  removePostService,
};