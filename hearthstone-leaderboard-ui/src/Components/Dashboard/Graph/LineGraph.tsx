// External stuff
import { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { Text } from "dracula-ui";

// Internal stuff
import { GraphHeader } from './GraphHeader';
import './LineGraph.css';


interface Props {
  fetchResult: any,
  selectPlayer: any
}

export function LineGraph({ fetchResult, selectPlayer }: Props) {
  const [,setValue] = useState(0); // integer state

  const [selectedPlayer, setSelectedPlayer] = selectPlayer;

  const graphOptions =
  {
    colors: ["#50fa7b"],
    stroke: {
      width: 3.5,
      curve: "smooth"
    },
    chart: {
      animations: {
        easing: 'easeout',

        dynamicAnimation: {
          enabled: true,
          speed: 500
        }
      },
      toolbar: {
        tools: {
          download: false
        }
      }
    },
    xaxis: {
      type: "datetime",
      labels: {
        style: {
          colors: "white"
        },
        datetimeFormatter: {
          year: 'yyyy',
          month: 'MMM \'yy',
          day: 'dd MMM',
          hour: 'HH:mm'
        },
        datetimeUTC: false
      },
      categories: fetchResult[selectedPlayer].map((record: 
        {rank: string, rating: number, ratingChange: string, timeStamp: string}) => { 
          return Date.parse(record.timeStamp);
      })
    },
    yaxis: {
      labels: {
        style: {
          colors: "white"
        }
      }
    },
    tooltip: {
      x: {
        show: true,
        format: "M/d/yy, h:mm TT"
      }
    }
  } as ApexOptions;

  const graphConfig =
  {
    series: [{
      name: "Rating",
      data: fetchResult[selectedPlayer].map((record: 
        {rank: string, rating: number, ratingChange: string, timeStamp: string}) => 
          {
            return record.rating;
          })
    }]
  }

  useEffect(() => {
    setValue(value => value + 1); // update state to force render
  }, []);

  return (
    <div className='line-graph'>
        <GraphHeader fetchResult={fetchResult} setPlayer={setSelectedPlayer} />
        {fetchResult[selectedPlayer].length ? <Chart
          options = {graphOptions}
          series = {graphConfig.series}
          type="line"
          height="85%"
          style={{margin: "1em", marginLeft: "-0.1em", marginTop: "1em"}}
        /> : <Text>No records found for this player!</Text>}
    </div>
  )
}