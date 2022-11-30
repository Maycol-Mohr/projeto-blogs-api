const { PostService } = require('../services/postService');

module.exports = async (req, res) => {
  // console.log('maycol', req.user.dataValues);
  const posts = await PostService.getPosts(req);
  res.status(200).json({ mockPosts: posts });
};