import axios from 'axios';
import { useState, useEffect } from 'react';
import './App.css';
import Table from "@mui/material/Table";

import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import { LineChart } from '@mui/x-charts/LineChart';
import TableRow from "@mui/material/TableRow";
import Paper from '@mui/material/Paper';
function App() {
  const [fetchResult, setFetchResult] = useState(null);
  function timeDisplay(time){
    const dateObject = new Date(time);
    const formattedTime = dateObject.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });
    const formattedYear = dateObject
              .toLocaleDateString('en-US', { year: 'numeric' })
              .substring(2);
    const formattedDate = dateObject.toLocaleDateString('en-US', {
      
      month: 'numeric',
      day: 'numeric'
    });
    return `${formattedDate}/${formattedYear}, ${formattedTime}`;
  }
  function mmrToPlace(ratingInput){
    
    // if (ratingInput===257){
    //   return 2;
    // }
    if (ratingInput>50){
      return 1
    }
    else if (ratingInput>30){
      return 2
    }
    else if (ratingInput>-10){
      return 3
    }
    else if (ratingInput>-30){
      return 4
    }
    else if (ratingInput>-50){
      return 5
    }
    else if (ratingInput>-70){
      return 6
    }
    else if (ratingInput>=-100){
      return 7
    }
    else{
      return 8
    }
  }
  function DisplayResult({fetchResult}) {
    if (!fetchResult) {
      return <p>Loading</p>;
    }
    const results = fetchResult.data.dog;
    let gamesPlayed=0;
    let mmrGained=0
    let totalScore=0;
    
    let previousResult;
    let ratingDifference;
    results.forEach(result => {
      if (gamesPlayed!==0){
        ratingDifference = result.rating - previousResult.rating;
        ratingDifference= result.rating-previousResult.rating;
        totalScore += mmrToPlace(ratingDifference);
        mmrGained += ratingDifference;
      }
      
      
      
      
      gamesPlayed += 1;
      previousResult = result;
    });
    gamesPlayed-= 1;
    return (
      <div>
        {`MMR gained is ${mmrGained}. You played ${gamesPlayed} games. The estimated winrate is ${(totalScore/gamesPlayed).toFixed(3)}. Average MMR gained per game is ${(mmrGained/gamesPlayed).toFixed(3)} `}
        
        <BasicLineChart results={results} />
        <DisplayTable results={results} />
      </div>
    );
  }
  function BasicLineChart({results}) {
    if (!fetchResult) {
      return <p>why is Loading</p>;
    } else {
      let gamesPlayed=0;
      let xAxis=[];
      let yAxis=[];
      results.forEach(result => {
        if (gamesPlayed!==0){
        }
        gamesPlayed+=1;
        xAxis.push(gamesPlayed);
        yAxis.push(result.rating);
      })
    return (
      
      <LineChart
        xAxis={[{ data: xAxis }]}
        series={[
          {
            data: yAxis,
            curve:"linear",
          },
          ]}
          width={1000}
          height={300}
        />
      
        )
      }
  }
  function DisplayTable({ results }) {
    if (!fetchResult) {
      return <p>why is Loading</p>;
    } else {
      
      if (results.length === 0) {
        return <p>No results available</p>;
      }
      
      return (
        <div className="App">
          <TableContainer component={Paper}>
            <Table>
              
                <TableRow>
                    <TableCell>Rank</TableCell>
                    <TableCell>Rating</TableCell>
                    <TableCell>Timestamp</TableCell>
                    <TableCell>Rating Difference</TableCell>
                    <TableCell>Estimated Winrate</TableCell>
                </TableRow>
                {results.map((result, index) => {
                    let previousResult
                    if (index!==0){
                      previousResult = results[index - 1];
                    }
                    else {
                      previousResult = result;
                    }
                    
                    let ratingDifference = result.rating - previousResult.rating;
                    return (
                        <TableRow key={index}>
                            <TableCell>{result.rank}</TableCell>
                            <TableCell>{result.rating}</TableCell>
                            <TableCell>{timeDisplay(result.timeStamp)}</TableCell>
                            <TableCell>{ratingDifference}</TableCell>
                            <TableCell>{mmrToPlace(ratingDifference)}</TableCell>
                        </TableRow>
                    )
                })}
            </Table>
            </TableContainer>
        </div>
    );
    }
  }
  useEffect(() => {
   axios.get(
    "http://localhost:5000/").then(
      result => setFetchResult(result));
    console.log('executed fetch!');
  }, []);

  return (
    <div>
      <DisplayResult fetchResult={fetchResult} />
    </div>
  );
}

export default App;
