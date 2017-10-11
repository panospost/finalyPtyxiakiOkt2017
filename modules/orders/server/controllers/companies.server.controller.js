'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Company = mongoose.model('Company'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a Company
 */
exports.create = function (req, res) {
  var company = new Company(req.body);
  company.user = req.user;

  company.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(company);
    }
  });
};

/**
 * Show the current company
 */
exports.read = function (req, res) {
  res.json(req.company);
};

/**
 * Update a company
 */
exports.update = function (req, res) {
  var company = req.company;

  company.companyname = req.body.companyname;
  company.address = req.body.address;
   company.phonenumber = req.body.phonenumber;
    company.city = req.body.city;
	 company.area = req.body.area;
	 company.pricepL = req.body.pricepL;
	 

  company.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(company);
    }
  });
};

/**
 * Delete an company
 */
exports.delete = function (req, res) {
  var company = req.company;

  company.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(company);
    }
  });
};

/**
 * List of companies
 */
exports.list = function (req, res) {
	console.log(req.user);
  Company.find().sort('-created').populate('user', 'displayName').exec(function (err, companies) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(companies);
	  //console.log(companies);
    }
  });
};
exports.list2 = function (req, res) {
	var user1 = req.user;
  Company.find({
  user:user1}).sort('-created').populate('user', 'displayName').exec(function (err, companies) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(companies);
	  //console.log(companies);
    }
  });
};
/**
 * order middleware
 */
exports.companyByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'company is invalid'
    });
  }

  Company.findById(id).populate('user', 'displayName').exec(function (err, company) {
    if (err) {
      return next(err);
    } else if (!company) {
      return res.status(404).send({
        message: 'No company with that identifier has been found'
      });
    }
    req.company = company;
    next();
  });
};