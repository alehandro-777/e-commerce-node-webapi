const services = require('../services/product-service')

exports.postProduct = (req, res) => {  

    services.createNewProduct(req.body)

    .then( (result) => {
            res.send(result);    
        }
    )
    .catch( (error) => {
        res.status(500).send(error)
        }   
    );    
}
exports.selectProducts = (req, res) => {  
    services.getPageOfProducts(req.query)    
    .then( (result) => {
            res.send(result);    
        }
    )
    .catch( (error) => {
        res.status(500).send(error)
        }   
    );    
}
exports.deleteProduct = (req, res) => {  
    
    services.deleteOneProduct(req.params.id)    

    .then( (result) => {
            res.send(result);    
        }
    )
    .catch( (error) => {
        res.status(500).send(error)
        }   
    );    
}
exports.updateProduct = (req, res) => {  
    
    services.updateProduct(req.params.id, req.body)    

    .then( (result) => {
            res.send(result);    
        }
    )
    .catch( (error) => {
        res.status(500).send(error)
        }   
    );    
}
exports.findOneProduct = (req, res) => {  
    services.findProductById(req.params.id)    
    .then( (result) => {
        if (result) {
            res.send(result);    
        }
        else {
            res.status(404).send('Object not found')
        }
    }
    )
    .catch( (error) => {
        res.status(500).send(error)
        }   
    );    
}


