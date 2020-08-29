const services = require('../services')

exports.postUser = (req, res) => {  

    services.createNewUser(req.body)

    .then( (result) => {
            res.send(result);    
        }
    )
    .catch( (error) => {
        res.status(500).send(error)
        }   
    );    
}
exports.selectUsers = (req, res) => {  
    services.getPageOfUsers(req.query)    
    .then( (result) => {
            res.send(result);    
        }
    )
    .catch( (error) => {
        res.status(500).send(error)
        }   
    );    
}
exports.deleteUser = (req, res) => {  
    
    services.deleteOneUser(req.params.id)    

    .then( (result) => {
            res.send(result);    
        }
    )
    .catch( (error) => {
        res.status(500).send(error)
        }   
    );    
}
exports.updateUser = (req, res) => {  
    
    services.updateUser(req.params.id, req.body)    

    .then( (result) => {
            res.send(result);    
        }
    )
    .catch( (error) => {
        res.status(500).send(error)
        }   
    );    
}
exports.findOneUser = (req, res) => {  
    
    services.findUserById(req.params.id)    

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
exports.login = (req, res) => {
       
    services.login(req.body).then( 
        (jwtBearerToken) => {
            if (jwtBearerToken) {
                res.status(200).json({
                    idToken: jwtBearerToken, 
                    expires: "",
                });    
            }
            else {
                // send status 401 Unauthorized
                res.sendStatus(401); 
            }
    }
    ).catch( 
        (error) => {
            res.status(500).send(error)
        }   
    );    
}