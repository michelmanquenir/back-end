'use strict';
const express = require('express');
let app = express();
let bodyparser = require('body-parser');
let mongoose = require('mongoose');
let port = process.env.PORT || 4201;

//create conection to mongodb

mongoose.connect('mongodb://127.0.0.1:27017/bancoestado', (err, res) => {
    if (err) {
            console.log(err);
        } else {
            console.log('Conexión a la base de datos establecida');
            app.listen(port, () => {
                console.log('Servidor corriendo en el puerto ' + port);
            
        });
    }
});
            
module.exports = app;