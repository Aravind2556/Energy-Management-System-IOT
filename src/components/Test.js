// import React, { useEffect } from 'react';
// import ApexCharts from 'apexcharts';

// const LineChart = () => {
//   useEffect(() => {
//     const options = {
//       series: [
//         {
//           name: "Desktops",
//           data: [1, 2, 1, 2, 3, 2, 1, 2, 148],
//         },
//       ],
//       chart: {
//         height: 350,
//         type: 'line',
//         zoom: {
//           enabled: false,
//         },
//       },
//       dataLabels: {
//         enabled: false,
//       },
//       stroke: {
//         curve: 'straight',
//       },
//       title: {
//         text: 'Product Trends by Month',
//         align: 'left',
//       },
//       grid: {
//         row: {
//           colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
//           opacity: 0.5,
//         },
//       },
//       xaxis: {
//         categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
//       },
//     };

//     const chart = new ApexCharts(document.querySelector("#chart"), options);
//     chart.render();

//     // Cleanup to prevent memory leaks
//     return () => {
//       chart.destroy();
//     };
//   }, []);

//   return (
//     <div>
//       <div id="chart"></div>
//     </div>
//   );
// };

// export default LineChart;


// import React, { useEffect, useState } from 'react'

// export default function Test() {
//   const apiurl = process.env.REACT_APP_API_URL

//   const [energyData, setEnergyData] = useState([]);

//   console.log("energy data",energyData)

//   useEffect(()=>{

//       fetch(`${apiurl}/fetch-energy`,{
//         method:"GET",
//         credentials:'include'
//       })
//       .then(res=>res.json())
//       .then(data=>{
//         if(data.success === true){
//           setEnergyData(data.data)


//         }
//         else{
//           alert(data.message)
//         }
//       })
//       .catch(err=>{
//         console.log("error fetching to username",err)
//       })



//   },[])





//   return (
//     <div>
//       <h1>Energy Data</h1>
//       <ul>
//         {energyData.map(item => (
//           <li key={item.id}>
//             {item.timestamp}: {item.power}W, {item.voltage}V, {item.current}A
//           </li>
//         ))}
//       </ul>
//     </div>
//   )
// }



// import React, { useEffect, useState } from 'react';
// import ApexCharts from 'react-apexcharts';

// export default function Test() {
//   const apiurl = process.env.REACT_APP_API_URL;

//   const [energyData, setEnergyData] = useState([]);
//   const [chartData, setChartData] = useState({
//     series: [{
//       name: 'Power',
//       data: []
//     }],
//     options: {
//       chart: {
//         id: 'energy-chart',
//         type: 'line'
//       },
//       xaxis: {
//         categories: []  // To store timestamps
//       },
//       yaxis: {
//         title: {
//           text: 'Power (W)'
//         }
//       },
//       title: {
//         text: 'Energy Data Over Time',
//         align: 'center'
//       }
//     }
//   });

//   useEffect(() => {
//     fetch(`${apiurl}/fetch-energy`, {
//       method: 'GET',
//       credentials: 'include'
//     })
//       .then(res => res.json())
//       .then(data => {
//         if (data.success === true) {
//           setEnergyData(data.data);
//           const powerData = data.data.map(item => item.power);
//           const timeStamps = data.data.map(item => item.timestamp);
//           setChartData(prevState => ({
//             ...prevState,
//             series: [{
//               name: 'Power',
//               data: powerData
//             }],
//             options: {
//               ...prevState.options,
//               xaxis: {
//                 categories: timeStamps
//               }
//             }
//           }));
//         } else {
//           alert(data.message);
//         }
//       })
//       .catch(err => {
//         console.log("Error fetching data:", err);
//       });
//   }, []);

//   return (
//     <div>
//       <h1>Energy Data</h1>
//       <ul>
//         {energyData.map(item => (
//           <li key={item.id}>
//             {item.timestamp}: {item.power}W, {item.voltage}V, {item.current}A
//           </li>
//         ))}
//       </ul>
//       <ApexCharts
//         options={chartData.options}
//         series={chartData.series}
//         type="bar"
//         height={350}
//       />
//     </div>
//   );
// }




// import React, { useEffect, useState } from 'react';
// import ApexCharts from 'react-apexcharts';

// export default function Test() {
//   const apiurl = process.env.REACT_APP_API_URL;

//   const [energyData, setEnergyData] = useState([]);
//   const [chartData, setChartData] = useState({
//     series: [
//       { name: 'Power', data: [], type: 'line' },
//       { name: 'Voltage', data: [], type: 'bar' },
//       { name: 'Current', data: [], type: 'area' },
//       { name: 'Frequency', data: [], type: 'scatter' }
//     ],
//     options: {
//       chart: {
//         id: 'energy-chart',
//         type: 'line',
//         stacked: false
//       },
//       xaxis: {
//         categories: []  // To store timestamps
//       },
//       yaxis: {
//         title: { text: 'Readings' }
//       },
//       title: {
//         text: 'Energy Data Over Time',
//         align: 'center'
//       }
//     }
//   });

//   useEffect(() => {
//     fetch(`${apiurl}/fetch-energy`, {
//       method: 'GET',
//       credentials: 'include'
//     })
//       .then(res => res.json())
//       .then(data => {
//         if (data.success === true) {
//           setEnergyData(data.data);
//           const powerData = data.data.map(item => item.power);
//           const voltageData = data.data.map(item => item.voltage);
//           const currentData = data.data.map(item => item.current);
//           const frequencyData = data.data.map(item => item.frequency || Math.random() * 60); // Example frequency
//           const timeStamps = data.data.map(item => new Date(item.timestamp).toLocaleTimeString());

//           setChartData(prevState => ({
//             ...prevState,
//             series: [
//               { name: 'Power', data: powerData, type: 'line' },
//               { name: 'Voltage', data: voltageData, type: 'bar' },
//               { name: 'Current', data: currentData, type: 'area' },
//               { name: 'Frequency', data: frequencyData, type: 'scatter' }
//             ],
//             options: {
//               ...prevState.options,
//               xaxis: { categories: timeStamps }
//             }
//           }));
//         } else {
//           alert(data.message);
//         }
//       })
//       .catch(err => {
//         console.log("Error fetching data:", err);
//       });
//   }, []);

//   return (
//     <div>
//       <h1>Energy Data</h1>
//       <ul>
//         {energyData.map(item => (
//           <li key={item.id}>
//             {new Date(item.timestamp).toLocaleString()}: {item.power}W, {item.voltage}V, {item.current}A
//           </li>
//         ))}
//       </ul>
//       <ApexCharts
//         options={chartData.options}
//         series={chartData.series}
//         type="line" // This can be 'line', 'bar', 'area', 'scatter'
//         height={350}
//       />
//     </div>
//   );
// }



// import React, { useEffect, useState } from 'react';
// import ApexCharts from 'react-apexcharts';

// export default function Test() {
//   const apiurl = process.env.REACT_APP_API_URL;

//   const [energyData, setEnergyData] = useState([]);
//   console.log("data",energyData)
//   const [chartData, setChartData] = useState({
//     series: [
//       { name: 'Power', data: [], type: 'line' },
//       { name: 'Voltage', data: [], type: 'bar' },
//       { name: 'Current', data: [], type: 'area' },
//       { name: 'power_factor', data: [], type: 'scatter' }
//     ],
//     options: {
//       chart: {
//         id: 'energy-chart',
//         type: 'line',
//         stacked: false
//       },
//       xaxis: {
//         categories: []  // To store timestamps
//       },
//       yaxis: {
//         title: { text: 'Readings' }
//       },
//       title: {
//         text: 'Energy Data Over Time',
//         align: 'center'
//       }
//     }
//   });

//   useEffect(() => {
//     fetch(`${apiurl}/fetch-energy`, {
//       method: 'GET',
//       credentials: 'include'
//     })
//       .then(res => res.json())
//       .then(data => {
//         if (data.success === true) {
//           setEnergyData(data.data);
//           const powerData = data.data.map(item => item.power);
//           const voltageData = data.data.map(item => item.voltage);
//           const currentData = data.data.map(item => item.current);
//           const frequencyData = data.data.map(item => item.power_factor || Math.random() * 60); // Example frequency
//           const timeStamps = data.data.map(item => new Date(item.timestamp).toLocaleTimeString());

//           setChartData(prevState => ({
//             ...prevState,
//             series: [
//               { name: 'Power', data: powerData, type: 'line' },
//               { name: 'Voltage', data: voltageData, type: 'bar' },
//               { name: 'Current', data: currentData, type: 'area' },
//               { name: 'Frequency', data: frequencyData, type: 'scatter' }
//             ],
//             options: {
//               ...prevState.options,
//               xaxis: { categories: timeStamps }
//             }
//           }));
//         } else {
//           alert(data.message);
//         }
//       })
//       .catch(err => {
//         console.log("Error fetching data:", err);
//       });
//   }, []);

//   return (
//     <div>
//       <h1>Energy Data</h1>
//       <ul>
//         {energyData.map(item => (
//           <li key={item.id}>
//             {new Date(item.timestamp).toLocaleString()}: {item.power}W, {item.voltage}V, {item.current}A,{item.power_factor}PF
//           </li>
//         ))}
//       </ul>
//       <ApexCharts
//         options={chartData.options}
//         series={chartData.series}
//         type="line" // This can be 'line', 'bar', 'area', 'scatter'
//         height={350}
//       />
//     </div>
//   );
// }






// import React, { useEffect, useState } from 'react';
// import ApexCharts from 'react-apexcharts';

// export default function Test() {
//   const apiurl = process.env.REACT_APP_API_URL;

//   const [energyData, setEnergyData] = useState([]);
//   const [chartData, setChartData] = useState({
//     voltage: { series: [{ name: 'Voltage', data: [] }], options: { chart: { type: 'line' }, xaxis: { categories: [] }, title: { text: 'Voltage Over Time', align: 'center' } } },
//     current: { series: [{ name: 'Current', data: [] }], options: { chart: { type: 'bar' }, xaxis: { categories: [] }, title: { text: 'Current Over Time', align: 'center' } } },
//     power: { series: [{ name: 'Power', data: [] }], options: { chart: { type: 'area' }, xaxis: { categories: [] }, title: { text: 'Power Over Time', align: 'center' } } },
//     powerFactor: { series: [{ name: 'Power Factor', data: [] }], options: { chart: { type: 'scatter' }, xaxis: { categories: [] }, title: { text: 'Power Factor Over Time', align: 'center' } } },
//     temperature: { series: [{ name: 'Temperature', data: [] }], options: { chart: { type: 'line' }, xaxis: { categories: [] }, title: { text: 'Temperature Over Time', align: 'center' } } }
//   });

//   useEffect(() => {
//     fetch(`${apiurl}/fetch-energy`, {
//       method: 'GET',
//       credentials: 'include'
//     })
//       .then(res => res.json())
//       .then(data => {
//         if (data.success === true) {
//           setEnergyData(data.data);

//           const voltageData = data.data.map(item => item.voltage);
//           const currentData = data.data.map(item => item.current);
//           const powerData = data.data.map(item => item.power);
//           const powerFactorData = data.data.map(item => item.powerFactor || Math.random().toFixed(2)); // If powerFactor is missing, generate random
//           const temperatureData = data.data.map(item => item.temperature || Math.random() * 50); // Example random temperature
//           const timeStamps = data.data.map(item => new Date(item.timestamp).toLocaleTimeString());

//           setChartData({
//             voltage: { ...chartData.voltage, series: [{ name: 'Voltage', data: voltageData }], options: { ...chartData.voltage.options, xaxis: { categories: timeStamps } } },
//             current: { ...chartData.current, series: [{ name: 'Current', data: currentData }], options: { ...chartData.current.options, xaxis: { categories: timeStamps } } },
//             power: { ...chartData.power, series: [{ name: 'Power', data: powerData }], options: { ...chartData.power.options, xaxis: { categories: timeStamps } } },
//             powerFactor: { ...chartData.powerFactor, series: [{ name: 'Power Factor', data: powerFactorData }], options: { ...chartData.powerFactor.options, xaxis: { categories: timeStamps } } },
//             temperature: { ...chartData.temperature, series: [{ name: 'Temperature', data: temperatureData }], options: { ...chartData.temperature.options, xaxis: { categories: timeStamps } } }
//           });
//         } else {
//           alert(data.message);
//         }
//       })
//       .catch(err => {
//         console.log("Error fetching data:", err);
//       });
//   }, []);

//   return (
//     <div>
//       <h1>Energy Data</h1>
//       {/* Phase 1 Box */}
//       <h2>Phase 1</h2>
//       <div style={{
//         border: '2px solid #007bff',
//         padding: '15px',
//         borderRadius: '10px',
//         width: 'fit-content',
//         backgroundColor: '#f9f9f9',
//         fontSize: '18px',
//         fontFamily: 'Arial, sans-serif'
//       }}>
//         <p><strong>Voltage:</strong> <span style={{ color: 'red' }}>{energyData.voltage}V</span></p>
//         <p><strong>Current:</strong> <span style={{ color: 'green' }}>{energyData.current}A</span></p>
//         <p><strong>Power:</strong> <span style={{ color: 'blue' }}>{energyData.power}W</span></p>
//         <p><strong>Power Factor:</strong> <span style={{ color: 'purple' }}>{energyData.powerFactor}</span></p>
//         <p><strong>Temperature:</strong> <span style={{ color: 'orange' }}>{energyData.temperature}°C</span></p>
//         <p><strong>Time:</strong> <span>{energyData.timestamp}</span></p>
//       </div>



//       <div className=" d-flex flex-wrap justify-content-center">

//       {/* Voltage Chart */}
//       <ApexCharts options={chartData.voltage.options} series={chartData.voltage.series} type="line" height={300} width={300} />

// {/* Current Chart */}
// <ApexCharts options={chartData.current.options} series={chartData.current.series} type="bar" height={300} width={300} />

// {/* Power Chart */}
// <ApexCharts options={chartData.power.options} series={chartData.power.series} type="area" height={300} width={300} />

// {/* Power Factor Chart */}
// <ApexCharts options={chartData.powerFactor.options} series={chartData.powerFactor.series} type="scatter" height={300} width={300} />

// {/* Temperature Chart */}
// <ApexCharts options={chartData.temperature.options} series={chartData.temperature.series} type="line" height={300} width={300} />
//       </div>



//     </div>
//   );
// }

import React, { useEffect, useState } from 'react';
import ApexCharts from 'react-apexcharts';

export default function Test() {

 
 
  const apiurl = process.env.REACT_APP_API_URL;

  // States for real-time latest values phase 1, phase 2, and phase 3
  const [latestData1, setLatestData1] = useState({
    voltage: 0,
    current: 0,
    power: 0,
    powerFactor: 0,
    temperature: 0,
    timestamp: new Date().toLocaleString(),
  });

  const [latestData2, setLatestData2] = useState({
    voltage: 0,
    current: 0,
    power: 0,
    powerFactor: 0,
    temperature: 0,
    timestamp: new Date().toLocaleString(),
  });

  const [latestData3, setLatestData3] = useState({
    voltage: 0,
    current: 0,
    power: 0,
    powerFactor: 0,
    temperature: 0,
    timestamp: new Date().toLocaleString(),
  });

  // States for the charts for Phase 1, Phase 2, and Phase 3
  const [chartData1, setChartData1] = useState({
    voltage: [],
    current: [],
    power: [],
    powerFactor: [],
    temperature: [],
    timeStamps: [],
  });

  const [chartData2, setChartData2] = useState({
    voltage: [],
    current: [],
    power: [],
    powerFactor: [],
    temperature: [],
    timeStamps: [],
  });

  const [chartData3, setChartData3] = useState({
    voltage: [],
    current: [],
    power: [],
    powerFactor: [],
    temperature: [],
    timeStamps: [],
  });

  // phase 1 useEffect
  useEffect(() => {
    fetch(`${apiurl}/fetch-Phase1`, {
      method: 'GET',
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        if (data.success === true && data.data.length > 0) {
          const latest = data.data[data.data.length - 1]; // Get latest reading
          setLatestData1({
            voltage: latest.voltage,
            current: latest.current,
            power: latest.power,
            powerFactor: latest.power_factor || 'N/A',
            temperature: latest.temperature,
            timestamp: new Date(latest.timestamp).toLocaleString(),
          });

          // Prepare chart data for Phase 1
          const voltageData = data.data.map(item => item.voltage);
          const currentData = data.data.map(item => item.current);
          const powerData = data.data.map(item => item.power);
          const powerFactorData = data.data.map(item => item.power_factor || Math.random().toFixed(2));
          const temperatureData = data.data.map(item => item.temperature || Math.random() * 50);
          const timeStamps = data.data.map(item => new Date(item.timestamp).toLocaleTimeString());

          setChartData1({
            voltage: voltageData,
            current: currentData,
            power: powerData,
            powerFactor: powerFactorData,
            temperature: temperatureData,
            timeStamps,
          });
        } else {
          alert(data.message);
        }
      })
      .catch(err => {
        console.log("Error fetching data:", err);
      });
  }, []);

  // phase 2 useEffect
  useEffect(() => {
    fetch(`${apiurl}/fetch-Phase2`, {
      method: 'GET',
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        if (data.success === true && data.data.length > 0) {
          const latest = data.data[data.data.length - 1]; // Get latest reading
          setLatestData2({
            voltage: latest.voltage,
            current: latest.current,
            power: latest.power,
            powerFactor: latest.power_factor || 'N/A',
            temperature: latest.temperature,
            timestamp: new Date(latest.timestamp).toLocaleString(),
          });

          // Prepare chart data for Phase 2
          const voltageData = data.data.map(item => item.voltage);
          const currentData = data.data.map(item => item.current);
          const powerData = data.data.map(item => item.power);
          const powerFactorData = data.data.map(item => item.power_factor || Math.random().toFixed(2));
          const temperatureData = data.data.map(item => item.temperature || Math.random() * 50);
          const timeStamps = data.data.map(item => new Date(item.timestamp).toLocaleTimeString());

          setChartData2({
            voltage: voltageData,
            current: currentData,
            power: powerData,
            powerFactor: powerFactorData,
            temperature: temperatureData,
            timeStamps,
          });
        } else {
          alert(data.message);
        }
      })
      .catch(err => {
        console.log("Error fetching data:", err);
      });
  }, []);

  // phase 3 useEffect
  useEffect(() => {
    fetch(`${apiurl}/fetch-Phase3`, {
      method: 'GET',
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        if (data.success === true && data.data.length > 0) {
          const latest = data.data[data.data.length - 1]; // Get latest reading
          setLatestData3({
            voltage: latest.voltage,
            current: latest.current,
            power: latest.power,
            powerFactor: latest.power_factor || 'N/A',
            temperature: latest.temperature,
            timestamp: new Date(latest.timestamp).toLocaleString(),
          });

          // Prepare chart data for Phase 3
          const voltageData = data.data.map(item => item.voltage);
          const currentData = data.data.map(item => item.current);
          const powerData = data.data.map(item => item.power);
          const powerFactorData = data.data.map(item => item.power_factor || Math.random().toFixed(2));
          const temperatureData = data.data.map(item => item.temperature || Math.random() * 50);
          const timeStamps = data.data.map(item => new Date(item.timestamp).toLocaleTimeString());

          setChartData3({
            voltage: voltageData,
            current: currentData,
            power: powerData,
            powerFactor: powerFactorData,
            temperature: temperatureData,
            timeStamps,
          });
        } else {
          alert(data.message);
        }
      })
      .catch(err => {
        console.log("Error fetching data:", err);
      });
  }, []);



    return (
      <div className="Test_phase">
        {/* <div className='d-flex justify-content-center gap-0'>
      <button onClick={() => handlePhase(1)} className="p-3">Go to Phase 1</button>
      <button onClick={() => handlePhase(2)} className="p-3">Go to Phase 2</button>
      <button onClick={() => handlePhase(3)} className="p-3">Go to Phase 3</button>
      </div> */}

        


        <div className=" d-flex justify-content-around  mt-5 ">

          <div>
            <div className='border border-primary p-3 rounded-3'>
              <h2 className="text-light fs-2 fw-bold btn btn-primary">Phase 1</h2>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Parameter</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Voltage</strong></td>
                    <td><span style={{ color: 'red' }}>{latestData1.voltage}V</span></td>
                  </tr>
                  <tr>
                    <td><strong>Current</strong></td>
                    <td><span style={{ color: 'green' }}>{latestData1.current}A</span></td>
                  </tr>
                  <tr>
                    <td><strong>Power</strong></td>
                    <td><span style={{ color: 'blue' }}>{latestData1.power}W</span></td>
                  </tr>
                  <tr>
                    <td><strong>Power Factor</strong></td>
                    <td><span style={{ color: 'purple' }}>{latestData1.powerFactor}PF</span></td>
                  </tr>
                  <tr>
                    <td><strong>Temperature</strong></td>
                    <td><span style={{ color: 'orange' }}>{latestData1.temperature}°C</span></td>
                  </tr>
                  <tr>
                    <td><strong>Time</strong></td>
                    <td>{latestData1.timestamp}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div>
              <ApexCharts
                options={{
                  chart: { type: 'line' },
                  xaxis: { categories: chartData1.timeStamps },
                  title: { text: 'Phase 1 Data', align: 'center' },
                  stroke: { width: 2 },
                  markers: { size: 4 },
                }}
                series={[
                  { name: 'Voltage', data: chartData1.voltage },
                  { name: 'Current', data: chartData1.current },
                  { name: 'Power', data: chartData1.power },
                  { name: 'Power Factor', data: chartData1.powerFactor },
                  { name: 'Temperature', data: chartData1.temperature },
                ]}
                type="line"
                height={350}
                width={350}
              />
            </div>
          </div>

          <div>
            <div className='border border-primary p-3 rounded-3'>
              <h2 className="text-light fs-2 fw-bold btn btn-primary">Phase 2</h2>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Parameter</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Voltage</strong></td>
                    <td><span style={{ color: 'red' }}>{latestData2.voltage}V</span></td>
                  </tr>
                  <tr>
                    <td><strong>Current</strong></td>
                    <td><span style={{ color: 'green' }}>{latestData2.current}A</span></td>
                  </tr>
                  <tr>
                    <td><strong>Power</strong></td>
                    <td><span style={{ color: 'blue' }}>{latestData2.power}W</span></td>
                  </tr>
                  <tr>
                    <td><strong>Power Factor</strong></td>
                    <td><span style={{ color: 'purple' }}>{latestData2.powerFactor}PF</span></td>
                  </tr>
                  <tr>
                    <td><strong>Temperature</strong></td>
                    <td><span style={{ color: 'orange' }}>{latestData2.temperature}°C</span></td>
                  </tr>
                  <tr>
                    <td><strong>Time</strong></td>
                    <td>{latestData2.timestamp}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div>
              <ApexCharts
                options={{
                  chart: { type: 'line' },
                  xaxis: { categories: chartData2.timeStamps },
                  title: { text: 'Phase 2 Data', align: 'center' },
                  stroke: { width: 2 },
                  markers: { size: 4 },
                }}
                series={[
                  { name: 'Voltage', data: chartData2.voltage },
                  { name: 'Current', data: chartData2.current },
                  { name: 'Power', data: chartData2.power },
                  { name: 'Power Factor', data: chartData2.powerFactor },
                  { name: 'Temperature', data: chartData2.temperature },
                ]}
                type="line"
                height={350}
                width={350}
              />
            </div>
          </div>

          <div>
            <div className='border border-primary p-3 rounded-3'>
              <h2 className="text-light fs-2 fw-bold btn btn-primary">Phase 3</h2>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Parameter</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Voltage</strong></td>
                    <td><span style={{ color: 'red' }}>{latestData3.voltage}V</span></td>
                  </tr>
                  <tr>
                    <td><strong>Current</strong></td>
                    <td><span style={{ color: 'green' }}>{latestData3.current}A</span></td>
                  </tr>
                  <tr>
                    <td><strong>Power</strong></td>
                    <td><span style={{ color: 'blue' }}>{latestData3.power}W</span></td>
                  </tr>
                  <tr>
                    <td><strong>Power Factor</strong></td>
                    <td><span style={{ color: 'purple' }}>{latestData3.powerFactor}PF</span></td>
                  </tr>
                  <tr>
                    <td><strong>Temperature</strong></td>
                    <td><span style={{ color: 'orange' }}>{latestData3.temperature}°C</span></td>
                  </tr>
                  <tr>
                    <td><strong>Time</strong></td>
                    <td>{latestData3.timestamp}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div>
              <ApexCharts
                options={{
                  chart: { type: 'line' },
                  xaxis: { categories: chartData3.timeStamps },
                  title: { text: 'Phase 3 Data', align: 'center' },
                  stroke: { width: 2 },
                  markers: { size: 4 },
                }}
                series={[
                  { name: 'Voltage', data: chartData3.voltage },
                  { name: 'Current', data: chartData3.current },
                  { name: 'Power', data: chartData3.power },
                  { name: 'Power Factor', data: chartData3.powerFactor },
                  { name: 'Temperature', data: chartData3.temperature },
                ]}
                type="line"
                height={350}
                width={350}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }












