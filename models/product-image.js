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
   } 
});

module.exports = mongoose.model('product_images', modelSchema);  