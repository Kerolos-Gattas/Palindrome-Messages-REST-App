import Message from '../models/message';
import Conversation from '../models/conversation';

export default interface DataManager {
    init: () => Promise<void>;
    addMessage: (message: Message) => Promise<boolean>;
    updateMessage: (orgMessage: Message, newMessage: Message) => Promise<boolean>;
    deleteMessage: (message: Message) => Promise<boolean>;
    getMessage: (message: Message) => Promise<Message>;
    getConversation: (conversation: Conversation) => Promise<Conversation>;
}