const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const modelSchema = new Schema({

  table_cfg:{ type: Schema.Types.ObjectId, ref: 'cfg_tables' },
  data: { },
  created_at: { type: Date, default: Date.now }

});

module.exports = mongoose.model('table_datarows', modelSchema);  

