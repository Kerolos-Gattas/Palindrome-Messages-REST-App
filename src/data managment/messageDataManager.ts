import conversation from '../models/conversation';
import message from '../models/message';
import DataManager from './dataManager';

export default class MessageDataManager implements DataManager {
    public addMessage = (message: message): boolean => {
        return true;
    }

    public updateMessage = (orgMessage: message, newMessage: message): boolean => {
        return true;
    }

    public deleteMessage = (message: message): boolean => {
        return true;
    }

    public getMessage = (message: message): message => {
        return { message: '', palindrome: true };
    }

    public getConversation = (conversation: conversation): conversation => {
        return { messages: [] };
    }

}