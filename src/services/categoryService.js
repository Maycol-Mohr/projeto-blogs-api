const { Category } = require('../models');

const getByCategory = (name) => Category.findOne({ where: { name } });

const createCategory = async ({ name }) => {
  const newCategory = await Category.create({ name });
  return newCategory;
};

const getAllCategories = async () => {
  const categories = await Category.findAll();

  return categories;
};

// const getByCategoryId = (id) => Category.findOne({
//   where: { id },
// });

module.exports = {
  getByCategory,
  createCategory,
  getAllCategories,
//   getByCategoryId,
};