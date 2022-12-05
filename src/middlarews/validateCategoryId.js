// middlewares/validateEmail.js

const { getByCategoryId } = require('../services/categoryService');

module.exports = async (req, res, next) => {
    const { categoryIds } = req.body;
    const categories = await Promise.all(categoryIds.map(async (id) => getByCategoryId(id)));
    if (categories.some((category) => !category)) {
      return res.status(400).json(
        { message: 'one or more "categoryIds" not found' },
      );
    }
  
    next();
  };