import express = require("express");
import DataManager from '../data managment services/dataManager';
import BaseController from "./baseController";

export default class MessageController implements BaseController {
    private messagesDataManager: DataManager;

    constructor(messagesDataManager: DataManager) {
        this.messagesDataManager = messagesDataManager;
    }

    public getDataById = async (req: express.Request, res: express.Response): Promise<void> => {
        try {
            const id = Number(req.body.id);
            const message = this.messagesDataManager.getMessage(id);
            res.status(200).send(message);
        }
        catch (err) {
            console.log(err);
            res.status(500).send('The server encountered an error');
        }
    }

    public getData = async (req: express.Request, res: express.Response): Promise<void> => {
        try {
            const messages = this.messagesDataManager.getMessages();
            res.status(200).send(messages);
        }
        catch (err) {
            console.log(err);
            res.status(500).send('The server encountered an error');
        }
    }

    public addData = async (req: express.Request, res: express.Response): Promise<void> => {
        try {
            const message = req.body.message;
            const id = await this.messagesDataManager.addMessage(message);
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
            await this.messagesDataManager.updateMessage(id, message);
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
            await this.messagesDataManager.deleteMessage(id);
            res.status(204).send();
        }
        catch (err) {
            console.log(err);
            res.status(500).send('The server encountered an error');
        }
    }
}