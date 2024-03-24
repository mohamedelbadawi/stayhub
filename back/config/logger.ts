import winston from "winston";
import morgan from "morgan";
const { combine, timestamp, json, colorize, align, printf } = winston.format;

const loggerError = winston.createLogger({
  level: "error",
  format: combine(
    colorize({ all: true }),
    timestamp({
      format: "YYYY-MM-DD hh:mm:ss.SSS A",
    }),
    align(),
    printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
  ),
  transports: [new winston.transports.Console()],
});
const loggerHttp = winston.createLogger({
  level: "http",
  format: combine(
    colorize({ all: true }),
    timestamp({
      format: "YYYY-MM-DD hh:mm:ss.SSS A",
    }),
    align(),
    printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
  ),
  transports: [new winston.transports.Console()],
});

const writeHttp = (message: any) => {
  loggerHttp.http(message.trim());
};
const writeError = (message: any) => {
  loggerError.error(message.trim());
};
const httpStream = { write: writeHttp };
const errorStream = { write: writeError };
export { httpStream, errorStream };
