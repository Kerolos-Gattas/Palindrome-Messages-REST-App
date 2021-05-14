import Conversation from '../models/conversation';
import Message from '../models/message';
import DataManager from './dataManager';
import * as fs from 'fs';

export default class ConversationDataManager implements DataManager {
    private conversationContent: string;
    private readonly FILE_PATH: string = './data.json';

    public init = async (): Promise<void> => {

    }

    public addMessage = async (message: Message): Promise<boolean> => {
        return true;
    }

    public updateMessage = async (orgMessage: Message, newMessage: Message): Promise<boolean> => {
        return true;
    }

    public deleteMessage = async (message: Message): Promise<boolean> => {
        return true;
    }

    public getMessage = async (message: Message): Promise<Message> => {
        return { message: '', palindrome: true };
    }

    public getConversation = async (conversation: Conversation): Promise<Conversation> => {
        return { messages: [] };
    }

}