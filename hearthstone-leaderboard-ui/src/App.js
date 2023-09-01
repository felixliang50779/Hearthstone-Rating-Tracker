import axios from 'axios';
import { TableHeader } from './Components/Table/TableHeader';
import { DataTable } from './Components/Table/DataTable';
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
    "http://localhost:5000/").then(
      result => setFetchResult(result));
  }, []);

  return (
    <div>
      <TableHeader fetchResult={fetchResult} />
      <DataTable fetchResult={fetchResult} timeDisplay={timeDisplay} />
    </div>
  );
}

export default App;