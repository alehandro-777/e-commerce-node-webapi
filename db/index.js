const mongoose = require('mongoose');

exports.create = (model) => {
    return model.save();    
}

exports.upsert = (Model, query, newDoc) => {
    return Model.findOneAndUpdate(query, newDoc, {upsert: true})
}

exports.find = (Model, filter , projection, options) => {
    console.log(filter)
    return Model.find(filter , projection, options);
}

exports.deleteOne = (Model, conditions ) => {
    return Model.deleteOne(conditions);   
}

exports.count = (Model, filter ) => {
    return Model.countDocuments(filter);   
} 

exports.update = (Model, filter, doc, options ) => {
    return Model.updateOne(filter, doc, options);   
} 


exports.findById = (Model, id ) => {
    return Model.findById(id);   
}

exports.findOne = (Model, conditions ) => {
    return Model.findOne(conditions)   
}
