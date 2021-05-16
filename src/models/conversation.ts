import Message from './message';

export default class Conversation {
    private messages: Message[];

    constructor(messages: Message[]) {
        this.messages = messages;
    }

    public updateMessages = (conversation: Conversation): void => {
        for (var i = 0; i < conversation.messages.length; ++i) {
            const newMessage = new Message();
            newMessage.copyMessage(conversation.messages[i]);
            this.messages.push(newMessage);
        }
    }

    public getMessage = (id: number): Message => {
        const messageIndex = this.getMessageIndex(id);
        const message = this.messages[messageIndex];
        return message;
    }

    public addMessage = (message: string): void => {
        const id = this.messages.length + 1;
        const newMessage = new Message(id, message);
        this.messages.push(newMessage);
    }

    public updateMessage = (id: number, newMessage: string): void => {
        const messageIndex = this.getMessageIndex(id);
        this.messages[messageIndex].updateMessage(newMessage);

    }

    public deleteMessage = (id: number): void => {
        const messageIndex = this.getMessageIndex(id);
        this.messages.splice(messageIndex, 1);
    }

    public validateMessageId = (id: number): boolean => {
        return this.getMessageIndex(id) !== -1;
    }

    private getMessageIndex = (id: number): number => {
        let index = -1;

        for (let i = 0; i < this.messages.length; ++i) {
            const message = this.messages[i];
            if (message.isSameId(id)) {
                index = i;
                break;
            }
        }

        if (index === -1) {
            // TODO create error types
            throw new Error('Invalid id');
        }

        return index;
    }
}