const db = require('../db');
const Product = require('../models/product');

const defaultPageLimit = 20;

exports.createNewProduct = (body) => {
      
    const new_Product = new Product(body);

    return db.create(new_Product);
}

exports.deleteOneProduct = (id) => {    
   
    return db.deleteOne(Product, {"_id": id});
}

//#region
/*
Projection:
GET /Products/123?fields=Productname,email (for one specific Product)
GET /Products?fields=Productname,email (for a full list of Products)

Filtering:
GET /Products?country=USA
GET /Products?creation_date=2019-11-11
GET /Products?creation_date=2019-11-11

Sorting:
GET /Products?sort=birthdate_date:asc
GET /Products?sort=birthdate_date:desc

Paging:
GET /Products?per_page=100
GET /Products?page=2

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

exports.getPageOfProducts = (query) => {

    const find_spec = exports.translateQuery2findOptions(query);

    console.log(find_spec.filter)
    console.log(find_spec.projection)
    console.log(find_spec.options)

    return db.find(Product, find_spec.filter , find_spec.projection, find_spec.options);
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
