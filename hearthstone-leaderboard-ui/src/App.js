import axios from 'axios';
import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [fetchResult, setFetchResult] = useState(null);
  function DisplayResult({ fetchResult }) {
    if (!fetchResult) {
      return <p>Loading</p>;  
    } else {
      return (
        <div>
          <p>Rank: {fetchResult.data.jeef.at(-1).rank}</p>
          <br />
          <p>Rating: {fetchResult.data.jeef.at(-1).rating}</p>
          <br />
          <p>Time: {fetchResult.data.jeef.at(-1).timeStamp}</p>
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
