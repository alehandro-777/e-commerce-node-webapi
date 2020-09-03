const db = require('../db');
const User = require('./user-model');
const jwt = require('jsonwebtoken');
const base = require('../shared')



exports.createNewUser = (body) => {
      
    const new_user = new User(body);

    return db.create(new_user);
}

exports.deleteOneUser = (id) => {    
   
    return db.deleteOne(User, {"_id": id});
}

exports.getPageOfUsers = async  (query) => {
    return await base.getPageOfDocs(User, query);
}

exports.updateUser = (id, body) => {
       
    const new_user = new User(body).toObject();
    delete new_user['_id'];

    return db.update(User, {"_id": id}, new_user);
}

exports.findUserById = (id) => {    
   
    return db.findById(User, {"_id": id});
}

exports.login = (body) => {

    return new Promise((resolve, reject) => {
        //validate login And Password
        console.log(body)
        db.findOne(User, {email: body.email, password: body.password})
        .then( 
            (user) => {
                if (user) {
                    console.log(user)
                    const payload = {
                        // Unique user id string
                        sub: user._id,                  
                        name: user.name,
                        role: user.role,                    
                        exp: Math.floor(Date.now() / 1000) + (60 * 10)
                      };

                    const jwtBearerToken = jwt.sign(payload, process.env.RSA_PRIVATE_KEY, { algorithm: 'RS256'});
                    const { password, ...userWithoutPassword } = user.toObject();
                    resolve({
                        user: userWithoutPassword,
                        jwt: jwtBearerToken
                    });
                }
                else {
                    //user not found
                    resolve(null);
                }
            }
        )
        .catch(
            (error) => {
                reject(error);
            }
        );

    });
}