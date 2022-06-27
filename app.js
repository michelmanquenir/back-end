'use strict';
const express = require('express');
let bodyparser = require('body-parser');
let mongoose = require('mongoose');
let port = process.env.PORT || 4201;
let app = express();
const cors = require('cors');

// middlewares
app.use(cors());
//routes
var user_route = require('./src/routes/user');
const api = require('./src/routes/user');

app.listen(port, () => {
    console.log('Servidor corriendo en el puerto ' + port);
});
//conexion base de datos
/* mongoose.connect('mongodb://127.0.0.1:27017/bancoestado',{useUnifiedTopology: true, useNewUrlParser: true},(err, res) => {
    if (err) {
            console.log(err);
        } else {
            console.log('Conexión a la base de datos establecida');
            app.listen(port, () => {
                console.log('Servidor corriendo en el puerto ' + port);
            
        });
    }
}); */


app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json({limit: '50mb' ,extended: true }));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.use('/api', user_route);
            
module.exports = app;