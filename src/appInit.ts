import app from './app';
import MessageController from './controllers/messageController';
import ConversationDataManager from './data managment services/conversationDataManager';
import MessageMiddleware from './middleware/messageMiddleware';
import MessageRoutes from './routes/messageRoutes';

// Initialize application resources
let appInit = async (): Promise<void> => {
    const conversationDataManager = new ConversationDataManager();
    await conversationDataManager.init();
    const messageMiddleware = new MessageMiddleware(conversationDataManager);
    const messageController = new MessageController(conversationDataManager);
    new MessageRoutes(app, messageMiddleware, messageController);
}

export default appInit;