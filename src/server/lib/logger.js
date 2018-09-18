const winston = require("winston");
const logger = winston.createLogger({
    transports: [
        new winston.transports.Console({ json: false, timestamp: true }),
        new winston.transports.File({
            filename: __dirname + "/log/debug.log",
            json: false
        })
    ]
});

exports.default = logger;
