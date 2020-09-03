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
            price_line: { type: Number, default: 0 },
        }        
    ],
    total : { type: Number, default: 0 },
    created_at: { type: Date, default: Date.now },
    enabled: { type: Boolean, default: true},
});

modelSchema.methods.calcTotal = function () {
    console.log(this)
    this.total = this.lines.reduce(
        (acc,curr) =>{
            curr.price_line = curr.quantity * curr.price_one;
            return acc + curr.price_line;
        },
        0
    )
}

module.exports = mongoose.model('shopcarts', modelSchema);  