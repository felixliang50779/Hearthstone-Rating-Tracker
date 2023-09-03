import axios from 'axios';
import styles from './App.module.css'
import { TableHeader } from './Components/Table/TableHeader';
import { DataTable } from './Components/Table/DataTable';
import { LineGraph } from './Components/LineGraph';
import { useState, useEffect } from 'react';

function App() {
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
      result => setFetchResult(result));
  }, []);

  return (
    <div className={styles['dashboard-wrapper']}>
      
      <LineGraph fetchResult={fetchResult} />
      <TableHeader fetchResult={fetchResult} />
      <DataTable fetchResult={fetchResult} timeDisplay={timeDisplay} />
      
    </div>
  );
}

export default App;