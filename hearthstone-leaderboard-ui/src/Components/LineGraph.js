

import ApexCharts from 'apexcharts';

export function LineGraph({fetchResult}){
    function handleGraphButton(time, chart){
        const today = new Date();
         // Number of days to subtract

        const previousDate = new Date(today);
        previousDate.setDate(today.getDate() - time);
        chart.zoomX(
            
            previousDate.getTime(),
            today.getTime()
          )
    }
    if (!fetchResult) {
        return <p>Loading Graph Data</p>;
      }
      let results = fetchResult.data.dog;
      let chart;
      const initializeChart = () => {
        const fetchData = results.map(result => [result.timeStamp, result.rating]);
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
                  month: 'MMM \'yy',
                  day: 'dd MMM',
                  hour: 'HH:mm'
                }
              }
            
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
        
        
        
        chart = new ApexCharts(document.getElementById('chart'), options);
        chart.render();
        
        
        
      };
      

        initializeChart();
        return (
            <div>
                <div className="toolbar">
                <button onClick={() => handleGraphButton(1,chart)}>Last Day</button>
                <button onClick={() => handleGraphButton(2,chart)}>Last 2 Days</button>
                <button onClick={() => handleGraphButton(7,chart)}>Last Week</button>
                
                <button onClick={() => handleGraphButton(14,chart)}>Last 2 Weeks</button>
              </div>
              <div id="chart"></div>
              
            </div>
          );
        
        
    }
