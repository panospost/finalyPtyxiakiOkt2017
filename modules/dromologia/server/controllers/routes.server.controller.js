'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Route = mongoose.model('Route'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a order
 */
exports.create = function (req, res) {
  var route = new Route();
 // route.driver = req.user;
	console.log("mesa sto create route company = "+ req.body.companynname+"  routeDate= "+req.body.routeDate+"  routeQuantity= "+req.body.orderQuantity+"  routeincome= "+req.body.orderIncome+"  cureent = "+req.body.orders+" routetruck "+req.body.routetruck);
	route.companyname =mongoose.Types.ObjectId(req.body.companynname);
	//route.duedate =req.body.routeDate;
	route.quantity =req.body.orderQuantity;
	route.income =req.body.orderIncome;
	route.directions =req.body.rootedirect;
	route.truck =req.body.routetruck;
	route.hour =req.body.hour;
	route.driver = mongoose.Types.ObjectId(req.body.driver);
  route.save(function (err) {
    if (err) {
		console.log(err);
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
		
      });
    } else {
      res.json(route);
    }
  });
};

/**
 * Show the current order
 */
exports.read = function (req, res) {
  res.json(req.route);
};

/**
 * Update a order
 */
exports.update = function (req, res) {
  var route = req.route;

  //route.title = req.body.title;
  //route.content = req.body.content;

  route.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(route);
    }
  });
};

/**
 * Delete an order
 */
exports.delete = function (req, res) {
  var route = req.route;

  route.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(route);
    }
  });
};

/**
 * List of orders
 */
exports.list = function (req, res) {
  Route.find().sort('-created').populate('user', 'displayName').populate('company','companyname').exec(function (err, routes) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(routes);
    }
  });
};
exports.listbycompany = function (req, res) {
	/*area: req.query.area
Order.find({companyname:req.query.companyname}).populate('user', 'displayName').populate('company','companyname').exec(function (err, orders) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(orders);
    }
  });*/
   Route.find({
        companyname:req.query.companyname
    }, function (error, response) {
        if (error || !response) {
            res.status(404).send({
                status: 401,
                success: false
            });
        } else {
            res.json(response);
        }
    }).populate('user');
  
  
};
/**
 * route middleware
 */
exports.routeByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'order is invalid'
    });
  }

  Route.findById(id).populate('user', 'displayName').populate('company','companyname').exec(function (err, route) {
    if (err) {
      return next(err);
    } else if (!route) {
      return res.status(404).send({
        message: 'No order with that identifier has been found'
      });
    }
    req.route = route;
    next();
  });
};