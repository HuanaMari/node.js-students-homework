var express = require('express');
const actions = require('./actions');
const { emailValidator } = require('../helper');




var routes = express.Router();

routes.get('/home-page-users', (req, res) => {
    res.send('Home page!')
});

routes.get('/',actions.getAllUsers);
routes.get('/:number', actions.getSpecUser);
routes.post('/', actions.createUser);
routes.put('/:id',actions.updateUser );
routes.patch('/:number',actions.partUpdate);
routes.delete('/:number',actions.deleteUser);




module.exports = routes;