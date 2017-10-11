'use strict';

/**
 * Module dependencies.
 */
var routesPolicy = require('../policies/routes.server.policy'),
  routes = require('../controllers/routes.server.controller');
  

module.exports = function (app) {
  // Routes collection routes
  app.route('/api/routes').all(routesPolicy.isAllowed)
    .get(routes.list)
    .post(routes.create);
	app.route('/api/croutes/company*')
	.get(routes.listbycompany);
	
	app.route('/api/CreateRoute')
	.post(routes.create);
  // Single order routes
  app.route('/api/routes/:routeId').all(routesPolicy.isAllowed)
    .get(routes.read)
    .put(routes.update)
    .delete(routes.delete);

  // Finish by binding the order middleware
  app.param('routeId', routes.routeByID);
  //app.param('companyId', companies.companyByID);
};