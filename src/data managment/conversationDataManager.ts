import Conversation from '../models/conversation';
import Message from '../models/message';
import DataManager from './dataManager';
import { promises } from 'fs';
import * as fs from 'fs';

export default class ConversationDataManager implements DataManager {
    private conversationContent: Conversation;
    private readonly FILE_PATH: string = './data storage/data.json';

    public init = (): boolean => {
        try {
            if (fs.existsSync(this.FILE_PATH)) {
                const data = fs.readFileSync(this.FILE_PATH, 'utf8');
                this.conversationContent = JSON.parse(data);
            }
            else {
                this.conversationContent = { messages: [] };
            }
        }
        catch (err) {
            console.log(err);
            return false;
        }
    }

    public getMessage = async (id: number): Promise<Message> => {
        const messageIndex = this.getMessageIndex(id);
        if (messageIndex != -1) {
            const message = this.conversationContent.messages[messageIndex];
            return Promise.resolve(message);
        }
        else {
            return Promise.reject('Invalid Id');
        }
    }

    public getConversation = async (): Promise<Conversation> => {
        try {
            return Promise.resolve(this.conversationContent);
        }
        catch (err) {
            console.log(err);
            return Promise.reject('Failed to retrieve conversation');
        }
    }

    public addMessage = async (message: string): Promise<void> => {
        try {
            const convLength = this.conversationContent.messages.length;
            const tempMessage: Message = { id: convLength + 1, message: message, palindrome: false };
            this.conversationContent.messages.push(tempMessage);
            await this.writeData();
            return Promise.resolve();
        }
        catch (err) {
            console.log(err);
            return Promise.reject('Failed to add message');
        }
    }

    public updateMessage = async (id: number, newMessage: string): Promise<void> => {
        const messageIndex = this.getMessageIndex(id);
        if (messageIndex != -1) {
            // Check if new message is palindrome
            this.conversationContent.messages[messageIndex].message = newMessage;
            await this.writeData();
            return Promise.resolve();
        }
        else {
            return Promise.reject('Invalid Id');
        }
    }

    public deleteMessage = async (id: number): Promise<void> => {
        const messageIndex = this.getMessageIndex(id);
        if (messageIndex != -1) {
            // Check if new message is palindrome
            this.conversationContent.messages.splice(messageIndex, 1);
            await this.writeData();
            return Promise.resolve();
        }
        else {
            return Promise.reject('Invalid Id');
        }
    }

    private getMessageIndex = (id: number): number => {
        let index = -1;

        for (let i = 0; i < this.conversationContent.messages.length; ++i) {
            const message = this.conversationContent.messages[i];
            if (message.id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    private writeData = async (): Promise<void> => {
        try {
            const data = JSON.stringify(this.conversationContent);
            await promises.writeFile(this.FILE_PATH, data, 'utf8');
            return Promise.resolve();
        }
        catch (err) {
            console.log(err);
            return Promise.reject('Could not write data');
        }
    }
}