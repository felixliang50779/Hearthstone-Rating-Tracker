import axios from "axios";
import env from "dotenv";
import { DatabaseController } from "./databaseController.js";

const fetchLoop = async () => {
    env.config();

    // Initialize controller for a database at the cluster url we indicate
    const dbController = new DatabaseController(
        process.env.URL, 
        "hearthstone-battlegrounds-records");

    // Get most up-to-date player records
    const TrackedPlayersDocument = await dbController.getDocument(
        "player-records", "TrackedPlayers");
    const TrackedPlayers = TrackedPlayersDocument.players;

    // Initialize counter to track how many players' records
    // we've updated
    const numPlayers = Object.keys(TrackedPlayers).length;
    let playersUpdated = 0;

    const date = new Date();
    const pageRequests = [];

    for (let i = 1; i < 9; i++) {
        const url = `https://hearthstone.blizzard.com/en-us/api/community/leaderboardsData?region=US&leaderboardId=battlegrounds&page=${i}`;
        
        pageRequests.push(axios.get(url));
    }

    // Wait for page requests to resolve concurrently
    const pages = await Promise.all(pageRequests);

    const updatePromises = [];

    for (const page of pages) {
        const pageData = page.data.leaderboard.rows;

        for (const playerData of pageData) {
            const playerRecords = TrackedPlayers[playerData.accountid];
            if (playerRecords) {
                if ((!playerRecords.length) || 
                    (playerRecords.at(-1).rating !== playerData.rating)) {
                        updatePromises.push(dbController.pushToDocument({rank: playerData.rank, 
                            rating: playerData.rating, timeStamp: date}, 
                            "TrackedPlayers", playerData.accountid, "player-records"));
                }
                playersUpdated += 1;

                // We've checked all the players we're tracking
                if (playersUpdated === numPlayers) {
                    break;
                }
            }
        }
        // Don't need to keep searching
        // Break out of the updating loop to optimize performance
        if (playersUpdated === numPlayers) {
            break;
        }
    }

    // If the records were updated, we resolve all the requests
    // and remove any records from > 2 wks ago
    if (updatePromises.length) {
        await Promise.all(updatePromises);
    }

    const clearedRecords = [];

    for (const playerRecord in TrackedPlayers) {
        for (const record of TrackedPlayers[playerRecord]) {
            if (date.getTime() - record.timeStamp.getTime() > 1209600000) {
                clearedRecords.push(
                    dbController.deleteFromDocument(
                        record, "TrackedPlayers", playerRecord, "player-records"));
            }
            else {
                break;
            }
        }
    }
    
    if (clearedRecords.length) {
        await Promise.all(clearedRecords);
    }

    dbController.shutdownClient();

    return TrackedPlayers;

    // res.status(200).send('Success!');
}

export { fetchLoop };