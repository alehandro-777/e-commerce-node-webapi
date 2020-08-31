const db = require('../db');
const ProductCategory = require('../models/Product-Category');

const defaultPageLimit = 20;

exports.createNewProductCategory = (body) => {
      
    const new_ProductCategory = new ProductCategory(body);

    return db.create(new_ProductCategory);
}

exports.deleteOneProductCategory = (id) => {    
   
    return db.deleteOne(ProductCategory, {"_id": id});
}

//#region
/*
Projection:
GET /ProductCategorys/123?fields=ProductCategoryname,email (for one specific ProductCategory)
GET /ProductCategorys?fields=ProductCategoryname,email (for a full list of ProductCategorys)

Filtering:
GET /ProductCategorys?country=USA
GET /ProductCategorys?creation_date=2019-11-11
GET /ProductCategorys?creation_date=2019-11-11

Sorting:
GET /ProductCategorys?sort=birthdate_date:asc
GET /ProductCategorys?sort=birthdate_date:desc

Paging:
GET /ProductCategorys?per_page=100
GET /ProductCategorys?page=2

All together:
http://localhost:3000/?country=USA&creation_date=2019-11-11&sort=birthdate_date:desc&page=3&per_page=20

*/

//{ name: /john/i }, 'name friends', { limit:1, skip: 10, sort: {date: 1(ASC or -1 DESC)} } 
//#endregion

exports.translateQuery2findOptions = (query) => {
    const projection = query.fields ? query.fields.replace(/,/g, " "): null;
    const {page, per_page, sort, ...filter} = query;
    const options = {};

    options.limit = parseInt(per_page) || defaultPageLimit;
    options.skip = (parseInt(page) -1)*options.limit || 0;
    
    //... birthdate_date:asc
    const sort_params = sort ? sort.split(':') : null;

    if (sort_params) {
        const sort_params_obj = {};
        sort_params_obj[sort_params[0]] = sort_params[1].toLowerCase() ==='desc' ? -1 : 1;  
        options.sort = sort_params_obj || null;    
    }

    return {filter, projection, options};
}

exports.getPageOfProductCategories = (query) => {

    const find_spec = exports.translateQuery2findOptions(query);

    console.log(find_spec.filter)
    console.log(find_spec.projection)
    console.log(find_spec.options)

    return db.find(ProductCategory, find_spec.filter , find_spec.projection, find_spec.options);
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
