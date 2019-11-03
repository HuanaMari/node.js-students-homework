var express = require('express');

const actions = require('./actions');
var routes = express.Router();

routes.get('/users',actions.getAllUsers);
routes.get('/users/id/:number', actions.getSpecUser);
routes.get('/users/name/:name',actions.findUserByName);
routes.post('/users', actions.createUser);
routes.put('/users/:id',actions.updateUser );
routes.patch('/users/:number',actions.partUpdate);
routes.delete('/users/:number',actions.deleteUser);

module.exports = routes;