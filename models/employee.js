const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let userSchema = new Schema({
    'firstname': { type: String, required: true },
    'lastname': { type: String, required: true },
    'gender': { type: String, required: true },
    'age': { type: String, required: true },
    'department': { type: Schema.ObjectId, ref: 'Departments', required: true },
    'designation': { type: Schema.ObjectId, ref: 'Designation', required: true },
    'contactaddress': { type: String, required: true },
    'contactemail': { type: String, required: true },
    'contactphone': { type: String, required: true },
    'started_at': { type: Date, required: true },
    'resigned_at': { type: Date },
    'created_at': { type: Date, default: Date.now },
    'updated_at': { type: Date, default: Date.now }
});

module.exports = mongoose.model('Employee', userSchema);