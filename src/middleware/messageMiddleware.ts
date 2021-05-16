import express = require("express");
import ConversationDataManager from "../data managment services/conversationDataManager";

export default class MessageMiddleware {
    private conversationDataManager: ConversationDataManager;

    constructor(conversationDataManager: ConversationDataManager) {
        this.conversationDataManager = conversationDataManager;
    }

    public validateMessageId = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
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

    public extractMessageId = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        req.body.id = req.params.messageId;
        next();
    }
}