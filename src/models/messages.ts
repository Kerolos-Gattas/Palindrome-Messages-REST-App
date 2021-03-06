import Message from './message';

export default class Messages {
    private messages: Message[];

    constructor(messages: Message[]) {
        this.messages = messages;
    }

    public updateMessages = (messages: Messages): void => {
        for (var i = 0; i < messages.messages.length; ++i) {
            const newMessage = new Message();
            newMessage.copyMessage(messages.messages[i]);
            this.messages.push(newMessage);
        }
    }

    public getMessage = (id: number): Message => {
        const messageIndex = this.getMessageIndex(id);
        const message = this.messages[messageIndex];
        return message;
    }

    public addMessage = (message: string): number => {
        const id = this.messages.length + 1;
        const newMessage = new Message(id, message);
        this.messages.push(newMessage);
        return id;
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

        return index;
    }
}