const appRoot = require('app-root-path');
const winston = require('winston');

var options = {
    file: {
        level: 'info',
        filename: `${appRoot}/logs/csye6225.log`,
        handleExceptions: true,
        json: true,
        maxsize: 4194304,
        maxFiles: 5,
        colorize: false,
    },
    console: {
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: true,
    },
};

const logFormat = winston.format.combine(
    winston.format.timestamp(),
    winston.format.align(),
    winston.format.printf(
        info => `TIMESTAMP: ${info.timestamp}, LEVEL:  ${info.level}, MESSAGE: ${info.message}`
    ),
);

var logger = new winston.createLogger({
    format : logFormat,
    transports: [
        new winston.transports.File(options.file),
        new winston.transports.Console(options.console)
    ],
    exitOnError: false,
});


logger.stream = {
    write: function(message, encoding) {
        logger.info(message);
    },
};

module.exports = logger;