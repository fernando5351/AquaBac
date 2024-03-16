const express = require('express')
const cors = require('cors')
const passport = require('passport');
const localStrategy = require('./auth/strategies/local.strategy');
const port = process.env.PORT || 3000
const bodyParser = require('body-parser');
const {authorizeRoles} = require('../middlewares/authorizeRoles');
const {errorHandler,logErrors,ormErrorHandler,boomErrorHandler} = require('../middlewares/errorsHandler')
const app = express();

const {routerHandler} = require('./routes/index')

app.set('port', port);


app.use(bodyParser.json());  

//cors configuration
var whitelist = ['http://localhost:3000', 'http://localhost:4200' ];
const corsOptionsDelegate = {
    origin: whitelist,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  };

  // routing
  app.use(cors(corsOptionsDelegate));
  require('./auth/index');
routerHandler(app);

app.get('/',(req,res)=>{
    res.status(200).json({
        statusCode: 200,
        message: "We have Water:)",
        data: [{
            status: 200,
            message: 'we have up',
            data: 'Water'
        }]
    })
})

passport.use(localStrategy)


//middlewares
app.use(authorizeRoles);
app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);


module.exports = app;