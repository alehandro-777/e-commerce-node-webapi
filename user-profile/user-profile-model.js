const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const modelSchema = new Schema({
  user:{ type: Schema.Types.ObjectId, ref: 'users' },
   email: {
      type: String
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
  image_uri : { type: String, default: ""},
  enabled: { type: Boolean, default: true},
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('user_profiles', modelSchema);  