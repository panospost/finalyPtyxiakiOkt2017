'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Company Schema
 */
var CompanySchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  companyname: {
    type: String,
    default: '',
    trim: true,
    required: 'Το όνομα της εταιρείας δεν μπορεί να είναι κενό'
  },
  phonenumber: {
    type: Number
  },
  address: {
    type: String,
    
    trim: true,
    required: 'Η διεύθυνση δν είανι κενή'
  },
   city: {
    type: String,
    
    trim: true,
    required: 'City cannot be blank'
  },
   area: {
    type: String,
    
    trim: true,
    required: 'Area cannot be blank'
  },
  latitude:{
			type:String,
			required: 'Latitude is required'
		},
		longitude:{
			type:String,
			required: 'Longitude is required'
		},
		//owner of the company
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  pricepL:{
	  type:Number,
	  required:"Δωστε τιμή λίτρου για πετρέλαιο κίνησης"
  },
   priceTh:{
	  type:Number,
	  //required:"Δωστε τιμή λίτρου για πετρέλαιο θέρμανσης"
  },
  
  truck1:{
	  type: Number
  },
  truck2:{
	  type: Number
  },
  loc1: {
    type: [Number],  // [<longitude>, <latitude>]
    index: '2dsphere'      // create the geospatial index
    },
	//ratings:[{type:Schema.Types.ObjectId,ref:'Ratings'}],

	avgRating:{type:Number,default:0},
	metritis:{type:Number,default:0},
	sum:{type:Number,default:0}
  
  
});
var ratingSchema = new Schema({
  companyId: { type: Schema.Types.ObjectId, ref: 'Company' },
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  rating: { type: Number, required: true }
});

var avgResultSchema = new Schema({
  
  avgRating: Number
});

mongoose.model("avgRating", avgResultSchema, null )
mongoose.model( "Ratings", ratingSchema );
mongoose.model('Company', CompanySchema);