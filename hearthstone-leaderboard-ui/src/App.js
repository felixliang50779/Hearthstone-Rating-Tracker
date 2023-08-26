import axios from 'axios';
import { useState, useEffect } from 'react';
import './App.css';

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
            <table>
                <tr>
                    <th>Rank</th>
                    <th>Rating</th>
                    <th>Timestamp</th>
                    <th>Rating Difference</th>
                </tr>
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
                        <tr key={index}>
                            <td>{result.rank}</td>
                            <td>{result.rating}</td>
                            <td>{timeDisplay(result.timeStamp)}</td>
                            <td>{ratingDifference}</td>
                        </tr>
                    )
                })}
            </table>
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
