const express = require('express')
const cors = require('cors')
const port = process.env.PORT || 3000
const bodyParser = require('body-parser');
const app = express();
const {routerHandler} = require('./routes/index')

app.set('port', port);


app.use(bodyParser.json());

//cors configuration
var whitelist = ['http://localhost:3000', 'http://localhost:4200', ];
const corsOptionsDelegate = {
    origin: whitelist,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  };

  // routing
routerHandler(app);



app.get('/',(req,res)=>{
    res.status(200).json({
        statusCode: 200,
        message: "We have Water:)",
        data: ['Water']
    })
})


module.exports = app;