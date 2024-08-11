import { create } from "domain";
import { createLogger, format, transports } from "winston";


export const logger = createLogger({
    transports:[
        new transports.Console(),
        new transports.File({
            level: "warn",
            filename: "logsWarnings.log",
            dirname: "src/logs"
        }),
        new transports.File({
            level: "error",
            filename: "logsErrors.log",
            dirname: "src/logs"
        }),
        new transports.File({
            level: "info",
            filename: "logsInfo.log",
            dirname: "src/logs"
        }),
    ],
    format: format.combine(
        format.json(),
        format.timestamp(),
        format.prettyPrint()
    ),
})

export const internalErrorLogger = createLogger({
    transports:[
        new transports.File({
            filename: "logsInternalErrors.log",
            dirname: "src/logs"
        }),
    ],
    format: format.combine(
        format.json(),
        format.timestamp(),
        format.prettyPrint()
    ),
})