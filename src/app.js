const express = require('express');

const bodyParser = require('body-parser');

const UserController = require('./controllers/userController');
const CategoryController = require('./controllers/categoryController');
const BlogPostController = require('./controllers/blogPostController');
const login = require('./controllers/login');
const validateEmail = require('./middlarews/validateEmail');
const validateName = require('./middlarews/validateName');
const validatePassword = require('./middlarews/validatePassword');
const validateJWT = require('./auth/validateJWT');
const validateCategory = require('./middlarews/validateCategory');
const validateFields = require('./middlarews/validateFields');
const validateCategoryId = require('./middlarews/validateCategoryId');
const validateFieldsPutPost = require('./middlarews/validateFieldsPutPost');

// ...

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.json());

const apiRoutes = express.Router();

apiRoutes.put('/post/:id', validateJWT,  
validateFieldsPutPost, 
BlogPostController.updateBlogPost);

apiRoutes.get('/post/:id', validateJWT, BlogPostController.getPostId);
apiRoutes.get('/user/:id', validateJWT, UserController.getUserId);
apiRoutes.get('/user', validateJWT, UserController.getAll);
apiRoutes.post('/user', validateName, 
validateEmail, 
validatePassword, 
UserController.createNewUser);

apiRoutes.post('/post', 
validateJWT, 
validateFields, 
validateCategoryId, 
BlogPostController.createNewBlogPost);

apiRoutes.get('/post', validateJWT, BlogPostController.getAllBlogPosts);

apiRoutes.post('/login', login);
apiRoutes.post('/categories', validateCategory, validateJWT, CategoryController.createNewCategory);
apiRoutes.get('/categories', validateJWT, CategoryController.getAllCategories);

app.use(apiRoutes);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;