
const PORT = 5000;
const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");
const nodemon = require("nodemon");
const app = express();
let html_data;
TrackedPlayers = [ 'dog', 'Lii', 'SBR', 'jeef', 'BeterBabbit', 'Bofur', 'MATSURI', 'awedragon', 'jkirek'];
TrackPlayerTable = {};
let pagenum=1;
let pageData;
let url;
const date = new Date();
const utcOffset = -4; // Adjust based on daylight saving time

date.setHours(date.getHours() + utcOffset);



fetchLoop().then(() => console.log(TrackPlayerTable));


app.get("/",(req,res)=>res.send(TrackPlayerTable));


app.listen(PORT, () =>
  console.log(`The server is active and running on port ${PORT}`)
);

async function fetchLoop(){
    const requests = [];
    for (let i = 1; i < 11; i++) {
        pagenum = i;
        url = `https://hearthstone.blizzard.com/en-us/api/community/leaderboardsData?region=US&leaderboardId=battlegrounds&page=${pagenum}`;
        
        requests.push(axios.get(url));
    }
    const responses = await Promise.all(requests);
    for (const response of responses) {
        html_data = response.data;
        pageData = html_data.leaderboard.rows;
        let playerRating;
        for (const playerData of pageData) {
            if (TrackedPlayers.includes(playerData.accountid)) {
                playerRating = playerData.rating;

                if (!TrackPlayerTable[playerData.accountid]) {
                    TrackPlayerTable[playerData.accountid] = [];
                }

                TrackPlayerTable[playerData.accountid].push([playerRating,date]);
            }
        }
    }
}

