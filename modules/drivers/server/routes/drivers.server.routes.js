'use strict';

/**
 * Module dependencies.
 */
var driversPolicy = require('../policies/drivers.server.policy'),
  drivers = require('../controllers/drivers.server.controller');
  

module.exports = function (app) {
  // Routes collection routes
  app.route('/api/drivers').all(driversPolicy.isAllowed)
    .get(drivers.list)
    .post(drivers.create);
	
	app.route('/api/companyDrivers*')
	.get(drivers.listByCompany);
	
  // Single order routes
  app.route('/api/drivers/:driverId').all(driversPolicy.isAllowed)
    .get(drivers.read)
    .put(drivers.update)
    .delete(drivers.delete);

  // Finish by binding the order middleware
  app.param('driverId', drivers.driverByID);
  
};