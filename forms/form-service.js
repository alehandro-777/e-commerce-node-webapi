const db = require('../db');
const FormCfg = require('./form-cfg-model');
const FormValue = require('./form-submited-data-model');
const base = require('../shared')


exports.create = (body) => {
      
    const new_Product = new FormCfg(body);

    return db.create(new_Product);
}

exports.deleteOne = (id) => {    
   
    return db.deleteOne(FormCfg, {"_id": id});
}

exports.select = async  (query) => {
    return await base.getPageOfDocs(FormCfg, query);
}

exports.update = (id, body) => {
       
    const new_Product = new FormCfg(body).toObject();
    delete new_Product['_id'];
    console.log(new_Product);

    return db.update(FormCfg, {"_id": id}, new_Product);
}

exports.findById = (id) => {    
   
    return db.findById(FormCfg, {"_id": id});
}
