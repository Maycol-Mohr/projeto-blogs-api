// const { PostService } = require('../services/postService');

// module.exports = async (req, res) => {
//   // console.log('maycol', req.user.dataValues);
//   const posts = await PostService.getPosts(req);
//   res.status(200).json({ mockPosts: posts });
// };

// const getAllPosts = async (req, res) => {
//   try {
//     const users = await PostService.getPosts(req);
//     return res.status(200).json(users);
//   } catch (e) {
//     console.log(e.message);
//     res.status(500).json({ message: 'Ocorreu um erro' });
//   }
// };

// module.exports = {
// // getAllPosts,
// };