const winston = require("winston");
const { format } = winston;

var fs = require("fs");
var path = require("path");
var logDir = path.join(process.env.PWD, "log"); // directory path you want to set
if (!fs.existsSync(logDir)) {
    // Create the directory if it does not exist
    fs.mkdirSync(logDir);
}

const FORMAT = format.combine(format.splat(), format.simple());
const LEVEL = Symbol.for("level");
const MESSAGE = Symbol.for("message");

let logger = {};

if (process.env.NODE_ENV === "production") {
    logger = winston.createLogger({
        transports: [
            new winston.transports.File({
                filename: path.join(logDir, "prod.log"),
                format: FORMAT,
                level: "error",
                json: false
            })
        ]
    });
} else {
    const customFormat = format.printf(info => {
        return `${info.message}`;
    });

    logger = winston.createLogger({
        transports: [
            new winston.transports.File({
                filename: path.join(logDir, "dev.log"),
                format: FORMAT,
                json: false
            }),

            new winston.transports.Console({
                json: false,
                format: customFormat,
                //
                // Possible to override the log method of the
                // to use internal transport
                //
                log(info, callback) {
                    setImmediate(() => this.emit("logged", info));

                    if (this.stderrLevels[info[LEVEL]]) {
                        console.error(info[MESSAGE]);

                        if (callback) {
                            callback();
                        }
                        return;
                    }

                    if (console[info[LEVEL]]) {
                        console[info[LEVEL]](info[MESSAGE]);
                    } else if (info[LEVEL] === "info") {
                        console.log(info[MESSAGE]);
                    }

                    if (callback) {
                        callback();
                    }
                }
            })
        ]
    });
}

export default logger;
