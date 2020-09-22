const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const modelSchema = new Schema({
    user:{ type: Schema.Types.ObjectId, ref: 'users' },
    lines : [
        {
            product:{ type: Schema.Types.ObjectId, ref: 'products' },
            quantity: { type: Number, default: 1 },
            sub_total: { type: Number, default: 0 },
        }        
    ],
    count : { type: Number, default: 0 },
    total : { type: Number, default: 0 },
    created_at: { type: Date, default: Date.now },
    enabled: { type: Boolean, default: true},
});

modelSchema.methods.calcTotal = function () {
    this.total = this.lines.reduce(
        (acc,curr) =>{
            curr.sub_total = curr.quantity * curr.product.price;
            return acc + curr.sub_total;
        },
        0
    )
    this.count = this.lines.reduce(
        (acc,curr) =>{
            return acc + curr.quantity;
        },
        0
    )   
}

module.exports = mongoose.model('shopcarts', modelSchema);  