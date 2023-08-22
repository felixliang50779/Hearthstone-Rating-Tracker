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
          <p>Rank: {fetchResult.data.jeef[0][0]}</p>
          <br />
          <p>ELO: {fetchResult.data.jeef[0][1]}</p>
          <br />
          <p>Time: {fetchResult.data.jeef[0][2]}</p>
        </div>
      );
    }
  }
  useEffect(() => {
   axios.get(
    "https://leaderboard-tracking-express.vercel.app/").then(
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
