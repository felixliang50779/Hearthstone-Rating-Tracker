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
      return (
        <div>
          {results.map((result, index) => {
            
            
            
            if (index === 0) {
              // First result, display as is
              let timeStamp = timeDisplay(results.at(-1).timeStamp);
              
              return (
                <div key={index}>
                  <p>Rank: {results.at(-1).rank}</p>
                  
                  <p>Rating: {results.at(-1).rating}</p>
                  
                  <p>Time: {timeStamp}</p>
                   
                  <p>Rating Changes:</p>
                  
                  <p>
                    {results.at(0).rating} is the starting rating
                  </p>
                </div>
              );
            }
            
            else {
            const previousResult = results[index - 1];
            let ratingDifference = result.rating - previousResult.rating;
            if (ratingDifference>0){
              ratingDifference = `+${ratingDifference}`
            }
            const timeStamp = timeDisplay(result.timeStamp);
            let placement = mmrToPlace(ratingDifference);
            totalScore += placement;
            
            numPlayed += 1;
            // Format the rating and rating difference
           
              let displayString = `${ratingDifference} | ${result.rating} | 'Your placement was ${placement} | ${timeStamp}`;
              return (
                <div key={index}>
                  <p>
                    {`${displayString}`}
                  </p>
                  {index === results.length - 1 && ( // Check if it's the last index
                    <p>
                      {`Your winrate is ${(totalScore/numPlayed).toFixed(2)}`} {/* Calculate and display the winrate */}
                    </p>
                  )}
                </div>
              );
            }
          })}
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
