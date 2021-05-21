import express = require("express");
import BaseController from "../controllers/baseController";
import BaseMiddleware from "../middleware/baseMiddleware";
import { BaseRoutes } from "./baseRoutes";

export default class MessageRoutes extends BaseRoutes {

    constructor(app: express.Application, messageMiddleware: BaseMiddleware, messageController: BaseController) {
        super(app, messageMiddleware, messageController);
    }

    public configureRoutes(): express.Application {
        this.app
            .route('/messages')
            .get(this.messageController.getData);

        this.app
            .route('/messages')
            .post(this.messageMiddleware.validateRequestParams,
                this.messageController.addData);

        this.app.param('messageId', this.messageMiddleware.extractId);
        this.app
            .route('/messages/:messageId')
            .all(this.messageMiddleware.validateId)
            .get(this.messageController.getDataById)
            .delete(this.messageController.deleteData);

        this.app
            .route('/messages/:messageId')
            .put(this.messageMiddleware.validateId,
                this.messageMiddleware.validateRequestParams,
                this.messageController.updateData);

        return this.app;
    }
}