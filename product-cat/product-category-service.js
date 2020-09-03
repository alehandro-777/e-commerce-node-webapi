const db = require('../db');
const ProductCategory = require('./product-category-model');
const base = require('../shared')

exports.createNewProductCategory = (body) => {
      
    const new_ProductCategory = new ProductCategory(body);

    return db.create(new_ProductCategory);
}

exports.deleteOneProductCategory = (id) => {    
   
    return db.deleteOne(ProductCategory, {"_id": id});
}
exports.getPageOfProductProductCategories = async  (query) => {
    return await base.getPageOfDocs(ProductCategory, query);
}

exports.updateProductCategory = (id, body) => {
       
    const new_ProductCategory = new ProductCategory(body).toObject();
    delete new_ProductCategory['_id'];
    console.log(new_ProductCategory);

    return db.update(ProductCategory, {"_id": id}, new_ProductCategory);
}

exports.findProductCategoryById = (id) => {    
   
    return db.findById(ProductCategory, {"_id": id});
}
