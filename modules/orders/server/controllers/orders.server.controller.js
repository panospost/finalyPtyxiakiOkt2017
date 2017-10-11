'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Order = mongoose.model('Order'),
  User = mongoose.model('User'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a order
 */
exports.create = function (req, res) {
  var order = new Order(req.body);
  order.user = req.user;
  order.orderlatitude = req.body.orderlatitude;
  order.orderlongitude = req.body.orderlongitude;
//order.company =req.company;
  order.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(order);
    }
  });
};


/**
 * Show the current order
 */
exports.read = function (req, res) {
  res.json(req.order);
};

/**
 * Update a order
 */
exports.update = function (req, res) {
  var order = req.order;

  //order.title = req.body.title;
 //order.content = req.body.content;

  order.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(order);
    }
  });
};
exports.updatefinished = function (req, res) {
  
  Order.update({ companyname:req.query.companyname,duedate:req.query.fdate,hour:req.query.timeline }, { finished: 'true' }, { multi: true }, function (err, raw) {
  if (err) 
  console.log('Orders were not updated ', raw);
		
  }).populate('user');
	
};

/**
 * Delete an order
 */
exports.delete = function (req, res) {
  var order = req.order;

  order.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(order);
    }
  });
};

/**
 * List of orders
 */
exports.list = function (req, res) {
  Order.find().sort('-created').populate('user').populate('company').exec(function (err, orders) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(orders);
    }
  });
};

exports.OrdersOfAUser = function (req, res) {
	var user = req.user;
  Order.find({user:user}).sort('-created').populate('user', 'displayName').populate('company','companyname').exec(function (err, orders) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(orders);
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
   Order.find({
        companyname:req.query.companyname,finished:'false'
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
exports.finishedOrders = function(req, res){
	
	Order.find({
		companyname:req.query.companyname,
        finished:'true'
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
/*
exports.finishedOrders2 = function(req, res){
	
	
		Order.find({
			'company.user':req.user,
			finished:'true'
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
	
	
};*/
exports.UpdateOrders2 = function(req, res){
	/*
  Order.update({ created: req.body.created, user:{email:req.body.email} }, { finished: 'true',route : mongoose.Types.ObjectId(req.body.route) }, { multi: false }, function (err, raw) {
  if (err) 
  console.log('Orders were not updated ', raw);
		
  });
  
 Order.findById(req.body.tauto, function (err, tank) {
  if (err) return console.log('Orders were not updated '+err);
  
  tank.finished = true;
  tank.route =mongoose.Types.ObjectId(req.body.route);
  tank.save(function (err) {
    if (err)  console.log('Orders were not updated '+err);
    res.send(tank);
  });
});*/
	Order.findById(mongoose.Types.ObjectId(req.query.orderid)).populate('user', 'displayName').populate('company','companyname').exec(function (err, order) {
    if (err) {
      return console.log(err);
    } else if (!order) {
      return res.status(404).send({
        message: 'No order with that identifier has been found'
      });
    }
    order.finished = "true";
	order.route = mongoose.Types.ObjectId(req.body.route);
	 order.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(order);
    }
	});
	
  });
};
/**
 * order middleware
 */
exports.orderByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'order is invalid'
    });
  }

  Order.findById(id).populate('user', 'displayName').populate('company','companyname').exec(function (err, order) {
    if (err) {
      return next(err);
    } else if (!order) {
      return res.status(404).send({
        message: 'No order with that identifier has been found'
      });
    }
    req.order = order;
    next();
  });
};
///mobile interface server
exports.MobileOrdersOfAUser = function (req, res) {
	/*
	var userid = req.body.userid;
	if (!mongoose.Types.ObjectId.isValid(userid)) {
    return res.status(400).send({
      message: 'User is invalid'
    });
  }*/

  User.findOne({
    _id: req.body._id
  }).exec(function (err, user) {
    if (err) {
      return next(err);
    } else if (!user) {
      return next(new Error('Failed to load User ' + userid));
    }

    Order.find({user:user}).sort('-created').populate('user', 'displayName').populate('company','companyname').exec(function (err, orders) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(orders);
    }
  });
   
  });

};
exports.Mobilecreate = function (req, res) {

  var order = new Order(req.body);
  
//order.company =req.company;
  order.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(order);
    }
  });
};