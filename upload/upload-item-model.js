const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const modelSchema = new Schema({
   product_id: mongoose.Schema.Types.ObjectId,
   width: Number,
   height: Number,
   size: Number,
   mimetype: String,
   filename: 
   { 
       type: String, 
       require: true 
   },
   created_at: { type: Date, default: Date.now },
   enabled: { type: Boolean, default: true}, 
});

module.exports = mongoose.model('images', modelSchema);  