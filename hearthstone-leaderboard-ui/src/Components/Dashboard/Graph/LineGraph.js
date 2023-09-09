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

  return (
    <Card
      color="black"
      p="sm"
      width='2xl'
      height='lg'
      style={
        {textAlign : "center",
          boxShadow: "none",
          position: "absolute",
          bottom: 0,
          marginLeft: "40%",
          marginBottom: "30%"
        }}
      display="inline-grid">
        <GraphHeader fetchResult={fetchResult} setPlayer={setSelectedPlayer} />
        {fetchResult[selectedPlayer].length ? <Chart
          options = {graphConfig.options}
          series = {graphConfig.series}
          type="line"
          width="99%"
          height="78%"
        /> : <Text style={{ paddingBottom: 58 }}>No records found for this player!</Text>}
    </Card>
  )
}