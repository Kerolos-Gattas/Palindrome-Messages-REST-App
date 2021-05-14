import Message from '../models/message';
import Conversation from '../models/conversation';

export default interface DataManager {
    addMessage: (message: Message) => boolean;
    updateMessage: (orgMessage: Message, newMessage: Message) => boolean;
    deleteMessage: (message: Message) => boolean;
    getMessage: (message: Message) => Message;
    getConversation: (conversation: Conversation) => Conversation;
}