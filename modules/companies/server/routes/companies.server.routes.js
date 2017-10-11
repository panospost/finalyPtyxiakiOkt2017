'use strict';

/**
 * Module dependencies.
 */
var companyPolicy = require('../policies/companies.server.policy'),
  companies = require('../controllers/companies.server.controller');

module.exports = function (app) {
  // companies collection routes
  app.route('/api/companies').all(companyPolicy.isAllowed)    
	.get(companies.list)
    .post(companies.create);
 app.route('/api/companies/2companies').all(companyPolicy.isAllowed)
 .get(companies.list2);
  // Single companies routes
  app.route('/api/companies/:companyId').all(companyPolicy.isAllowed)
    .get(companies.read)
    .put(companies.update)
    .delete(companies.delete);
	app.route('/api/companyByuser')
	.get(companies.companyByUser);
	app.route('/api/companiesCloseClient')
	.get(companies.listOfClient);
	app.route('/api/singlecompany*')
  .get(companies.companyByID2);
  app.route('/api/companiesEnallaktikis')
  .get(companies.listEnallaktikis);
  //mobileinterface
   //app.route('api/mobile/ById')
  //.post(companies.listById);
  app.route('/api/mobile/companies*')//.all(companyPolicy.isAllowed)    
	.get(companies.listMobile)
	.post(companies.listById);
	app.route('/api/mobile/rating')//.all(companyPolicy.isAllowed)    
	.post(companies.Rating);
 
  // Finish by binding the company middleware
  app.param('companyId', companies.companyByID);
  
};