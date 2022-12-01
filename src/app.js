const express = require('express');

const bodyParser = require('body-parser');

const UserController = require('./controllers/userController');
const CategoryController = require('./controllers/categoryController');
// const UserPostsController = require('./controllers/blogPostsController');
const login = require('./controllers/login');
const validateEmail = require('./middlarews/validateEmail');
const validateName = require('./middlarews/validateName');
const validatePassword = require('./middlarews/validatePassword');
const validateJWT = require('./auth/validateJWT');
const validateCategory = require('./middlarews/validateCategory');

// ...

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.json());

const apiRoutes = express.Router();

// apiRoutes.get('/api/posts', validateJWT, routes.getPosts);

// apiRoutes.get('/posts', UserPostsController.getAllPosts);
apiRoutes.get('/user/:id', validateJWT, UserController.getUserId);
apiRoutes.get('/user', validateJWT, UserController.getAll);
apiRoutes.post('/user', validateName, 
validateEmail, 
validatePassword, 
UserController.createNewUser);
// apiRoutes.get('/api/users', routes.getUsers);
apiRoutes.post('/login', login);
apiRoutes.post('/categories', validateCategory, validateJWT, CategoryController.createNewCategory);
apiRoutes.get('/categories', validateJWT, CategoryController.getAllCategories);
// apiRoutes.get('/categories/:id', CategoryController.getCategoryId);

app.use(apiRoutes);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;