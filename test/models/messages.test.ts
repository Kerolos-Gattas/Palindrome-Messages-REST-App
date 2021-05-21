import { expect } from 'chai';
import { instance, mock, verify, when } from 'ts-mockito';
import Messages from '../../src/models/messages';
import Message from '../../src/models/message';

describe("messages tests", () => {

    const message1 = new Message(1, 'race car');
    const messagesData: Message[] = [message1];
    const messageMock1 = mock(Message);
    const messagesMock: Message[] = [instance(messageMock1)];

    beforeEach(() => {
        when(messageMock1.updateMessage).thenReturn();
        when(messageMock1.copyMessage).thenReturn();
        when(messageMock1.isSameId).thenReturn(() => true);
    })


    it("messages constructor should create", async () => {
        // act 
        const messages = new Messages([]);

        // assert
        expect(messages).not.undefined;
    });

    it("updateMessage should update messages", async () => {
        // arrange 
        const newMessages = new Messages(messagesMock);
        const messages = new Messages([]);

        // act
        messages.updateMessages(newMessages);

        // assert
        expect(messages['messages'].length).equals(1);
    });

    it("getMessage should return correct message", async () => {
        // arrange 
        const messages = new Messages(messagesData);

        // act
        const result = messages.getMessage(1);

        // assert
        expect(result).equals(message1);
    });

    it("addMessage should add the message object", async () => {
        // arrange 
        const newMessage = 'Test message';
        const messages = new Messages([]);

        // act
        messages.addMessage(newMessage);

        // assert
        expect(messages['messages'].length).equals(1);
        expect(messages['messages'][0]['message']).equals(newMessage);
        expect(messages['messages'][0]['id']).equals(1);
        expect(messages['messages'][0]['palindrome']).false;
    });

    it("updateMessage should update message", async () => {
        // arrange 
        const newMessage = 'Test message';
        const messages = new Messages(messagesData);

        // act
        messages.updateMessage(1, newMessage);

        // assert
        expect(messages['messages'].length).equals(1);
        expect(messages['messages'][0]['message']).equals(newMessage);
        expect(messages['messages'][0]['id']).equals(1);
        expect(messages['messages'][0]['palindrome']).false;
    });

    it("deleteMessage should delete message", async () => {
        // arrange 
        const messages = new Messages(messagesData);

        // act
        messages.deleteMessage(1);

        // assert
        expect(messages['messages'].length).equals(0);
    });

    it("validateMessageId should return true when message id exists", async () => {
        // arrange 
        const messages = new Messages([]);
        messages.addMessage('Test message');

        // act
        const result = messages.validateMessageId(1);

        // assert
        expect(result).true;
    });

    it("validateMessageId should return false when message id does not exist", async () => {
        // arrange 
        const messages = new Messages([]);
        messages.addMessage('Test message');

        // act
        const result = messages.validateMessageId(2);

        // assert
        expect(result).false;
    });
});