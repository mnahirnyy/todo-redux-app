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

// dependencies
const express = require('express');
const passport = require('passport');

// controllers
const authCtrl = require('../controllers/authentication');

// middleware
const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

module.exports = function (app) {
    const apiRoutes = express.Router();
    const authRoutes = express.Router();

    apiRoutes.use('/auth', authRoutes);
    authRoutes.post('/login', requireLogin, authCtrl.login); // login
    authRoutes.post('/register', authCtrl.register); // register

    // use all the routes
    app.use('/api', apiRoutes);
};
