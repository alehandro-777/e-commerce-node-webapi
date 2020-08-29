const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('./routes')
const app = express()




app.use(cors());
// parse requests of content-type - application/json
app.use(bodyParser.json());
app.use('', router)



//console.log(process.env)

console.log('Server started at 3000')

app.listen(3000)