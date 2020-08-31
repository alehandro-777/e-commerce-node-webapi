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
    category: {
      type: String,
      default: 'unknown'
    },
    price: {
      type: Number,
      default: -1
    },  
    _enabled: {
      type: Boolean,
      default: true
    }
});

module.exports = mongoose.model('products', modelSchema);  