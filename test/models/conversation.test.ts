import { expect } from 'chai';
import { instance, mock, verify, when } from 'ts-mockito';
import Conversation from '../../src/models/conversation';
import Message from '../../src/models/message';

describe("conversation tests", () => {

    const message1 = new Message(1, 'race car');
    const messages: Message[] = [message1];
    const messageMock1 = mock(Message);
    const messagesMock: Message[] = [instance(messageMock1)];

    beforeEach(() => {
        when(messageMock1.updateMessage).thenReturn();
        when(messageMock1.copyMessage).thenReturn();
        when(messageMock1.isSameId).thenReturn(() => true);
    })


    it("conversation constructor should create", async () => {
        // act 
        const conversation = new Conversation([]);

        // assert
        expect(conversation).not.undefined;
    });

    it("updateConversation should update messages", async () => {
        // arrange 
        const newConversation = new Conversation(messagesMock);
        const conversation = new Conversation([]);

        // act
        conversation.updateConversation(newConversation);

        // assert
        expect(conversation['messages'].length).equals(1);
    });

    it("getMessage should return correct message", async () => {
        // arrange 
        const conversation = new Conversation(messages);

        // act
        const result = conversation.getMessage(1);

        // assert
        expect(result).equals(message1);
    });

    it("addMessage should add the message object", async () => {
        // arrange 
        const newMessage = 'Test message';
        const conversation = new Conversation([]);

        // act
        conversation.addMessage(newMessage);

        // assert
        expect(conversation['messages'].length).equals(1);
        expect(conversation['messages'][0]['message']).equals(newMessage);
        expect(conversation['messages'][0]['id']).equals(1);
        expect(conversation['messages'][0]['palindrome']).false;
    });

    it("updateMessage should update message", async () => {
        // arrange 
        const newMessage = 'Test message';
        const conversation = new Conversation(messages);

        // act
        conversation.updateMessage(1, newMessage);

        // assert
        expect(conversation['messages'].length).equals(1);
        expect(conversation['messages'][0]['message']).equals(newMessage);
        expect(conversation['messages'][0]['id']).equals(1);
        expect(conversation['messages'][0]['palindrome']).false;
    });

    it("deleteMessage should delete message", async () => {
        // arrange 
        const conversation = new Conversation(messages);

        // act
        conversation.deleteMessage(1);

        // assert
        expect(conversation['messages'].length).equals(0);
    });

    it("validateMessageId should return true when message id exists", async () => {
        // arrange 
        const conversation = new Conversation([]);
        conversation.addMessage('Test message');
        // act
        const result = conversation.validateMessageId(1);

        // assert
        expect(result).true;
    });

    it("validateMessageId should return false when message id does not exist", async () => {
        // arrange 
        const conversation = new Conversation([]);
        conversation.addMessage('Test message');

        // act
        const result = conversation.validateMessageId(2);

        // assert
        expect(result).false;
    });
});