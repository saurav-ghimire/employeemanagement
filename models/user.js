const bcrypt = require('bcryptjs');

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
   'role_id': { type: Schema.ObjectId, ref: 'Role' },
   'created_at': { type: Date, default: Date.now },
   'updated_at': { type: Date, default: Date.now }
});

userSchema.pre('save', function (next) {
   let user = this;
   if (!user.isModified('password')) { return next(); }

   user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
   next();
});
userSchema.methods.verifyPassword = function (password) {
   return bcrypt.compareSync(password, this.password);
};


module.exports = mongoose.model('User', userSchema);