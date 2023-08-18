import axios from 'axios';
import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [fetchResult, setFetchResult] = useState(null);

  useEffect(() => {
   axios.get(
    "https://leaderboard-tracking-express.vercel.app/").then(
      result => setFetchResult(result));
    console.log('executed fetch!');
  }, []);

  return (
    <div>
        {!fetchResult ? "Loading" : `Rank: ${fetchResult.data.jeef[0][0]}`}
        <br />
        {fetchResult && `ELO: ${fetchResult.data.jeef[0][1]}`}
        <br />
        {fetchResult && `Time: ${fetchResult.data.jeef[0][2]}`}
        
    </div>
  );
}

export default App;
