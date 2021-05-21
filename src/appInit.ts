import app from './app';
import MessageController from './controllers/messageController';
import MessagesDataManager from './data managment services/messagesDataManager';
import MessageMiddleware from './middleware/messageMiddleware';
import MessageRoutes from './routes/messageRoutes';

// Initialize application resources
let appInit = async (): Promise<void> => {
    const messagesDataManager = new MessagesDataManager();
    await messagesDataManager.init();
    const messageMiddleware = new MessageMiddleware(messagesDataManager);
    const messageController = new MessageController(messagesDataManager);
    new MessageRoutes(app, messageMiddleware, messageController);
}

export default appInit;