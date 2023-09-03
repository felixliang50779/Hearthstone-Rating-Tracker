

import ApexCharts from 'apexcharts';

export function LineGraph({fetchResult}){
    function handleGraphButton(time, chart){
        const today = new Date();
         // Number of days to subtract

        const previousDate = new Date(today);
        previousDate.setDate(today.getDate() - time);
        chart.updateOptions({ yaxis: [{
          y: 100,
          borderColor: '#999',
          label: {
            show: true,
            text: 'Support',
            style: {
              color: "#fff",
              background: '#00E396'
            }
          }
        }] });
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
        let last = results[results.length-1];
        
        const today = new Date(); 
        fetchData.push([today.getTime(),last.rating])
        let options = {
            series: [{
            data: fetchData
          }],
            chart: {
            id: 'area-datetime',
            type: 'area',
            height: 350,
            curve:'linear',
            zoom: {
              autoScaleYaxis: true
            }
          },
          annotations: {
            yaxis: [{
              
              y: 500,
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
        // const resetCssClasses = function(activeEl) {
        //   var els = document.querySelectorAll('button');
        //   Array.prototype.forEach.call(els, function(el) {
        //     el.classList.remove('active');
        //   });
        
        //   activeEl.target.classList.add('active');
        // };
        
        // // Create buttons dynamically
        // const oneMonthButton = document.createElement('button');
        // oneMonthButton.textContent = '1 Month';
        // const sixMonthsButton = document.createElement('button');
        // sixMonthsButton.textContent = '6 Months';
        // const oneYearButton = document.createElement('button');
        // oneYearButton.textContent = '1 Year';
        // const ytdButton = document.createElement('button');
        // ytdButton.textContent = 'YTD';
        // const allButton = document.createElement('button');
        // allButton.textContent = 'All';
        
        // // Append buttons to a container div in your HTML
        // const buttonContainer = document.querySelector('#chart');
        // buttonContainer.appendChild(oneMonthButton);
        // buttonContainer.appendChild(sixMonthsButton);
        // buttonContainer.appendChild(oneYearButton);
        // buttonContainer.appendChild(ytdButton);
        // buttonContainer.appendChild(allButton);
        
        // // Add event listeners to the dynamically created buttons
        // oneMonthButton.addEventListener('click', function(event) {
        //   resetCssClasses(event);
        //   chart.zoomX(
        //     new Date('28 Jan 2013').getTime(),
        //     new Date('27 Feb 2013').getTime()
        //   );
        // });
        
        // sixMonthsButton.addEventListener('click', function(event) {
        //   resetCssClasses(event);
        //   chart.zoomX(
        //     new Date('27 Sep 2012').getTime(),
        //     new Date('27 Feb 2013').getTime()
        //   );
        // });
        
        // oneYearButton.addEventListener('click', function(event) {
        //   resetCssClasses(event);
        //   chart.zoomX(
        //     new Date('27 Feb 2012').getTime(),
        //     new Date('27 Feb 2013').getTime()
        //   );
        // });
        
        // ytdButton.addEventListener('click', function(event) {
        //   resetCssClasses(event);
        //   chart.zoomX(
        //     new Date('01 Jan 2013').getTime(),
        //     new Date('27 Feb 2013').getTime()
        //   );
        // });
        
        // allButton.addEventListener('click', function(event) {
        //   resetCssClasses(event);
        //   chart.zoomX(
        //     new Date('23 Jan 2012').getTime(),
        //     new Date('27 Feb 2013').getTime()
        //   );
        // });

        
        
      };
      

        initializeChart();
        return (
            <div>
                <div className="toolbar">
                <button onClick={() => handleGraphButton(1,chart)}>Last Day</button>
                <button onClick={() => handleGraphButton(2,chart)}>Last 2 Days</button>
                <button onClick={() => handleGraphButton(7,chart)}>Last Week</button>
                
              
              </div>
              <div id="chart"></div>
              <br></br>
              <br></br>
            </div>
          );
        
        
    }
