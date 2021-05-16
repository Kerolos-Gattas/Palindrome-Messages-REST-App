import express = require("express");
import MessageController from "../controllers/messageController";
import MessageMiddleware from "../middleware/messageMiddleware";
import { BaseRoutes } from "./baseRoutes";

export default class MessageRoutes extends BaseRoutes {
    private messageMiddleware: MessageMiddleware;
    private messageController: MessageController;

    constructor(app: express.Application, messageMiddleware: MessageMiddleware, messageController: MessageController) {
        super(app);
        this.messageMiddleware = messageMiddleware;
        this.messageController = messageController;
    }

    public configureRoutes = (): express.Application => {

        this.app
            .route('/conversation')
            .get(this.messageController.getConversation);

        this.app
            .route('/message')
            .post(this.messageController.addMessage);

        this.app.param('messageId', this.messageMiddleware.extractMessageId);
        this.app
            .route('/message/:messageId')
            .all(this.messageMiddleware.validateMessageId)
            .get(this.messageController.getMessage)
            .patch(this.messageController.updateMessage)
            .delete(this.messageController.deleteMessage);

        return this.app;
    }
}