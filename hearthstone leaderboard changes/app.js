import express from "express";
import cors from 'cors';
import env from 'dotenv';
import { DatabaseController } from './databaseController.js';

// Global variables
let app;

env.config();

function initializeServer() {
    const PORT = process.env.PORT || 5000;
    app = express();

    const dbController = new DatabaseController(
        process.env.URL, "hearthstone-battlegrounds-records");

    app.use(cors());

    app.get("/", async (req, res) => {
        await dbController.startClient();

        const TrackedPlayersDocument = await dbController.getDocument(
            "player-records", "TrackedPlayers");
        res.send(TrackedPlayersDocument.players);

        dbController.shutdownClient();
    });

    app.listen(PORT, () =>
        console.log(`The server is active and running on port ${PORT}`)
    );
}

initializeServer();
export default app;
