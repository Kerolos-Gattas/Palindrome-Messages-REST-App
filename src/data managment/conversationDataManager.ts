import Conversation from '../models/conversation';
import Message from '../models/message';
import DataManager from './dataManager';
import isPalindrome from '../utils/palindrome';
import { readFile, writeFile } from './fileOperations';

export default class ConversationDataManager implements DataManager {
    private conversation: Conversation;
    private readonly FILE_PATH: string = './data storage/data.json';

    constructor() {
        this.conversation = new Conversation([]);
    }

    public init = async (): Promise<void> => {
        try {
            const data = await readFile(this.FILE_PATH);
            this.conversation = JSON.parse(data);
        }
        catch (err) {
            // TODO handle file does not exist error, else throw and log
            console.log(err);
        }
    }

    public getMessage = (id: number): Message => {
        const message = this.conversation.getMessage(id);
        return message;
    }

    public getConversation = (): Conversation => {
        return this.conversation;
    }

    public addMessage = async (message: string): Promise<void> => {
        try {
            this.conversation.addMessage(message);
            await this.writeData();
        }
        catch (err) {
            console.log(err);
            return Promise.reject('Failed to add message');
        }
    }

    public updateMessage = async (id: number, newMessage: string): Promise<void> => {
        try {
            this.conversation.updateMessage(id, newMessage);
            await this.writeData();
        }
        catch (err) {
            console.log(err);
            return Promise.reject('Failed to update message');
        }
    }

    public deleteMessage = async (id: number): Promise<void> => {
        try {
            this.conversation.deleteMessage(id);
            await this.writeData();
        }
        catch (err) {
            console.log(err);
            return Promise.reject('Failed to delete message');
        }
    }

    private writeData = async (): Promise<void> => {
        try {
            const data = JSON.stringify(this.conversation);
            await writeFile(this.FILE_PATH, data);
        }
        catch (err) {
            return Promise.reject('Could not write data');
        }
    }
}