var mongoose = require('mongoose');
var Schema =  mongoose.Schema;

var Record = new Schema({
  'name': { type: String },
  'phone': { type: Number },
  'password': { type : String,required: true},
  'email': { type: String , required: true },
  'role': { type: String  },
  'userToken' : {type : String },
  'createdAt': { type: Date, default: Date.now },
  'updatedAt': { type: Date, default: Date.now }
});
 
Record.pre('save', function(next){
  this.updatedAt = Date.now();
  next();
});
 
Record.pre('update', function() {
  this.update({}, { $set: { updatedAt: new Date() } });
});

module.exports = mongoose.model('Record', Record);
 