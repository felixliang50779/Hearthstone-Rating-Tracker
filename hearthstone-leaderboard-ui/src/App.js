// External stuff
import axios from 'axios';
import { CircularProgress } from '@mui/material';
import { useState, useEffect } from 'react';

// Local stuff
// import { DataTable } from './Components/Table/DataTable';
import { LineGraph } from './Components/Graph/LineGraph';
import styles from './App.module.css';


export default function App() {
  const [fetchResult, setFetchResult] = useState(null);
  
  // function timeDisplay(time) {
  //   const dateObject = new Date(time);

  //   const formattedTime = dateObject.toLocaleTimeString('en-US', {
  //     hour: 'numeric',
  //     minute: 'numeric',
  //     hour12: true
  //   });

  //   const formattedYear = dateObject
  //             .toLocaleDateString('en-US', { year: 'numeric' })
  //             .substring(2);

  //   const formattedDate = dateObject.toLocaleDateString('en-US', {
  //     month: 'numeric',
  //     day: 'numeric'
  //   });

  //   return `${formattedDate}/${formattedYear}, ${formattedTime}`;
  // }

  useEffect(() => {
   axios.get(
    "https://leaderboard-tracking-express.vercel.app/").then(
      result => setFetchResult(result.data));
  }, []);
  if (!fetchResult){
    return (
      <div>
        <p>Loading...</p>
        <CircularProgress />
      </div>
    )
  }

  return (
    <div className={styles['dashboard-wrapper']}>
      <LineGraph fetchResult={fetchResult} />  
    </div>
  );
}