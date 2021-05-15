import isPalindrome from "../utils/palindrome";

export default class Message {
    private id: number;
    private message: string;
    private palindrome: boolean;

    constructor(id?: number, message?: string) {
        if (id && message) {
            this.id = id;
            this.message = message;
            this.palindrome = isPalindrome(message);
        }
    }

    public copyMessage = (messageData: Message) => {
        this.id = messageData.id;
        this.message = messageData.message;
        this.palindrome = messageData.palindrome;
    }

    public updateMessage = (message: string): void => {
        this.message = message;
        this.palindrome = isPalindrome(message);
    }

    public isSameId = (id: number): boolean => {
        return this.id === id;
    }
}