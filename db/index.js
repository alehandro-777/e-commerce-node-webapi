const mongoose = require('mongoose');
const connString = 'mongodb://localhost:27017/test';
const connParams = {useNewUrlParser: true,useUnifiedTopology: true };

exports.create = (model) => {
    return new Promise((resolve, reject) => {
        
        mongoose.connect(connString, connParams);

        const db = mongoose.connection;

        db.on('error', (err) => 
            reject(err)
        );        
        db.once('open', () => { 
            model.save()
            .then( (result) => 
                resolve(result)
                )
            .catch( (error) => 
                reject(error)
                )
            .finally( () =>
                db.close()
            )
        });   
    });    
  
}

exports.find = (Model, filter , projection, options) => {
    return new Promise((resolve, reject) => {
        
        mongoose.connect(connString, connParams);

        const db = mongoose.connection;

        db.on('error', (err) => 
            reject(err)
        );        
        db.once('open', () => { 
            Model.find(filter , projection, options)
            .then( (result) =>
                resolve(result)
            )
            .catch( (error) => 
                reject(error)
                )
            .finally( () =>
                db.close()
            )
        });   
    });   
}

exports.deleteOne = (Model, conditions ) => {
    return new Promise((resolve, reject) => {
        
        mongoose.connect(connString, connParams);

        const db = mongoose.connection;

        db.on('error', (err) => 
            reject(err)
        );        
        db.once('open', () => { 
            Model.deleteOne(conditions)
            .then( (result) => 
                resolve(result)
                )
            .catch( (error) => 
                reject(error)
                )
            .finally( () =>
                db.close()
            )
        });   
    });   
}

exports.count = (Model, filter ) => {
    return new Promise((resolve, reject) => {
        
        mongoose.connect(connString, connParams);

        const db = mongoose.connection;

        db.on('error', (err) => 
            reject(err)
        );        
        db.once('open', () => { 
            Model.count(filter)
            .then( (result) => 
                resolve(result)
                )
            .catch( (error) => 
                reject(error)
                )
            .finally( () =>
                db.close()
            )
        });   
    });   
} 

exports.update = (Model, filter, doc, options ) => {
    return new Promise((resolve, reject) => {
        
        mongoose.connect(connString, connParams);

        const db = mongoose.connection;

        db.on('error', (err) => 
            reject(err)
        );        
        db.once('open', () => { 
            Model.updateOne(filter, doc, options)
            .then( (result) => 
                resolve(result)
                )
            .catch( (error) => 
                reject(error)
                )
            .finally( () =>
                db.close()
            )
        });   
    });   
} 

exports.findById = (Model, id ) => {
    return new Promise((resolve, reject) => {
        
        mongoose.connect(connString, connParams);

        const db = mongoose.connection;

        db.on('error', (err) => 
            reject(err)
        );        
        db.once('open', () => { 
            Model.findById(id)
            .then( (result) => 
                resolve(result)
                )
            .catch( (error) => 
                reject(error)
                )
            .finally( () =>
                db.close()
            )
        });   
    });   
}

exports.findOne = (Model, conditions ) => {
    return new Promise((resolve, reject) => {
        
        mongoose.connect(connString, connParams);

        const db = mongoose.connection;

        db.on('error', (err) => 
            reject(err)
        );        
        db.once('open', () => { 
            Model.findOne(conditions)
            .then( (result) => 
                resolve(result)
                )
            .catch( (error) => 
                reject(error)
                )
            .finally( () =>
                db.close()
            )
        });   
    });   
}
