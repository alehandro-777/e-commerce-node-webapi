const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const modelSchema = new Schema({
    lines : [
        {
            product_id: mongoose.Schema.Types.ObjectId,
            quantity: Number
        }        
    ],
    total : Number,
});

module.exports = mongoose.model('shopcarts', modelSchema);  