// External stuff
import axios from 'axios';
import { useState, useEffect } from 'react';

// Local stuff
import { Dashboard } from './Components/Dashboard/Board/Dashboard';
import styles from './App.module.css';

import 'dracula-ui/styles/dracula-ui.css'

export default function App() {
  const [fetchResult, setFetchResult] = useState(null);
  
  function timeDisplay(time) {
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

  useEffect(() => {
   axios.get(
    "https://leaderboard-tracking-express.vercel.app/").then(
      result => setFetchResult(result.data));
  }, []);
  
  if (!fetchResult){
    return (
      <div className={styles['bouncing-loader']}>
        Loading
        <div />
        <div />
        <div />
      </div>
    )
  }
  

  return (
    <div className={styles['dashboard-wrapper']}>
      <Dashboard fetchResult={fetchResult} timeDisplay={timeDisplay} />
    </div>
  );
}