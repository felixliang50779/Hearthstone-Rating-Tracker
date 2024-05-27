import { useState, useEffect } from 'react';

import Chart from 'react-apexcharts';

import { GraphHeader } from './GraphHeader';

import { Text } from "dracula-ui";

import './LineGraph.css';


export function LineGraph({ fetchResult, selectPlayer }) {
  const [,setValue] = useState(0); // integer state

  const [selectedPlayer, setSelectedPlayer] = selectPlayer;

  const graphConfig = {
    options: {
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
        categories: fetchResult[selectedPlayer].map(record => { 
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
    },
    series: [{
      name: "Rating",
      data: fetchResult[selectedPlayer].map(record => record.rating)
    }]
  }

  useEffect(() => {
    setValue(value => value + 1); // update state to force render
  }, []);

  return (
    <div className='line-graph'>
        <GraphHeader fetchResult={fetchResult} setPlayer={setSelectedPlayer} />
        {fetchResult[selectedPlayer].length ? <Chart
          options = {graphConfig.options}
          series = {graphConfig.series}
          type="line"
          height="85%"
          style={{margin: "1em", marginLeft: "-0.1em", marginTop: "1em"}}
        /> : <Text>No records found for this player!</Text>}
    </div>
  )
}