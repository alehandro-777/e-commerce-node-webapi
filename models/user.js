const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
   name: {
      type: String,
      required: true
    },
   email: {
      type: String,
      unique: true
    },
   password: String,
// Validation succeeds! Phone number is defined
// and fits `DDD-DDD-DDDD`
   phone: {
      type: String,
      validate: {
        validator: function(v) {
          return /\d{3}-\d{3}-\d{4}/.test(v);
        }}},
   role: {
      type: String,
      enum : ['user','admin'],
      default: 'user'
  },
   _enabled: Boolean
});

module.exports = mongoose.model('users', userSchema);  