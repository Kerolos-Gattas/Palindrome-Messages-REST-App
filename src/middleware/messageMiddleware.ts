import express = require("express");
import DataManager from "../data managment services/dataManager";
import BaseMiddleware from "./baseMiddleware";

export default class MessageMiddleware implements BaseMiddleware {
    private conversationDataManager: DataManager;

    constructor(conversationDataManager: DataManager) {
        this.conversationDataManager = conversationDataManager;
    }

    public validateId = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
        try {
            const conversation = this.conversationDataManager.getConversation();
            const id = Number(req.params.messageId);

            if (!isNaN(id)) {
                const validId = conversation.validateMessageId(id);
                if (validId) {
                    next();
                }
                else {
                    res.status(400).send({ errors: ['Invalid id'] });
                }
            }
            else {
                res.status(400).send({ errors: ['Id must be a number'] });
            }
        }
        catch (err) {
            console.log(err);
            res.status(500).send('The server encountered an error');
        }
    }

    public extractId = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
        try {
            req.body.id = req.params.messageId;
            next();
        }
        catch (err) {
            console.log(err);
            res.status(500).send('The server encountered an error');
        }
    }
}