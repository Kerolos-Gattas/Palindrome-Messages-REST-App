import Conversation from '../models/conversation';
import Message from '../models/message';
import DataManager from './dataManager';
import isPalindrome from '../utils/palindrome';
import { readFile, writeFile } from './fileOperations';

export default class ConversationDataManager implements DataManager {
    private conversationContent: Conversation;
    private readonly FILE_PATH: string = './data storage/data.json';

    public init = async (): Promise<void> => {
        try {
            const data = await readFile(this.FILE_PATH);
            this.conversationContent = JSON.parse(data);
        }
        catch (err) {
            console.log(err);
            this.conversationContent = { messages: [] };
        }
    }

    public getMessage = async (id: number): Promise<Message> => {
        const messageIndex = this.getMessageIndex(id);
        if (messageIndex != -1) {
            const message = this.conversationContent.messages[messageIndex];
            return message;
        }
        else {
            return Promise.reject('Invalid Id');
        }
    }

    public getConversation = async (): Promise<Conversation> => {
        try {
            return this.conversationContent;
        }
        catch (err) {
            console.log(err);
            return Promise.reject('Failed to retrieve conversation');
        }
    }

    public addMessage = async (message: string): Promise<void> => {
        try {
            const convLength = this.conversationContent.messages.length;
            const palindrome = isPalindrome(message);
            const tempMessage: Message = { id: convLength + 1, message: message, palindrome: palindrome };
            this.conversationContent.messages.push(tempMessage);
            await this.writeData();
        }
        catch (err) {
            console.log(err);
            return Promise.reject('Failed to add message');
        }
    }

    public updateMessage = async (id: number, newMessage: string): Promise<void> => {
        const messageIndex = this.getMessageIndex(id);
        if (messageIndex != -1) {
            const palindrome = isPalindrome(newMessage);
            const id = this.conversationContent.messages[messageIndex].id;
            this.conversationContent.messages[messageIndex] = { id: id, message: newMessage, palindrome: palindrome };
            await this.writeData();
        }
        else {
            return Promise.reject('Invalid Id');
        }
    }

    public deleteMessage = async (id: number): Promise<void> => {
        const messageIndex = this.getMessageIndex(id);
        if (messageIndex != -1) {
            this.conversationContent.messages.splice(messageIndex, 1);
            await this.writeData();
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
            await writeFile(this.FILE_PATH, data);
        }
        catch (err) {
            console.log(err);
            return Promise.reject('Could not write data');
        }
    }
}