const express = require('express')
const port = process.env.PORT || 3000
const app = express();

app.set('port', port);
app.get('/',(req,res)=>{
    res.status(200).json({
        statusCode: 200,
        message: "We have Water:)",
        data: ['Water']
    })
})


module.exports = app;