import express = require("express");
import DataManager from '../data managment services/dataManager';
import BaseController from "./baseController";

export default class MessageController implements BaseController {
    private conversationDataManager: DataManager;

    constructor(conversationDataManager: DataManager) {
        this.conversationDataManager = conversationDataManager;
    }

    public getDataById = async (req: express.Request, res: express.Response): Promise<void> => {
        try {
            const id = Number(req.body.id);
            const message = this.conversationDataManager.getMessage(id);
            res.status(200).send(message);
        }
        catch (err) {
            console.log(err);
            res.status(500).send('The server encountered an error');
        }
    }

    public getData = async (req: express.Request, res: express.Response): Promise<void> => {
        try {
            const conversation = this.conversationDataManager.getConversation();
            res.status(200).send(conversation);
        }
        catch (err) {
            console.log(err);
            res.status(500).send('The server encountered an error');
        }
    }

    public addData = async (req: express.Request, res: express.Response): Promise<void> => {
        try {
            const message = req.body.message;
            if (!message) {
                res.status(400).send('Missing message from request body');
                return;
            }
            const id = await this.conversationDataManager.addMessage(message);
            res.status(201).send({ id: id });
        }
        catch (err) {
            console.log(err);
            res.status(500).send('The server encountered an error');
        }
    }

    public updateData = async (req: express.Request, res: express.Response): Promise<void> => {
        try {
            const message = req.body.message;
            const id = Number(req.body.id);
            if (!message) {
                res.status(400).send('Missing message from request body');
                return;
            }
            await this.conversationDataManager.updateMessage(id, message);
            res.status(204).send();
        }
        catch (err) {
            console.log(err);
            res.status(500).send('The server encountered an error');
        }
    }

    public deleteData = async (req: express.Request, res: express.Response): Promise<void> => {
        try {
            const id = Number(req.body.id);
            await this.conversationDataManager.deleteMessage(id);
            res.status(204).send();
        }
        catch (err) {
            console.log(err);
            res.status(500).send('The server encountered an error');
        }
    }
}