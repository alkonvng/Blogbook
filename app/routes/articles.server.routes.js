'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users.server.controller'),
	articles = require('../../app/controllers/articles.server.controller'),
    blogs = require('../../app/controllers/blogs.server.controller');

module.exports = function(app) {
	// Article Routes
	app.route('/articles')
		.get(articles.list)
		.post(users.requiresLogin, articles.create);

	app.route('/articles/:articleId')
		.get(articles.read)
		.put(users.requiresLogin, articles.hasAuthorization, articles.update)
		.delete(users.requiresLogin, articles.hasAuthorization, articles.delete);
    app.route('/blogs/:blogId/:articleId')
        .get(articles.read,blogs.read)
        .put(users.requiresLogin, articles.hasAuthorization, articles.update)
        .delete(users.requiresLogin, articles.hasAuthorization, articles.delete);
    app.route('/blogs/:blogId/articles/createArticle')
        .get(blogs.read)
        .post(users.requiresLogin,articles.create);

	// Finish by binding the article middleware
	app.param('articleId', articles.articleByID);
    app.param('blogId', blogs.blogByID);
};