import axios from 'axios';
import { useState, useEffect } from 'react';
import './App.css';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
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
  function DisplayResult({ fetchResult }) {
    if (!fetchResult) {
      return <p>Loading</p>;
    } else {
      const results = fetchResult.data.dog;
      if (results.length === 0) {
        return <p>No results available</p>;
      }
      let totalScore = 0;
      let numPlayed = 0;
      let totalString="";
      return (
        <div className="App">
          <TableContainer component={Paper}>
            <Table>
              
                <TableRow>
                    <TableCell>Rank</TableCell>
                    <TableCell>Rating</TableCell>
                    <TableCell>Timestamp</TableCell>
                    <TableCell>Rating Difference</TableCell>
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
