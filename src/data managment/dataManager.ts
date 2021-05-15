import Message from '../models/message';
import Conversation from '../models/conversation';

export default interface DataManager {
    init: () => boolean;
    getMessage: (id: number) => Promise<Message>;
    getConversation: () => Promise<Conversation>;
    addMessage: (message: string) => Promise<void>;
    updateMessage: (id: number, newMessage: string) => Promise<void>;
    deleteMessage: (id: number) => Promise<void>;
}