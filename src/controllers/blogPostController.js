const UserBlogPost = require('../services/blogPostService');

const createNewBlogPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const { id } = req.user;
    const newBlogPost = await UserBlogPost.createBlogPost({ id, title, content });
   
    return res.status(201).json(newBlogPost);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Ocorreu um erro' });
  }
};

const getAllBlogPosts = async (_req, res) => {
    try {
      const blogPosts = await UserBlogPost.getAllBlogPost();
      return res.status(200).json(blogPosts);
    } catch (e) {
      console.log(e.message);
      res.status(500).json({ message: 'Ocorreu um erro' });
    }
  };

const getPostId = async (req, res) => {
    try {
      const { id } = req.params;
      const post = await UserBlogPost.getPostId(id);
  
      if (!post) { return res.status(404).json({ message: 'Post does not exist' }); }
  
      return res.status(200).json(post);
    } catch (e) {
      console.log(e.message);
      res.status(500).json({ message: 'Algo deu errado' });
    }
};

module.exports = {
  createNewBlogPost,
  getAllBlogPosts,
  getPostId,
};