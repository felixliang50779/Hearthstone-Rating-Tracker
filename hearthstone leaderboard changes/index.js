const axios = require("axios");
const express = require("express");
const serverless = require('serverless-http');
// Global variables
const TrackPlayerTable = {};
const TrackedPlayers = ['dog', 'Lii', 'jeef', 'BeterBabbit', 'Bofur', 'MATSURI', 'awedragon', 'jkirek'];
let app;

async function fetchLoop() {
    const date = new Date();
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
                    playerList.push([playerData.rating,
                    `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}, ${date.toTimeString().slice(0, 8)}`]);
                }
            }
        }
    }
}

function initializeServer() {
    const PORT = process.env.PORT || 5000;
    app = express();

    app.get("/", (req, res) => res.send(TrackPlayerTable));

    app.listen(PORT, () =>
        console.log(`The server is active and running on port ${PORT}`)
    );
}

// Initialize the Express server
initializeServer();

async function initial() {
    await fetchLoop();
    console.log(TrackPlayerTable);
}

initial();

// Next step is to automate this call at regular intervals
setInterval(async () => {
    await fetchLoop();
    console.log(TrackPlayerTable);
}, 15*60*1000);

exports.handler = serverless(app);