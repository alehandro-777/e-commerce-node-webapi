const fs = require('fs')
const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const errorHandler = require('./routes/error-handler')

process.env.RSA_PUBLIC_KEY = fs.readFileSync('./keys/public.key');
process.env. RSA_PRIVATE_KEY = fs.readFileSync('./keys/private.key');

const app = express()
const router = require('./routes')

app.use(bodyParser.urlencoded({extended:true}));

app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());
app.use('', router)

app.use('/images', express.static(__dirname + '/uploads'));

// global error handler
app.use(errorHandler);

//console.log(process.env)

console.log('Server started at 3000')

app.listen(3000)