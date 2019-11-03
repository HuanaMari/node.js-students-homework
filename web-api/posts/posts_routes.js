var express = require('express');
const actions = require('./post_actions');

var posts_routes = express.Router();


posts_routes.get('/users/posts', actions.getAllPosts);
posts_routes.get('/users/posts/:id', actions.getSpecPost);
posts_routes.get('/users/:postsId/posts',actions.getPostsWithUserId);
posts_routes.post('/users/posts/:id', actions.createPost);
posts_routes.put('/users/posts/:id',actions.updatePost);
posts_routes.patch('/users/posts/:id',actions.patchPost);
posts_routes.delete('/users/posts/:id',actions.deletePost);

module.exports = posts_routes;