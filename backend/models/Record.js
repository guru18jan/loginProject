var mongoose = require('mongoose');
var Schema =  mongoose.Schema;

var Detail = new Schema({
  'name': { type: String },
  'phone': { type: Number },
  'password': { type : String,required: true},
  'email': { type: String , required: true },
  'role': { type: String  },
  'userToken' : {type : String },
  'createdAt': { type: Date, default: Date.now },
  'updatedAt': { type: Date, default: Date.now }
});
 
Detail.pre('save', function(next){
  this.updatedAt = Date.now();
  next();
});
 
Detail.pre('update', function() {
  this.update({}, { $set: { updatedAt: new Date() } });
});

module.exports = mongoose.model('Detail', Detail);
 