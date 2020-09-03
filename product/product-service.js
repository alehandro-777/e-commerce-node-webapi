const db = require('../db');
const Product = require('./product-model');
const base = require('../shared')


exports.createNewProduct = (body) => {
      
    const new_Product = new Product(body);

    return db.create(new_Product);
}

exports.deleteOneProduct = (id) => {    
   
    return db.deleteOne(Product, {"_id": id});
}

exports.getPageOfProducts = async  (query) => {
    return await base.getPageOfDocs(Product, query);
}

exports.updateProduct = (id, body) => {
       
    const new_Product = new Product(body).toObject();
    delete new_Product['_id'];
    console.log(new_Product);

    return db.update(Product, {"_id": id}, new_Product);
}

exports.findProductById = (id) => {    
   
    return db.findById(Product, {"_id": id});
}
