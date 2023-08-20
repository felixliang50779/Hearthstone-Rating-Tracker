const axios = require("axios");
const express = require("express");
const cors = require("cors");

// Global variables
const TrackPlayerTable = {};
let app;

async function fetchLoop() {
    const TrackedPlayers = ['dog', 'Lii', 'jeef', 'BeterBabbit', 'Bofur', 'MATSURI', 'awedragon', 'jkirek'];

    let date = new Date();
    date = date.toLocaleString("en-US", {timeZone: "America/New_York"});
    const pageRequests = [];

    for (let i = 1; i < 9; i++) {
        const url = `https://hearthstone.blizzard.com/en-us/api/community/leaderboardsData?region=US&leaderboardId=battlegrounds&page=${i}`;
        
        pageRequests.push(axios.get(url));
    }

    const pages = await Promise.all(pageRequests);

    for (const page of pages) {
        const pageData = page.data.leaderboard.rows;

        for (const playerData of pageData) {
            if (TrackedPlayers.includes(playerData.accountid)) {
                if (!TrackPlayerTable[playerData.accountid]) {
                    TrackPlayerTable[playerData.accountid] = [];
                }

                let playerList = TrackPlayerTable[playerData.accountid];
                if ((!playerList.length || 
                    playerList[playerList.length-1][0] !== playerData.rating)) {
                    playerList.push([playerData.rank, playerData.rating,
                    `${date}`]);
                }
            }
        }
    }
}

function initializeServer() {
    const PORT = process.env.PORT || 5000;
    app = express();

    app.use(cors());

    app.get("/", (req, res) => {
        res.send(TrackPlayerTable)
    });

    app.listen(PORT, () =>
        console.log(`The server is active and running on port ${PORT}`)
    );
}

async function initial() {
    await fetchLoop();
    console.log(TrackPlayerTable);
    
    // Initialize the Express server
    initializeServer();
}

initial();

//Next step is to automate this call at regular intervals
// setInterval(async () => {
//     await initial();
// }, 15*60*1000);
