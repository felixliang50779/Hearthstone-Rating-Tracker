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
  if (!fetchResult){
    return (
      <div>
        Loading
      </div>
    )
  }
  let results = fetchResult.data.EBFRLH11;
  //let results = fetchResult.data.dog;
  return (
    <div className={styles['dashboard-wrapper']}>
      
      <LineGraph results={results} />
      <TableHeader results={results} />
      <DataTable results={results} timeDisplay={timeDisplay} />
      
    </div>
  );
}

export default App;