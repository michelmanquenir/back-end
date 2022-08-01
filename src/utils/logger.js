const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  format: format.combine(
    format.splat(),
    format.json(),
    format.timestamp({
      format: 'DD-MM-YYYY HH:mm:ss'
    }),
    format.printf(info => `[${info.timestamp}] [${info.moduleName}] [${info.level}]: ${info.message}`)
  ),
  transports: [
    new transports.File({
      maxsize: 5120000,
      maxFiles: 5,
      filename: `${__dirname}/../logs/bodeLog.log`
    }),
    new transports.Console({
      level: process.env.LEVELLOG || 'debug'
    })
  ]
});

module.exports = function (name) {
  return logger.child({ moduleName: name });
};