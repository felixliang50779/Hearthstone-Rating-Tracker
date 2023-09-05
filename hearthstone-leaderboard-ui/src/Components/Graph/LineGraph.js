import Chart from 'react-apexcharts';
import { useState } from 'react';

import { GraphHeader } from './GraphHeader';

import { Card } from "dracula-ui";
import { Text } from "dracula-ui";


export function LineGraph({ fetchResult }) {
  const [selectedPlayer, setSelectedPlayer] = useState(Object.keys(fetchResult)[0]);

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
        }
      },
      xaxis: {
        type: "datetime",
        labels: {
          style: {
            colors: "white"
          }
        },
        categories: fetchResult[selectedPlayer].map(record => { 
          return Date.parse(record.timeStamp)
        })
      },
      yaxis: {
        labels: {
          style: {
            colors: "white"
          }
        }
      }
    },
    series: [{
      name: "Rating",
      data: fetchResult[selectedPlayer].map(record => record.rating)
    }]
  }

  return (
    <Card color="black" p="sm" width='4xl' height='sm' style={{textAlign : "center" }} display="inline-grid">
      <GraphHeader fetchResult={fetchResult} setPlayer={setSelectedPlayer} />
      {fetchResult[selectedPlayer].length ? <Chart
        options = {graphConfig.options}
        series = {graphConfig.series}
        type="line"
        width={870}
        height={280}
      /> : <Text style={{ paddingBottom: 60}}>No records found for this player!</Text>}
    </Card>
  )
}