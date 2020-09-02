const db = require('../db');
const ShoppingCart = require('../models/shopping-cart');
const mongoose = require('mongoose');

const defaultPageLimit = 20;

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

exports.findById = (id) => {       
    return db.findById(ShoppingCart, {"_id": id});
}

exports.createNewCart = (body) => {
      
    const new_Instance = new ShoppingCart(body);

    return db.create(new_Instance);
}

exports.deleteCart = (id) => {       
    return db.deleteOne(ShoppingCart, {"_id": id});
}

exports.clear = (id) => {       
    return db.deleteOne(ShoppingCart, {"_id": id});
}

exports.getPageOfItems = (query) => {

    const find_spec = exports.translateQuery2findOptions(query);
    return db.find(ShoppingCart, find_spec.filter , find_spec.projection, find_spec.options);
}

exports.addProduct = (id, body) => {    
        //find cart
        return db.findById(ShoppingCart, {"_id": id}).then(
            (cartModel) => {
                if (!cartModel) return null;
                //find product in cart
                const line_index = cartModel.lines.findIndex( (line)=>{
                    const match = body.product_id == line.product_id;
                    console.log(line.product_id, body.product_id, match);
                    return match;
                } );
                //product  exists in cart
                if (line_index > -1) {        
                    cartModel.lines[line_index].quantity += 1;                        
                } else {//product doesn't exist in cart
                    const new_line = { product_id :  body.product_id, quantity: 1};
                    cartModel.lines.push(new_line);
                }                      
                cartModel.save((err)=> {
                    if(err) throw err;                    
                });
                return cartModel;
            }            
        );                      
}

exports.removeProduct = (id, body) => {    
    //find cart
    return db.findById(ShoppingCart, {"_id": id}).then(
        (cartModel) => {
            if (!cartModel) return null;
            //find product in cart
            const line_index = cartModel.lines.findIndex( (line)=>{
                const match = body.product_id == line.product_id;
                console.log(line.product_id, body.product_id, match);
                return match;
            } );
            //product  exists in cart
            if (line_index > -1) {        
                cartModel.lines[line_index].quantity -= 1;
                //remove from cart
                console.log(line_index, cartModel.lines[line_index].quantity)
                if (cartModel.lines[line_index].quantity < 1) {
                    console.log(cartModel.lines.length)
                    cartModel.lines = (cartModel.lines.length > 1) ? cartModel.lines.splice(line_index, 1) : []; 
                }
            } else {//product doesn't exist in cart
                throw new Error(`product doesn't exist in cart`);
            }                      
            cartModel.save((err)=> {
                if(err) throw err;                
            });
            return cartModel;
        }            
    );                      
}

exports.removeAll = (id) => {    
    //find cart
    return db.findById(ShoppingCart, {"_id": id}).then(
        (cartModel) => {
            if (!cartModel) return null;
            cartModel.lines = [];
            cartModel.save((err)=> {
                if(err) throw err;                
            });
            return cartModel;
        }            
    );                      
}
