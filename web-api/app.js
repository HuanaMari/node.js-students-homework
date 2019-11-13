var express = require('express');
require("dotenv/config");
var bodyParser = require("body-parser");
// var users = require("./users/routes");
// var posts = require("./posts/posts_routes")
var jwt = require('express-jwt');
var unless = require('express-unless');
let appRoutes = require('./appRouter')

const app = express();

const middleWare = require('./middleware/common');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

const publicRoute = ['/login']
app.use(jwt({ secret: 'macePace'}).unless({path: publicRoute}));

app.use(middleWare.logger);

app.use(appRoutes);
// app.use('/users', users);
// app.use('/users/:id/posts',posts);

app.use(middleWare.routError);
app.use(middleWare.hendler);

var port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`API is listenig on port ${port}!`);
});











