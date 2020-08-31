const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const modelSchema = new Schema({
    //lines : [
    //    {
    //        product_id: mongoose.ObjectIds,
    //        quantity: Number
    //    }
    //]
});

module.exports = mongoose.model('shopping-carts', modelSchema);  