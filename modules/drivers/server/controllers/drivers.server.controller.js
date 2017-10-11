'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Driver = mongoose.model('Driver'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a order
 */
exports.create = function (req, res) {
  var driver= new Driver();
 // driver.driver = req.user;
	
	driver.company =mongoose.Types.ObjectId(req.body.company);
	
	driver.firstName =req.body.firstName;
	driver.email =req.body.email;
	driver.lastName =req.body.lastName;
	driver.username =req.body.username;
	driver.password =req.body.password;
	driver.provider = 'local';
  driver.displayName = driver.firstName + ' ' + driver.lastName;

  driver.save(function (err) {
    if (err) {
		console.log("εροορ"+err);
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
		
      });
    } else {
      res.json(driver);
    }
  });
};

/**
 * Show the current order
 */
exports.read = function (req, res) {
  res.json(req.driver);
};

/**
 * Update a order
 */
exports.update = function (req, res) {
  var driver= req.driver;

  //driver.title = req.body.title;
  //driver.content = req.body.content;

  driver.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(driver);
    }
  });
};

/**
 * Delete an order
 */
exports.delete = function (req, res) {
  var driver= req.driver;

  driver.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(driver);
    }
  });
};

/**
 * List of orders
 */
exports.list = function (req, res) {
  Driver.find().sort('-created').populate('user', 'displayName').populate('company','companyname').exec(function (err, drivers) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(drivers);
    }
  });
};

exports.listByCompany = function (req, res) {

   Driver.find({
        company:req.query.company
    }, function (error, response) {
        if (error || !response) {
            res.status(404).send({
                status: 401,
                success: false
            });
        } else {
            res.json(response);
        }
    });
  
  
};
/**
 * order middleware
 */
exports.driverByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'order is invalid'
    });
  }

  Driver.findById(id).populate('user', 'displayName').populate('company','companyname').exec(function (err, driver) {
    if (err) {
      return next(err);
    } else if (!driver) {
      return res.status(404).send({
        message: 'No order with that identifier has been found'
      });
    }
    req.driver= driver;
    next();
  });
};