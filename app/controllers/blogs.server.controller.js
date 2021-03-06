'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Blog = mongoose.model('Blog'),
	_ = require('lodash');

/**
 * Create a Blog
 */
exports.create = function(req, res) {
	var blog = new Blog(req.body);
	blog.user = req.user;

	blog.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(blog);
		}
	});
};

// Primer blog, cuando crea el usuario
exports.firstCreate = function(req, res) {
    var blog = new Blog({name:'Tu nuevo blog'});
    blog.user = req.user;
    req.blog = blog;
    blog.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        }
            // nuetra peticion no necesita una respuesta.jsonp(blog);

    });
};

/**
 * Show the current Blog
 */
exports.read = function(req, res) {
    if (req.article === null){
        res.jsonp(req.blog);
    }else{
        res.jsonp(req.blog);
    }
};

/**
 * Update a Blog
 */
exports.update = function(req, res) {
	var blog = req.blog ;

	blog = _.extend(blog , req.body);

	blog.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(blog);
		}
	});
};

/**
 * Delete an Blog
 */
exports.delete = function(req, res) {
	var blog = req.blog ;

	blog.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(blog);
		}
	});
};

/**
 * List of Blogs
 */
exports.list = function(req, res) { 
	Blog.find().sort('-created').populate('user', 'displayName').exec(function(err, blogs) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(blogs);
		}
	});
};

/**
 * Blog middleware
 */
exports.blogByID = function(req, res, next, id) { 
	Blog.findById(id).populate('user', 'displayName').exec(function(err, blog) {
		if (err) return next(err);
		if (! blog) return next(new Error('Failed to load Blog ' + id));
		req.blog = blog ;
		next();

	});
};

/**
 * Blog authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.blog.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
