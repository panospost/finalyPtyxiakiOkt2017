'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  crypto = require('crypto'),
  validator = require('validator');


/**
 * Article Schema
 */
var TruckSchema = new Schema({
  firstName: {
    type: String,
    trim: true,
    required: 'Το όνομα του φορτηγού απαιτείται'
  },
   model:{
	   type:String,
	    required: 'Το μοντέλο του φορτηγού απαιτείται'
   },
   email:{
	   type: Date,
    default: Date.now
   },
  size: {
    type: Number,
    required: 'Το μέγεθος του φορτηγού απαιτείται'
  },
  
   trafficNumber: {
    type: Number,
    required: 'Ο αριθμός κυκλοφορίας του φορτηγού απαιτείται'
	
  },
   insuranceNumber: {
    type: Number,
    required: 'Ο αριθμός ασφάλισης του φορτηγού απαιτείται'
	
  },

 created: {
    type: Date,
    default: Date.now
  },
  

  company:{
	   type: Schema.ObjectId,
		ref: 'Company',
		required: 'Η εταιρεία του φορτηγού απαιτείται'
  }
  
});




mongoose.model('Truck', TruckSchema);