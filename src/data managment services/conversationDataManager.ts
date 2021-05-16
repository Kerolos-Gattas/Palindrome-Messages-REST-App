import FileOperationsErrors from '../errors/fileOperationsErrors';
import Conversation from '../models/conversation';
import Message from '../models/message';
import DataManager from './dataManager';
import { readFile, writeFile } from './fileOperations';

export default class ConversationDataManager implements DataManager {
    private conversation: Conversation;
    private readonly FILE_PATH: string = '../data storage/data.json';

    constructor(conversation?: Conversation) {
        this.conversation = conversation || new Conversation([]);
    }

    public init = async (): Promise<void> => {
        try {
            const data = await readFile(this.FILE_PATH);
            const oldConversation: Conversation = JSON.parse(data);
            this.conversation.updateConversation(oldConversation);
        }
        catch (err) {
            if (err instanceof FileOperationsErrors) {
                console.log(err.message);
            }
            else {
                throw new err;
            }
        }
    }

    public getMessage = (id: number): Message => {
        const message = this.conversation.getMessage(id);
        return message;
    }

    public getConversation = (): Conversation => {
        return this.conversation;
    }

    public addMessage = async (message: string): Promise<number> => {
        const id = this.conversation.addMessage(message);
        await this.writeData();
        return id;
    }

    public updateMessage = async (id: number, newMessage: string): Promise<void> => {
        this.conversation.updateMessage(id, newMessage);
        await this.writeData();
    }

    public deleteMessage = async (id: number): Promise<void> => {
        this.conversation.deleteMessage(id);
        await this.writeData();
    }

    private writeData = async (): Promise<void> => {
        const data = JSON.stringify(this.conversation);
        await writeFile(this.FILE_PATH, data);
    }
}