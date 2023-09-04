import Chart from 'react-apexcharts';
import { useState } from 'react';

import { GraphHeader } from './GraphHeader';
import styles from './LineGraph.module.css';

export function LineGraph({ fetchResult }) {
  const [selectedPlayer, setSelectedPlayer] = useState(Object.keys(fetchResult)[0]);

  const graphConfig = {
    options: {
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
        categories: fetchResult[selectedPlayer].map(record => { 
          return Date.parse(record.timeStamp)
        })
      }
    },
    series: [{
      name: "Rating",
      data: fetchResult[selectedPlayer].map(record => record.rating)
    }]
  }

  return (
    <div className={styles.graphWrapper}>
      <GraphHeader fetchResult={fetchResult} setPlayer={setSelectedPlayer} />
      <Chart
        options = {graphConfig.options}
        series = {graphConfig.series}
        type = "line"
        width = "1000"
        height = "500"
      />
    </div>
  )
}