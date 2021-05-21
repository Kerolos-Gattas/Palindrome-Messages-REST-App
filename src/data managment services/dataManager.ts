import Message from '../models/message';
import Messages from '../models/messages';

export default interface DataManager {
    init: () => Promise<void>;
    getMessage: (id: number) => Message;
    getMessages: () => Messages;
    addMessage: (message: string) => Promise<number>;
    updateMessage: (id: number, newMessage: string) => Promise<void>;
    deleteMessage: (id: number) => Promise<void>;
}