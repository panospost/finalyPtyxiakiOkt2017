'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
	mongoose = require('mongoose'),
	//Article = mongoose.model('Article'),
	User = mongoose.model('User'),
	Message = mongoose.model('Message'),
	_ = require('lodash'),
	errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a article
 */
//NO USER CREATE
exports.createMessage = function(req, res) {
	var mess = new Message(req.body);

	mess.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(article);
		}
	});
};


/**
 * Show the current user
 */
exports.read = function(req, res) {
	res.json(req.adminuser);
};

/**
 * Update a User
 */
exports.update = function(req, res) {
	var user = req.adminuser;

	//For security purposes only merge these parameters

	user.firstName = req.body.firstName,
	user.lastName = req.body.lastName,
	user.roles = req.body.roles



	user.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(user);
		}
	});
};

/**
 * Delete a user
 */
exports.delete = function(req, res) {
	var user = req.adminuser;

	user.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(user);
		}
	});
};

/**
 * List of Users
 */
exports.list = function(req, res) {
	User.find({}, '-salt -password').sort('-created').populate('user', 'displayName').exec(function(err, users) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(users);
		}
	});
};
exports.listOfMessages = function(req, res) {
	Message.find({}, '-salt -password').sort('-created').populate('user', 'email','bodyofMessage').exec(function(err, messages) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(messages);
		}
	});
};

/**
 * User middleware
 */
exports.userByID = function(req, res, next, id) {
	User.findById(id).exec(function(err, user) {
		if (err) return next(err);
		if (!user) return next(new Error('Failed to load user ' + id));
		req.adminuser = user;
		next();
	});
};