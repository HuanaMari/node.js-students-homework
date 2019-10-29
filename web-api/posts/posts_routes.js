var express = require('express');
const actions = require('./post_actions');

var posts_routes = express.Router();


posts_routes.get('/', actions.getAllPosts);
posts_routes.get('/:id', actions.getSpecPost);
posts_routes.get('/:id/posts',actions.getPostWithUserId);
posts_routes.post('/', actions.createPost);
posts_routes.put('/:id',actions.updatePost);
posts_routes.patch('/:id',actions.patchPost);
posts_routes.delete('/:id',actions.deletePost);

module.exports = posts_routes;