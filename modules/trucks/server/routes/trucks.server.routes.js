'use strict';

/**
 * Module dependencies.
 */
var driversPolicy = require('../policies/truckss.server.policy'),
  trucks = require('../controllers/trucks.server.controller');
  

module.exports = function (app) {
  // Routes collection routes
  app.route('/api/trucks').all(driversPolicy.isAllowed)
    .get(trucks.list)
    .post(trucks.create);
	
	app.route('/api/companyTrucks*')
	.get(trucks.listByCompany);
	
  // Single order routes
  app.route('/api/trucks/:truckId').all(driversPolicy.isAllowed)
    .get(trucks.read)
    .put(trucks.update)
    .delete(trucks.delete);

  // Finish by binding the order middleware
  app.param('truckId', trucks.truckByID);
  
};