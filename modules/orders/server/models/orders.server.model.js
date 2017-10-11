'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Article Schema
 */
var OrderSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },hour:{
	  type:String
  },
  duedate:{
		type:String,
		//required:true
	},quantity:{
			type:Number,
		  required:'Η ποσότητα απαιτείται'
	},typeOfOrder:{
			type:String,
			required:'Απατείται είδος παραγγελίας'
			
	},
		message:{
			type:String,
			default:"Δεν εδωσε καποιο μυνημα ο χρηστης"
		},payment:{
			type:String,
			required:'Απατείται ο τροπος πληρωμής'
		},
		pricetp:{
			type:Number
		},
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }, route: {
    type: Schema.ObjectId,
    ref: 'Route'
  },
  companyname: {
    //type: Schema.ObjectId,
   // ref: 'Company'
   type:String
  },
  company: {
    type: Schema.ObjectId,
    ref: 'Company'
  
  },
  finished:{
	  type:String,
	  default: 'false'
  },
  orderlatitude:{
	  type:String
  },
  orderlongitude:{
	  type:String
  }
  
});

mongoose.model('Order', OrderSchema);