import express = require("express");
import BaseController from "../controllers/baseController";
import BaseMiddleware from "../middleware/baseMiddleware";

export abstract class BaseRoutes {
    protected app: express.Application;
    protected messageMiddleware: BaseMiddleware;
    protected messageController: BaseController;

    constructor(app: express.Application, middleware: BaseMiddleware, controller: BaseController) {
        this.app = app;
        this.messageMiddleware = middleware;
        this.messageController = controller;
        this.configureRoutes();
    }

    abstract configureRoutes(): express.Application;
}