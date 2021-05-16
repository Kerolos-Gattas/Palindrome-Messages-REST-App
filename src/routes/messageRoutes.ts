import express = require("express");
import MessageMiddleware from "../middleware/messageMiddleware";
import { BaseRoutes } from "./baseRoutes";

export default class MessageRoutes extends BaseRoutes {
    private messageMiddleware: MessageMiddleware;

    constructor(app: express.Application, messageMiddleware: MessageMiddleware) {
        super(app);
        this.messageMiddleware = messageMiddleware;
    }

    public configureRoutes = (): express.Application => {

        this.app
            .route('/conversation')
            .get();

        this.app
            .route('/message')
            .post();

        this.app.param('messageId', this.messageMiddleware.extractMessageId);
        this.app
            .route('/message/:messageId')
            .all(this.messageMiddleware.validateMessageId)
            .get()
            .delete()
            .put();

        return this.app;
    }
}