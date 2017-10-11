'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Company = mongoose.model('Company'),
  Rating = mongoose.model('Ratings'),
  avg = mongoose.model('avgRating'),
  User = mongoose.model('User'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  async = require('async');

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
	 company.priceTh = req.body.priceTh;
	 company.rangeOfOrder=req.body.rangeOfOrder;
	 company.truck2 = req.body.truck2;
	 company.truck1 = req.body.truck1;
	 

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
 exports.listOfClient = function(req,res){
	 var maxDistance = 30 ;
	maxDistance /= 6371;
	var coords = [0,0];
	coords[0] =Number(req.user.longitude);
	coords[1] =Number(req.user.latitude);
	  Company.where('loc1').near({
			  center: coords,
			  spherical: true,
			  maxDistance: maxDistance
			  
			}).exec(function (err, companies) {
					if (err) {
						console.log(err);
					  return res.status(400).send({
						message: errorHandler.getErrorMessage(err)
					  });
					} else {
					  res.json(companies);
					  //console.log(companies);
					}
			});
 };
exports.list = function (req, res) {

	 var maxDistance = 30 ;
	maxDistance /= 6371;
	var coords = [0,0];
	coords[0] =Number(req.user.longitude);
	coords[1] =Number(req.user.latitude);
	  Company.where('loc1').near({
			  center: coords,
			  spherical: true,
			  maxDistance: maxDistance
			  
			}).exec(function (err, companies) {
					if (err) {
						console.log(err);
					  return res.status(400).send({
						message: errorHandler.getErrorMessage(err)
					  });
					} else {
					  res.json(companies);
					  //console.log(companies);
					}
			});
			 
};

exports.listEnallaktikis = function (req, res) {

	 var maxDistance = 30 ;
	maxDistance /= 6371;
	var coords = [0,0];
	coords[0] =Number(req.user.longitude2);
	coords[1] =Number(req.user.latitude2);
	  Company.where('loc1').near({
			  center: coords,
			  spherical: true,
			  maxDistance: maxDistance
			  
			}).exec(function (err, companies) {
					if (err) {
						console.log(err);
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
		console.log(companies);
      res.json(companies);
	  
    }
  });
};
exports.companyByUser = function (req, res) {
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
 * company middleware
 */
 exports.companyByID2 = function (req, res) {
	var companyname = req.body.companyname;
	
  Company.find({
  companyname:companyname}).sort('-created').populate('user', 'displayName').exec(function (err, companies) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
		console.log(companies);
      res.json(companies);
	  //console.log(companies);
    }
  });
};
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
//mobile interface
exports.listMobile = function (req, res) {

	 var maxDistance = 30 ;
	maxDistance /= 6371;
	var coords = [0,0];
	coords[0] =Number(req.query.longitude);
	coords[1] =Number(req.query.latitude);
	  Company.where('loc1').near({
			  center: coords,
			  spherical: true,
			  maxDistance: maxDistance
			  
			}).exec(function (err, companies) {
					if (err) {
						console.log(err);
					  return res.status(400).send({
						message: errorHandler.getErrorMessage(err)
					  });
					} else {
					  res.json(companies);
					  //console.log(companies);
					}
			});
			 
};
exports.Rating = function(req,res){
	//var rating = req.body.rating;
	var CompanyId = req.body.companyId;
/*	var user = req.body.userId;
	var rating =Rating.create({
        companyId: CompanyId,
        userId: req.body.userId,
        rating: req.body.rating
      });
	  

 var average=0;
	
	Rating.create({
        companyId: CompanyId,
        userId: req.body.userId,
        rating: req.body.rating
      },function(err,rating){
			if(err) console.log(err);
	
			Company.findById(CompanyId,function(err,company){
				company.ratings.push(rating);
				company.save(function(err,company){
					if(err) console.log(err);
					//aggregate
					Rating.aggregate(
						[
							{
								'$group':{
									'_id':'req.body.companyId',
									'avgRating':{'$avg':{'$ifNull':['$rating',0]}}
								}
							}
						],
						function(err,results){
							
							if(err) console.log(err);
							results = results.map(function(result){
								return new avg(result);
							});
							Company.populate(
								results,
								{'path':'req.body.companyId'},
								function(err,results){
									if(err) console.log(err);
									//res.json(results);
									//next(results);
									Company.findOne({_id:CompanyId})
									.populate(results,
								{'path':'avgRating1'})
									.exec(function (err, company) {
										  if (err) return err;
										  
										  res.json(company);
										  // prints "The creator is Guillermo"
										})
								}
							);
						}
					);
					//res.json(company)
				});//companysave
			});//findById
	 });//rating create
	 
	 
		//console.log(x);
	//	res.json(x);
	*/
	Company.findById(CompanyId,function(err,company){
	
		company.sum = company.sum +req.body.rating;
		company.metritis = company.metritis+1;
		company.avgRating = company.sum / company.metritis;
		company.save(function (err) {
			if (err) {
			  return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			  });
			} else {
			  res.json(company);
			}
		  });
	});
	 
};

exports.listById = function(req,res){
	//var mid = mongoose.Types.ObjectId(req.query.id);
	User.findOne({
    _id: req.body._id
  }).exec(function (err, user) {
    if (err) {
      return next(err);
    } else if (!user) {
      return next(new Error('Failed to load User ' + id));
    }
	
	//edw gia tis etaireies
	 var maxDistance = 300;
	maxDistance /= 6371;
	var coords = [0,0];
	coords[0] =Number(user.longitude);
	coords[1] =Number(user.latitude);
	  Company.where('loc1').near({
			  center: coords,
			  spherical: true,
			  maxDistance: maxDistance
			  
			}).populate('user', 'displayName').exec(function (err, companies) {
					if (err) {
						console.log(err);
					  return res.status(400).send({
						message: errorHandler.getErrorMessage(err)
					  });
					} else {
					  res.json(companies);
					  console.log(companies);
					}
			});
    
  });
};
