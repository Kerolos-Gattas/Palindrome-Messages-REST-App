import { expect } from 'chai';
import Message from '../../src/models/message';

describe("message tests", () => {
    it("message constructor should create with empty constructor", async () => {
        // act
        const message = new Message();

        // assert
        expect(message).not.undefined;
    });

    it("message constructor should create with optional args", async () => {
        // act
        const message = new Message(1, 'None');

        // assert
        expect(message).not.undefined;
    });

    it("copyMessage should copy message props into the existing message", async () => {
        // arrange
        const id = 2
        const txt = 'race car';
        const newMessage = new Message(id, txt);
        const message = new Message(1, 'None');

        // act
        message.copyMessage(newMessage);

        // assert
        expect(message['id']).equals(id);
        expect(message['message']).equals(txt);
        expect(message['palindrome']).true;
    });

    it("updateMessage should update message and check for plainrome value", async () => {
        // arrange
        const txt = 'race car';
        const message = new Message(1, 'None');

        // act
        message.updateMessage(txt);

        // assert
        expect(message['id']).equals(1);
        expect(message['message']).equals(txt);
        expect(message['palindrome']).true;
    });

    it("isSameId should return true if the id passed in is the same as the message", async () => {
        // arrange
        const message = new Message(1, 'None');

        // act
        const result = message.isSameId(1);

        // assert
        expect(result).true;
    });

    it("isSameId should return false if the id passed in is the same as the message", async () => {
        // arrange
        const message = new Message(1, 'None');

        // act
        const result = message.isSameId(2);

        // assert
        expect(result).false;
    });
});