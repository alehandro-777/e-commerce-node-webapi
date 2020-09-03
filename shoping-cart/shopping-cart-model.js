const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const modelSchema = new Schema({
    user_id: mongoose.Schema.Types.ObjectId,
    lines : [
        {
            product_id: mongoose.Schema.Types.ObjectId,
            product_img_src: String,
            product_name: String,
            product_descr: String,
            quantity: Number,
            price_one: Number,
            price_line: Number
        }        
    ],
    total : Number,
    created_at: { type: Date, default: Date.now },
    enabled: { type: Boolean, default: true},
});

module.exports = mongoose.model('shopcarts', modelSchema);  