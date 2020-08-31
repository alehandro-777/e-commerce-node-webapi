const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const modelSchema = new Schema({
   name: {
      type: String,
      required: true
    },
   description: {
      type: String,
      default: ''
    },
    _enabled: {
      type: Boolean,
      default: true
    }
});

module.exports = mongoose.model('product_categories', modelSchema);  