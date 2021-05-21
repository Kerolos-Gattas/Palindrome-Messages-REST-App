import FileOperationsErrors from '../errors/fileOperationsErrors';
import Messages from '../models/messages';
import Message from '../models/message';
import DataManager from './dataManager';
import { readFile, writeFile } from './fileOperations';

export default class MessagesDataManager implements DataManager {
    private messages: Messages;
    private readonly FILE_PATH: string = '../data storage/data.json';

    constructor(messages?: Messages) {
        this.messages = messages || new Messages([]);
    }

    public init = async (): Promise<void> => {
        try {
            const data = await readFile(this.FILE_PATH);
            const oldMessages: Messages = JSON.parse(data);
            this.messages.updateMessages(oldMessages);
        }
        catch (err) {
            if (err instanceof FileOperationsErrors) {
                console.log(err.message);
            }
            else {
                throw new err;
            }
        }
    }

    public getMessage = (id: number): Message => {
        const message = this.messages.getMessage(id);
        return message;
    }

    public getMessages = (): Messages => {
        return this.messages;
    }

    public addMessage = async (message: string): Promise<number> => {
        const id = this.messages.addMessage(message);
        await this.writeData();
        return id;
    }

    public updateMessage = async (id: number, newMessage: string): Promise<void> => {
        this.messages.updateMessage(id, newMessage);
        await this.writeData();
    }

    public deleteMessage = async (id: number): Promise<void> => {
        this.messages.deleteMessage(id);
        await this.writeData();
    }

    private writeData = async (): Promise<void> => {
        const data = JSON.stringify(this.messages);
        await writeFile(this.FILE_PATH, data);
    }
}