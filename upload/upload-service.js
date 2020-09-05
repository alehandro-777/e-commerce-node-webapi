const db = require('../db');
const mongoose = require('mongoose');
const fs = require('fs')
const Image = require('./upload-item-model');
const base = require('../shared')

exports.uploadOneImage = (files) => {

    console.log(files[0])

    const new_Image = new Image({
        size: files[0].size,
        mimetype: files[0].mimetype,
        destination: files[0].destination,
        filename: files[0].filename,
        path: files[0].path
    });

    return db.create(new_Image);
}

exports.uploadManyImages = (files) => {
}


exports.deleteOneImage = (id) => {
    
    return new Promise((resolve, reject) => {
        db.findById(Image, {_id : id})
        .then(
            (image) => { 
                             
                if (image){
                    
                    const path = process.cwd() + '\\' + image.path;
                    fs.unlink(
                        path, 
                        (err) => {
                            //if (err) 
                            //    reject(err);
                            //file removed Ok
                            db.deleteOne(Image, {_id : id})
                            .then(
                                (result) => {
                                    resolve(result);
                                }
                            )
                        })
                }
                else resolve(image);
            }
        )
        .catch(
            (err) => { 
                reject(err); 
            }
        );    
    })   
    
}

exports.getPageOfImages = async  (query) => {
    return await base.getPageOfDocs(Image, query);
}