'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Truck = mongoose.model('Truck'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a order
 */
exports.create = function (req, res) {
  var truck= new Truck();

	
	truck.company = mongoose.Types.ObjectId(req.body.company);
	
	truck.firstName =req.body.firstName;
	truck.model =req.body.model;
	truck.size =req.body.size;
	truck.trafficNumber =req.body.trafficNumber;
	truck.insuranceNumber =req.body.insuranceNumber;

  

  truck.save(function (err) {
    if (err) {
		console.log("εροορ"+err);
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
		
      });
    } else {
      res.json(truck);
    }
  });
};

/**
 * Show the current order
 */
exports.read = function (req, res) {
  res.json(req.truck);
};

/**
 * Update a order
 */
exports.update = function (req, res) {
  var truck= req.truck;

  //driver.title = req.body.title;
  //driver.content = req.body.content;

  truck.save(function (err) {
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
  var truck= req.truck;

  truck.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(truck);
    }
  });
};

/**
 * List of trucks
 */
exports.list = function (req, res) {
  Truck.find().sort('-created').populate('company','companyname').exec(function (err, trucks) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(trucks);
    }
  });
};

exports.listByCompany = function (req, res) {

   Truck.find({
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
exports.truckByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'order is invalid'
    });
  }

  Truck.findById(id).populate('company','companyname').exec(function (err, truck) {
    if (err) {
      return next(err);
    } else if (!truck) {
      return res.status(404).send({
        message: 'No truck with that identifier has been found'
      });
    }
    req.truck= truck;
    next();
  });
};