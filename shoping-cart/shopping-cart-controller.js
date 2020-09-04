const services = require('./shopping-cart-service')

//POST id - shoping cart { "product_id": "5f51ea5dc4fb441d4c85739e" }
exports.addProduct = (req, res) => {  

    services.addProduct(req.params.id, req.body)
    .then( (result) => {
            res.send(result);    
        }
    )
    .catch( (error) => {
        res.status(500).send(error)
        }   
    );    
}

//DELETE id - shoping cart { "product_id": "5f51ea5dc4fb441d4c85739e" }
exports.removeLine = (req, res) => {  

    services.removeLine(req.params.id, req.params.line_id)
    .then( (result) => {
            res.send(result);    
        }
    )
    .catch( (error) => {
        res.status(500).send(error)
        }   
    );    
}

exports.removeAll = (req, res) => {  
    services.removeAll(req.params.id)
    .then( (result) => {
            res.send(result);    
        }
    )
    .catch( (error) => {
        res.status(500).send(error)
        }   
    );    
}
//PATCH id - shoping cart { "product_id": "5f51ea5dc4fb441d4c85739e", "quantity" : 10 }
exports.changeLine = (req, res) => {  
    services.changeProductQuantity(req.params.id,req.params.line_id, req.body)
    .then( (result) => {
            res.send(result);    
        }
    )
    .catch( (error) => {
        res.status(500).send(error)
        }   
    );    
}


exports.create = (req, res) => {  

    services.createNewCart(req.body)

    .then( (result) => {
            res.send(result);    
        }
    )
    .catch( (error) => {
        res.status(500).send(error)
        }   
    );    
}

exports.selectPage = (req, res) => {  
    services.getPageOfItems(req.query)    
    .then( (result) => {
            res.send(result);    
        }
    )
    .catch( (error) => {
        res.status(500).send(error)
        }   
    );    
}
