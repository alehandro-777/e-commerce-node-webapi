const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  shopcart:{ type: Schema.Types.ObjectId, ref: 'shopcarts' },
   email: {
      type: String
    },
    password: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    // Validation Phone number is defined `DDD-DDD-DDDD`
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
  image_uri : { type: String, default: ""},
  enabled: { type: Boolean, default: true},
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('users', userSchema);  