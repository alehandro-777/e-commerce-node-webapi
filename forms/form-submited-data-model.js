const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const modelSchema = new Schema({
  form:{ type: Schema.Types.ObjectId, ref: 'forms' },
  kvp : [ {k: String,  v: String} ],  //key - value pairs
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('form_values', modelSchema);  