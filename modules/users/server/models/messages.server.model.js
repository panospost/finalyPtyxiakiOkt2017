'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Article Schema
 */
var MessageSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
 user:{
			type:String,
		  required:'απαιτείται ο χρηστης'
	},email:{
			type:String,
			required:'Απατείται email χρηστη'
			
	},
		bodyofMessage:{
			type:String,
			default:"Δεν εδωσε καποιο μυνημα ο χρηστης"
		}
  
});

mongoose.model('Message', MessageSchema);