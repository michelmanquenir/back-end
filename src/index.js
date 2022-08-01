require('dotenv').config();

const logger = require('./utils/logger')('Index');
const app = require('./app');
require('./database');
/**
 * Funcion Main, arranque de aplicacion y seleccion de puerto
 */
async function main(){
  const puerto = app.get('port');
  await app.listen(puerto);
  logger.info('---------------------------------------');
  logger.info('---------------------------------------');
  logger.info('Se inicia la aplicacion backend de Bode');
  logger.info('server inicia en puerto: ' + puerto);
  logger.info('El nivel de log es : ' + process.env.LEVELLOG || 'debug-default');
  logger.info('---------------------------------------');
}

main();