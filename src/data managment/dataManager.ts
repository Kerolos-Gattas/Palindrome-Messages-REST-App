import Message from '../models/message';
import Conversation from '../models/conversation';

export default interface DataManager {
    init: () => Promise<void>;
    getMessage: (id: number) => Message;
    getConversation: () => Conversation;
    addMessage: (message: string) => Promise<void>;
    updateMessage: (id: number, newMessage: string) => Promise<void>;
    deleteMessage: (id: number) => Promise<void>;
}