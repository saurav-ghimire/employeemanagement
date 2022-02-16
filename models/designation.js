const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let userSchema = new Schema({
    'title': { type: String, required: true },
    'created_at': { type: Date, default: Date.now },
    'updated_at': { type: Date, default: Date.now }
});

module.exports = mongoose.model('Designation', userSchema);