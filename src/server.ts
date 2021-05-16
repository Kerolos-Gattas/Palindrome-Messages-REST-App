import app from "./app";
import appInit from "./appInit";

// Start server
const server = app.listen(app.get("port"), () => {
    console.log(
        "App is running on http://localhost:%d in %s mode",
        app.get("port"),
        app.get("env")
    );
});

// Initialize application resources
appInit();

export default server;