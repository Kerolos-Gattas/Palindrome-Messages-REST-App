import express = require("express");

export abstract class BaseRoutes {
    protected app: express.Application;

    constructor(app: express.Application) {
        this.app = app;
        this.configureRoutes();
    }

    abstract configureRoutes(): express.Application;
}