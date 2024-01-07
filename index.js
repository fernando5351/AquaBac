const app = require('./src/app');

app.listen(app.get('port'),(err)=>{
    try {
        console.info('server is running on: http://localhost:' + app.get('port'));
    } catch (error) {
        console.log(err) 
    }
})
