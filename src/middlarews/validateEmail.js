// middlewares/validateEmail.js
module.exports = (req, res, next) => {
    const { email } = req.body;

    const isFormatEmail = /\S+@\S+\.\S+/;
  
    if (!isFormatEmail.test(email)) {
      return res.status(400).json(
        { message: '"email" must be a valid email' },
      );
    }
  
    next();
  };