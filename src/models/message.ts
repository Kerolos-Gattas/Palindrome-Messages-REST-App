import isPalindrome from "../utils/palindrome";

export default class Message {
    private id: number;
    private message: string;
    private palindrome: boolean;

    constructor(id: number, message: string) {
        this.id = id;
        this.message = message;
        this.palindrome = isPalindrome(message);
    }

    public updateMessage = (message: string): void => {
        this.message = message;
        this.palindrome = isPalindrome(message);
    }

    public isSameId = (id: number): boolean => {
        return this.id === id;
    }
}