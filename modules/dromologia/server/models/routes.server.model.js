'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Article Schema
 */
var RouteSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
	quantity:{
			type:String,
		  required:'Quantity is required'
	},income:{
			type:String,
		  required:'income is required'
	},
  driver: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  companyname: {
    type: Schema.ObjectId,
    ref: 'Company',
		  required:'companyid is required'
   
  },
  directions: {
    type:Object,
	
		  required:'directions is required'
   
  },
  truck:{
	  type: Schema.ObjectId,
    ref: 'Truck',
		  required:'truckId is required'
  },
  hour:{
	  type:String 
  }
  
});

mongoose.model('Route', RouteSchema);