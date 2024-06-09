// External stuff
import axios from 'axios';
import { useState, useEffect} from 'react';

// Local stuff
import { Dashboard } from './Components/Dashboard/Board/Dashboard';
import styles from './App.module.css';

import 'dracula-ui/styles/dracula-ui.css'


export interface FetchResult {
  [key: string]: any[]
}

export default function App() {
  const [fetchResult, setFetchResult] = useState({} as FetchResult);
  const [connectionError, setConnectionError] = useState(null);
  
  function timeDisplay(time: string) {
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
      result => setFetchResult(result.data),
      error => {
        console.log(error);
        setConnectionError(error);
      });
  }, []);

  if ((Object.keys(fetchResult).length === 0) && (connectionError)) {
    return (
      connectionError['code'] === "ERR_NETWORK" ?
      <div className={styles['error-msg']}>
        A Network Error Occurred - Please Check Your Internet Connection And Refresh the Page
      </div> :
      <div className={styles['error-msg']}>
        An Unknown Error Occurred - The Tracker API May Be Down
      </div>
    );
  }

  if ((Object.keys(fetchResult).length === 0) && (!connectionError)) {
    return (
      <div className={styles['bouncing-loader']}>
        Loading
        <div className={styles['first-dot']} />
        <div />
        <div />
      </div>
    );
  }



  return (
    <div className={styles['dashboard-wrapper']}>
      <Dashboard fetchResult={fetchResult} timeDisplay={timeDisplay} />
    </div>
  );
}