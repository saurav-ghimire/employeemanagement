const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let userSchema = new Schema({
   'name': { type: String, required: true },
   'username': { type: String, required: true },
   'email': { type: String, required: true },
   'password': { type: String, required: true },
   'status': { type: String, default: 'inactive' },
   'token': { type: String },
   'image': { type: String },
   'tokenExpiry': { type: Date },
   'created_at': { type: Date, default: Date.now },
   'updated_at': { type: Date, default: Date.now }
});


module.exports = mongoose.model('User', userSchema);