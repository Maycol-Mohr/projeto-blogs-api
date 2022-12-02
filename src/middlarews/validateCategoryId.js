// middlewares/validateEmail.js
module.exports = (req, res, next) => {
    const { categoryIds } = req.body;
    
    if (categoryIds.length === 0) {
      return res.status(400).json(
        { message: 'one or more "categoryIds" not found' },
      );
    }
  
    next();
  };