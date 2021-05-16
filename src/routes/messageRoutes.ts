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
            .route('/conversation')
            .get(this.messageController.getData);

        this.app
            .route('/message')
            .post(this.messageController.addData);

        this.app.param('messageId', this.messageMiddleware.extractId);
        this.app
            .route('/message/:messageId')
            .all(this.messageMiddleware.validateId)
            .get(this.messageController.getDataById)
            .put(this.messageController.updateData)
            .delete(this.messageController.deleteData);

        return this.app;
    }
}