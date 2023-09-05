import Chart from 'react-apexcharts';

import { GraphHeader } from './GraphHeader';

import { Card } from "dracula-ui";
import { Text } from "dracula-ui";

import './LineGraph.css';


export function LineGraph({ fetchResult, selectPlayer }) {
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
      }
    },
    series: [{
      name: "Rating",
      data: fetchResult[selectedPlayer].map(record => record.rating)
    }]
  }

  return (
    <Card
      color="black"
      p="sm"
      width='3xl'
      height='sm'
      style={{textAlign : "center", boxShadow: "none" }}
      display="inline-grid">
        <GraphHeader fetchResult={fetchResult} setPlayer={setSelectedPlayer} />
        {fetchResult[selectedPlayer].length ? <Chart
          options = {graphConfig.options}
          series = {graphConfig.series}
          type="line"
          width={728}
          height={280}
        /> : <Text style={{ paddingBottom: 58 }}>No records found for this player!</Text>}
    </Card>
  )
}