import express = require("express");
import DataManager from '../data managment services/dataManager';

export default class MessageController {
    private conversationDataManager: DataManager;

    constructor(conversationDataManager: DataManager) {
        this.conversationDataManager = conversationDataManager;
    }

    public getMessage = async (req: express.Request, res: express.Response): Promise<void> => {
        try {
            const id: number = req.body.id;
            const message = this.conversationDataManager.getMessage(id);
            res.status(200).send(message);
        }
        catch (err) {
            console.log(err);
            res.status(500).send('The server encountered an error');
        }
    }

    public getConversation = async (req: express.Request, res: express.Response): Promise<void> => {
        try {
            const conversation = this.conversationDataManager.getConversation();
            res.status(200).send(conversation);
        }
        catch (err) {
            console.log(err);
            res.status(500).send('The server encountered an error');
        }
    }

    public addMessage = async (req: express.Request, res: express.Response): Promise<void> => {
        try {
            const message = req.body.message;
            if (!message) {
                res.status(400).send('Missing message from request body');
            }
            const id = await this.conversationDataManager.addMessage(message);
            res.status(201).send({ id: id });
        }
        catch (err) {
            console.log(err);
            res.status(500).send('The server encountered an error');
        }
    }

    public updateMessage = async (req: express.Request, res: express.Response): Promise<void> => {
        try {
            const message = req.body.message;
            const id = req.body.id;
            if (!message) {
                res.status(400).send('Missing message from request body');
            }
            await this.conversationDataManager.updateMessage(id, message);
            res.status(204).send();
        }
        catch (err) {
            console.log(err);
            res.status(500).send('The server encountered an error');
        }
    }

    public deleteMessage = async (req: express.Request, res: express.Response): Promise<void> => {
        try {
            const id = req.body.id;
            await this.conversationDataManager.deleteMessage(id);
            res.status(204).send();
        }
        catch (err) {
            console.log(err);
            res.status(500).send('The server encountered an error');
        }
    }
}