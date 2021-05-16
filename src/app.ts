import express = require("express");
import ConversationDataManager from "./data managment services/conversationDataManager";

// Our Express APP config
const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;
app.set("port", port);
const runningMessage = `Server running at http://localhost:${port}`;
app.get('/', (req: express.Request, res: express.Response) => {
    res.status(200).send(runningMessage)
});

//TODO add winston logger
//TODO Test simultaneous add, update and delete
//TODO add comments

// export our app
export default app;