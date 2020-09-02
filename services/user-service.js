const db = require('../db');
const User = require('../models/user');
const jwt = require('jsonwebtoken');


const defaultPageLimit = 20;

exports.createNewUser = (body) => {
      
    const new_user = new User(body);

    return db.create(new_user);
}

exports.deleteOneUser = (id) => {    
   
    return db.deleteOne(User, {"_id": id});
}

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

exports.getPageOfUsers = (query) => {

    const find_spec = exports.translateQuery2findOptions(query);

    console.log(find_spec.filter)
    console.log(find_spec.projection)
    console.log(find_spec.options)

    return db.find(User, find_spec.filter , find_spec.projection, find_spec.options);
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