const winston = require("winston");
const { format } = winston;

var fs = require("fs");
var path = require("path");
var logDir = path.join(process.env.PWD, "log"); // directory path you want to set
if (!fs.existsSync(logDir)) {
    // Create the directory if it does not exist
    fs.mkdirSync(logDir);
}

const logger = winston.createLogger({
    level: "info",
    format: format.combine(format.splat(), format.simple()),
    transports: [
        new winston.transports.Console({ json: false, timestamp: true }),
        new winston.transports.File({
            filename: path.join(logDir, "info.log"),
            json: false
        })
    ]
});

export default logger;
