const db = require('../db');
const FormValue = require('./form-submited-data-model');
const base = require('../shared')


exports.create = (body) => {
      
    const new_Product = new FormValue(body);

    return db.create(new_Product);
}

exports.deleteOne = (id) => {    
   
    return db.deleteOne(FormValue, {"_id": id});
}

exports.select = async  (query) => {
    return await base.getPageOfDocs(FormValue, query);
}

exports.update = (id, body) => {
       
    const new_Product = new FormValue(body).toObject();
    delete new_Product['_id'];
    console.log(new_Product);

    return db.update(FormValue, {"_id": id}, new_Product);
}

exports.findById = (id) => {    
   
    return db.findById(FormValue, {"_id": id});
}
