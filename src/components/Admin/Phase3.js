import React, { useEffect, useState } from 'react';
import ApexCharts from 'react-apexcharts';

export default function Phase3() {
  const apiurl = process.env.REACT_APP_API_URL;

  // State for real-time latest values
  const [latestData, setLatestData] = useState({
    voltage: 0,
    current: 0,
    power: 0,
    powerFactor: 0,
    temperature: 0,
    timestamp: new Date().toLocaleString(),
  });

  // State for historical chart data
  const [chartData, setChartData] = useState({
    voltage: { series: [{ name: 'Voltage', data: [] }], options: { chart: { type: 'line' }, xaxis: { categories: [] }, title: { text: 'Voltage Over Time', align: 'center' } } },
    current: { series: [{ name: 'Current', data: [] }], options: { chart: { type: 'bar' }, xaxis: { categories: [] }, title: { text: 'Current Over Time', align: 'center' } } },
    power: { series: [{ name: 'Power', data: [] }], options: { chart: { type: 'area' }, xaxis: { categories: [] }, title: { text: 'Power Over Time', align: 'center' } } },
    powerFactor: { series: [{ name: 'Power Factor', data: [] }], options: { chart: { type: 'scatter' }, xaxis: { categories: [] }, title: { text: 'Power Factor Over Time', align: 'center' } } },
    temperature: { series: [{ name: 'Temperature', data: [] }], options: { chart: { type: 'line' }, xaxis: { categories: [] }, title: { text: 'Temperature Over Time', align: 'center' } } }
  });

  useEffect(() => {
    fetch(`${apiurl}/fetch-Phase3`, {
      method: 'GET',
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        if (data.success === true && data.data.length > 0) {
          const latest = data.data[data.data.length - 1]; // Get latest reading
          setLatestData({
            voltage: latest.voltage,
            current: latest.current,
            power: latest.power,
            powerFactor: latest.power_factor || 'N/A',
            temperature: latest.temperature,
            timestamp: new Date(latest.timestamp).toLocaleString(),
          });

          const voltageData = data.data.map(item => item.voltage);
          const currentData = data.data.map(item => item.current);
          const powerData = data.data.map(item => item.power);
          const powerFactorData = data.data.map(item => item.powerFactor || Math.random().toFixed(2));
          const temperatureData = data.data.map(item => item.temperature || Math.random() * 50);
          const timeStamps = data.data.map(item => new Date(item.timestamp).toLocaleTimeString());

          setChartData({
            voltage: { ...chartData.voltage, series: [{ name: 'Voltage', data: voltageData }], options: { ...chartData.voltage.options, xaxis: { categories: timeStamps } } },
            current: { ...chartData.current, series: [{ name: 'Current', data: currentData }], options: { ...chartData.current.options, xaxis: { categories: timeStamps } } },
            power: { ...chartData.power, series: [{ name: 'Power', data: powerData }], options: { ...chartData.power.options, xaxis: { categories: timeStamps } } },
            powerFactor: { ...chartData.powerFactor, series: [{ name: 'Power Factor', data: powerFactorData }], options: { ...chartData.powerFactor.options, xaxis: { categories: timeStamps } } },
            temperature: { ...chartData.temperature, series: [{ name: 'Temperature', data: temperatureData }], options: { ...chartData.temperature.options, xaxis: { categories: timeStamps } } }
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
    <div className="d-flex flex-wrap justify-content-around"> 
      

      {/* Real-time Data Box */}
     



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
        <td><span style={{ color: 'red' }}>{latestData.voltage}V</span></td>
      </tr>
      <tr>
        <td><strong>Current</strong></td>
        <td><span style={{ color: 'green' }}>{latestData.current}A</span></td>
      </tr>
      <tr>
        <td><strong>Power</strong></td>
        <td><span style={{ color: 'blue' }}>{latestData.power}W</span></td>
      </tr>
      <tr>
        <td><strong>Power Factor</strong></td>
        <td><span style={{ color: 'purple' }}>{latestData.powerFactor}PF</span></td>
      </tr>
      <tr>
        <td><strong>Temperature</strong></td>
        <td><span style={{ color: 'orange' }}>{latestData.temperature}°C</span></td>
      </tr>
      <tr>
        <td><strong>Time</strong></td>
        <td>{latestData.timestamp}</td>
      </tr>
    </tbody>
  </table>
</div>




     

      {/* Charts */}
      <div>
      <ApexCharts options={chartData.voltage.options} series={chartData.voltage.series} type="line" height={400} width={500} />
      </div>
      <div>
      <ApexCharts options={chartData.current.options} series={chartData.current.series} type="bar" height={400} width={500} />
      </div>
      <div>
      <ApexCharts options={chartData.power.options} series={chartData.power.series} type="area" height={400} width={500} />
      </div>
      <div>
      <ApexCharts options={chartData.powerFactor.options} series={chartData.powerFactor.series} type="scatter" height={400} width={500}  />
      </div>
      <div>
      <ApexCharts options={chartData.temperature.options} series={chartData.temperature.series} type="line" height={400} width={500}  />
      </div>
    </div>
  );
}