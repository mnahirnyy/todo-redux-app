// const todosController = require('../controllers').todos;
// const todoItemsController = require('../controllers').todoItems;

// module.exports = (app) => {
//   app.get('/api', (req, res) => res.status(200).send({
//     message: 'Welcome to the Todos API!',
//   }));

//   app.post('/api/todos', todosController.create);
//   app.get('/api/todos', todosController.list);
//   app.get('/api/todos/:todoId', todosController.retrieve);
//   app.put('/api/todos/:todoId', todosController.update);
//   app.delete('/api/todos/:todoId', todosController.destroy);

//   app.post('/api/todos/:todoId/items', todoItemsController.create);
//   app.put('/api/todos/:todoId/items/:todoItemId', todoItemsController.update);
//   app.delete(
//     '/api/todos/:todoId/items/:todoItemId', todoItemsController.destroy
//   );
//   app.all('/api/todos/:todoId/items', (req, res) => res.status(405).send({
//     message: 'Method Not Allowed',
//   }));
// };

const AuthCtrl = require('../controllers/authentication');
const UserCtrl = require('../controllers/user');
const express = require('express');
const passport = require('passport');

const passportService = require('../config/passport');

// Middleware for login/auth
const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

module.exports = function (app) {
  const apiRoutes = express.Router(),
        authRoutes = express.Router(),
        userRoutes = express.Router();

  // Set auth routes as subgroup/middleware to apiRoutes
  apiRoutes.use('/auth', authRoutes);

  // Registration route
  authRoutes.post('/register', AuthenticationController.register);

  // Login route
  authRoutes.post('/login', requireLogin, AuthenticationController.login);

  // Set user routes as a subgroup/middleware to apiRoutes
  apiRoutes.use('/user', userRoutes);

  // View user profile route
  userRoutes.get('/:userId', requireAuth, UserController.viewProfile);      

  // Set url for API group routes
  app.use('/api', apiRoutes);
};