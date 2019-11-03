var express = require('express');

let usersRouter = require('./users/routes');
let postsRouter = require('./posts/posts_routes');

appRouter = express.Router();

appRouter.use(usersRouter);
appRouter.use(postsRouter);

module.exports = appRouter;