const db = require('../db');
const ShoppingCart = require('./shopping-cart-model');
const base = require('../shared')

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

exports.getPageOfItems = async  (query) => {
    return await base.getPageOfDocs(ShoppingCart, query);
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
