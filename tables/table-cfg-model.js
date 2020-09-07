const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const modelSchema = new Schema({
  title : String,            // title  name
  header: [{}],
  row_cfg:[ {} ],
  footer: [{}],
  enabled: { type: Boolean, default: true},
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('cfg_tables', modelSchema);  