const app = require('./src/app');
const config = require('./config');

app.listen(app.get('port'),(err)=>{
    try {
        config.isProduction ? "" : console.info('server is running on: http://localhost:' + app.get('port')) ;
    } catch (error) {
        console.log(err) 
    }
})
