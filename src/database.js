const mongoose = require('mongoose');
const logger = require('./utils/logger')('DB');

const URI = process.env.MONGODB_URI 
    ? process.env.MONGODB_URI 
    : 'mongodb://localhost:27017/bancoestado';

mongoose.connect(URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});


const connection = mongoose.connection;
/**
 * Funcion para conectar base de datos
 * @param  {} 'open'
 * @param  {} (
 * @param  {} =>{logger.info('Enlazadoalabasededatos'
 * @param  {} ;}
 */
connection.once('open', () => {
    logger.info('-------------------------------------');
    logger.info('Enlazado a la base de datos');
    logger.info('Se realizo conexion a base de datos: ');
    logger.info(URI);
    logger.info('-------------------------------------');
});