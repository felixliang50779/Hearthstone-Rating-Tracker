const axios = require("axios");
const express = require("express");

// Global data
const TrackedPlayers = ['dog', 'Lii', 'SBR', 'jeef', 'BeterBabbit', 'Bofur', 'MATSURI', 'awedragon', 'jkirek'];
const TrackPlayerTable = {};
const date = new Date();
let url;

async function fetchLoop() {
    const pageRequests = [];
    for (let i = 1; i < 11; i++) {
        url = `https://hearthstone.blizzard.com/en-us/api/community/leaderboardsData?region=US&leaderboardId=battlegrounds&page=${i}`;
        
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
                TrackPlayerTable[playerData.accountid].push([playerData.rating,
                    `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}, ${date.toTimeString().slice(0, 8)}`]);
            }
        }
    }
}

function initializeServer() {
    const PORT = 5000;
    const app = express();

    app.get("/", (req,res)=>res.send(TrackPlayerTable));

    app.listen(PORT, () =>
        console.log(`The server is active and running on port ${PORT}`)
    );
}

// Initialize the Express server
initializeServer();

// Next step is to automate this call at regular intervals
fetchLoop().then(() => console.log(TrackPlayerTable));


