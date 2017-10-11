'use strict';

/**
 * Module dependencies.
 */
var ordersPolicy = require('../policies/orders.server.policy'),
  orders = require('../controllers/orders.server.controller'),
  companies = require('../controllers/companies.server.controller');

module.exports = function (app) {
  // Articles collection routes
  app.route('/api/orders').all(ordersPolicy.isAllowed)
    .get(orders.list)
    .post(orders.create);
	app.route('/api/corders/company*')
	.get(orders.listbycompany);
	app.route('/api/finishedOrders*')
	.get(orders.finishedOrders);
	/*
	app.route('/api/finishedOrders2*')
	.get(orders.finishedOrders2);
	*/
	app.route('/api/updatefinished*')
	.get(orders.updatefinished);
	
	app.route('/api/UpdateOrders*')
	.post(orders.UpdateOrders2);
	
	app.route('/api/ordersOfUser')
	.get(orders.OrdersOfAUser);
	
  // Single order routes
  app.route('/api/orders/:orderId').all(ordersPolicy.isAllowed)
    .get(orders.read)
    .put(orders.update)
    .delete(orders.delete);
	app.route('/api/orders1/:orderId').all(ordersPolicy.isAllowed)
	 .post(orders.delete);
//mobile interface
app.route('/api/mobile/ordersOfUser*')
	.post(orders.MobileOrdersOfAUser);
 app.route('/api/mobile/orders')
    
    .post(orders.Mobilecreate);
app.route('/api/mobile/Dorders/:orderId')
    .delete(orders.delete);


  // Finish by binding the order middleware
  app.param('orderId', orders.orderByID);
  app.param('companyId', companies.companyByID);
};