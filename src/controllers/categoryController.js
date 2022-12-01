const CategoryService = require('../services/categoryService');

const createNewCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const newName = await CategoryService.createCategory({ name });
    return res.status(201).json(newName);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Ocorreu um erro' });
  }
};

const getAllCategories = async (_req, res) => {
    try {
      const categories = await CategoryService.getAllCategories();
      return res.status(200).json(categories);
    } catch (e) {
      console.log(e.message);
      res.status(500).json({ message: 'Ocorreu um erro' });
    }
  };

//   const getCategoryId = async (req, res) => {
//     try {
//       const { id } = req.params;
//       const category = await CategoryService.getByCategoryId(id);
  
//       if (!category) { return res.status(404).json({ message: 'Category does not exist' }); }
  
//       return res.status(200).json(category);
//     } catch (e) {
//       console.log(e.message);
//       res.status(500).json({ message: 'Algo deu errado' });
//     }
//   };

module.exports = {
  createNewCategory,
  getAllCategories,
//   getCategoryId,
};