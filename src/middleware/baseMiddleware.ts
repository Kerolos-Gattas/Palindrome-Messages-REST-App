import express = require("express");

export default interface BaseMiddleware {
    validateId: (req: express.Request, res: express.Response, next: express.NextFunction) => Promise<void>;
    validateRequestParams: (req: express.Request, res: express.Response, next: express.NextFunction) => Promise<void>;
    extractId: (req: express.Request, res: express.Response, next: express.NextFunction) => Promise<void>;
}