import express = require("express");
import * as winston from 'winston';
import * as expressWinston from 'express-winston';

const loggerOptions: expressWinston.LoggerOptions = {
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
        winston.format.json(),
        winston.format.prettyPrint(),
        winston.format.colorize({ all: true })
    ),
};

// Our Express APP config
const app = express();
app.use(expressWinston.logger(loggerOptions));
app.use(express.json());
const port = process.env.PORT || 3000;
app.set("port", port);
const runningMessage = `Server running at http://localhost:${port}`;
app.get('/', (req: express.Request, res: express.Response) => {
    res.status(200).send(runningMessage)
});

//TODO Test simultaneous add, update and delete
//TODO add comments

// export our app
export default app;