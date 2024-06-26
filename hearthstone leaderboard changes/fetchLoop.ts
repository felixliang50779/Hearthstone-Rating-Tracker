import axios from "axios";
import env from 'dotenv';
import { DatabaseController } from "./databaseController";

const fetchLoop = async () => {
    env.config();

    // Initialize controller for a database at the cluster url we indicate
    const dbController = new DatabaseController(
        process.env.URL as string, 
        "hearthstone-battlegrounds-records");

    // Get most up-to-date player records
    const TrackedPlayersDocument = await dbController.getDocument(
        "player-records", "TrackedPlayers");
    const TrackedPlayers = TrackedPlayersDocument?.players;

    // Initialize counter to track how many players' records
    // we've updated
    const numPlayers = Object.keys(TrackedPlayers).length;
    let playersUpdated = 0, firstPage;

    const date = new Date();
    const pageRequests = [];

    for (let i = 1; i > 0; i++) {
        const url = `https://hearthstone.blizzard.com/en-us/api/community/leaderboardsData?region=US&leaderboardId=battlegrounds&page=${i}`;

        if (i === 1) {
            firstPage = await axios.get(url);
            pageRequests.push(firstPage);
        }

        if (i !== 1) {
            pageRequests.push(axios.get(url));
        }

        if (i === firstPage?.data.leaderboard.pagination.totalPages) {
            break;
        }
    }


    // Wait for all page requests to resolve concurrently
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
                else if (playerRecords.at(-1).rank !== playerData.rank) {
                    updatePromises.push(dbController.deleteFromDocument(
                        playerRecords.at(-1), "TrackedPlayers", playerData.accountid, "player-records"));
                    updatePromises.push(dbController.pushToDocument(
                        {rank: playerData.rank, rating: playerData.rating, timeStamp: date},
                        "TrackedPlayers",
                        playerData.accountid,
                        "player-records"
                    ));
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

    dbController.shutdownClient();

    return TrackedPlayers;

    // res.status(200).send('Success!');
}

export { fetchLoop };