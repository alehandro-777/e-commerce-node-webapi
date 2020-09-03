const services = require('./product-category-service')

exports.postProductCategory = (req, res) => {  

    services.createNewProductCategory(req.body)

    .then( (result) => {
            res.send(result);    
        }
    )
    .catch( (error) => {
        res.status(500).send(error)
        }   
    );    
}
exports.selectProductCategories = (req, res) => {  
    services.getPageOfProductProductCategories(req.query)    
    .then( (result) => {
            res.send(result);    
        }
    )
    .catch( (error) => {
        res.status(500).send(error)
        }   
    );    
}
exports.deleteProductCategory = (req, res) => {  
    
    services.deleteOneProductCategory(req.params.id)    

    .then( (result) => {
            res.send(result);    
        }
    )
    .catch( (error) => {
        res.status(500).send(error)
        }   
    );    
}
exports.updateProductCategory = (req, res) => {  
    
    services.updateProductCategory(req.params.id, req.body)    

    .then( (result) => {
            res.send(result);    
        }
    )
    .catch( (error) => {
        res.status(500).send(error)
        }   
    );    
}
exports.findOneProductCategory = (req, res) => {  
    const currentProductCategory = req.ProductCategory;

    // only allow admins to access other ProductCategory records
    if (id !== currentProductCategory.sub && currentProductCategory.role !== 'admin') {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    services.findProductCategoryById(req.params.id)    
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
