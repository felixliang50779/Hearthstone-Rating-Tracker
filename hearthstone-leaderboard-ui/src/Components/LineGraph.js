

import ApexCharts from 'apexcharts';

export function LineGraph({fetchResult}){
    
    if (!fetchResult) {
        return <p>Loading Graph Data</p>;
      }
      let results = fetchResult.data.dog;
      const initializeChart = () => {
        const fetchData = results.map((result, index) => [result.timeStamp, result.rating]);
        let options = {
            series: [{
            data: fetchData
          }],
            chart: {
            id: 'area-datetime',
            type: 'area',
            height: 350,
            zoom: {
              autoScaleYaxis: true
            }
          },
          annotations: {
            yaxis: [{
              y: 30,
              borderColor: '#999',
              label: {
                show: true,
                text: 'Support',
                style: {
                  color: "#fff",
                  background: '#00E396'
                }
              }
            }],
            xaxis: [{
              
              borderColor: '#999',
              yAxisIndex: 0,
              label: {
                show: true,
                text: 'Rally',
                style: {
                  color: "#fff",
                  background: '#775DD0'
                }
              }
            }]
          },
          dataLabels: {
            enabled: false
          },
          markers: {
            size: 0,
            style: 'hollow',
          },
          xaxis: {
            type: 'datetime',
            
            tickPlacement: 'on',
            labels: {
                datetimeFormatter: {
                  year: 'yyyy',
                  month: 'MMM',
                  day: 'dd',
                  hour: 'h',
                  minute: 'mm',
                },
                format: 'dd MMM yyyy hh tt', // 'tt' displays AM/PM
              },
            
          },
          tooltip: {
            x: {
              format: 'dd MMM yyyy hh tt'
            }
          },
          fill: {
            type: 'gradient',
            gradient: {
              shadeIntensity: 1,
              opacityFrom: 0.7,
              opacityTo: 0.9,
              stops: [0, 100]
            }
          },
          };
        
        
        
        const chart = new ApexCharts(document.getElementById('chart'), options);
        chart.render();
        
        
        
      };
    

    initializeChart()
    

    return <div id="chart"></div>;
    }
