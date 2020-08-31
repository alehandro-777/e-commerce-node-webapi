const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const modelSchema = new Schema({
   //product_id: mongoose.ObjectIds,
   name: String, 
   desc: String,
   width: Number,
   height: Number,
   img: 
   { 
       data: Buffer, 
       contentType: String 
   } 
});

module.exports = mongoose.model('product_images', modelSchema);  