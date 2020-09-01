const db = require('../db');
const mongoose = require('mongoose');
const fs = require('fs')
const ProductImage = require('../models/product-image');

//upsert TODO 
exports.uploadProductImage = (id, files) => {
    const new_ProductImage = new ProductImage({
        product_id : id,
        size: files[0].size,
        mimetype: files[0].mimetype,
        filename: files[0].path
    });

    return db.create(new_ProductImage);
}

exports.uploadProductImages = (id, files) => {
    console.log(id, files)
}

exports.getAllProductImages = () => {
    console.log(product_id)
}

exports.getProductImage = (id) => {
    return db.findOne(ProductImage, {product_id : new mongoose.Types.ObjectId(id) });
}

exports.getImageById = (id) => {
    return db.findById(ProductImage, {_id : id });
}

exports.deleteProductImage = (id) => {
    
    return new Promise((resolve, reject) => {
        db.findById(ProductImage, {_id : id})
        .then(
            (image) => {                
                if (image){
                    const path = process.cwd() + '\\' + image.filename;
                    fs.unlink(
                        path, 
                        (err) => {
                            //if (err) 
                            //    reject(err);
                            //file removed Ok
                            db.deleteOne(ProductImage, {_id : id})
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