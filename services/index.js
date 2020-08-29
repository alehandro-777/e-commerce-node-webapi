const db = require('../db');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path')

const defaultPageLimit = 20;

exports.createNewUser = (body) => {
      
    const new_user = new User(body);

    return db.create(new_user);
}

exports.deleteOneUser = (id) => {    
   
    return db.deleteOne(User, {"_id": id});
}

//#region
/*
Projection:
GET /users/123?fields=username,email (for one specific user)
GET /users?fields=username,email (for a full list of users)

Filtering:
GET /users?country=USA
GET /users?creation_date=2019-11-11
GET /users?creation_date=2019-11-11

Sorting:
GET /users?sort=birthdate_date:asc
GET /users?sort=birthdate_date:desc

Paging:
GET /users?per_page=100
GET /users?page=2

All together:
http://localhost:3000/?country=USA&creation_date=2019-11-11&sort=birthdate_date:desc&page=3&per_page=20

*/

//{ name: /john/i }, 'name friends', { limit:1, skip: 10, sort: {date: 1(ASC or -1 DESC)} } 
//#endregion

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
    console.log(new_user);

    return db.update(User, {"_id": id}, new_user);
}

exports.findUserById = (id) => {    
   
    return db.findById(User, {"_id": id});
}

/*
const expressJwt = require('express-jwt');

const RSA_PUBLIC_KEY = fs.readFileSync('./keys/public.key');

const checkIfAuthenticatedFunc = expressJwt({
    secret: RSA_PUBLIC_KEY
});

*/

exports.login = (body) => {

    return new Promise((resolve, reject) => {
        //get private key
        const private_key_file_path = path.join(__dirname, '../keys/private.key')

        fs.readFile(private_key_file_path, 
            (err, privateKey) =>{              
                if(err) reject(err);
                    //validate login And Password
                    db.findOne(User, {"name": body.login})
                    .then( 
                        (user) => {
                            if (user) {
                                //check password ???
                                user.password === body.password;
                                const jwtBearerToken = jwt.sign({}, privateKey, {
                                    algorithm: 'RS256',
                                    expiresIn: 120,
                                    subject: user._id
                                    });
                                    resolve(jwtBearerToken);
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

            }
        );
    });
}