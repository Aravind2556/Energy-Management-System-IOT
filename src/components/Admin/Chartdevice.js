import React, { useContext, useEffect, useState } from "react";
import ApexCharts from "react-apexcharts";
import { useParams } from "react-router-dom";
import { DContext } from "../../context/Datacontext";

export const Chartdevice = () => {
  const { Device } = useContext(DContext);
  const { chartid } = useParams();
  const [Infrom, setInform] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [liveChartData, setLiveChartData] = useState([]);

  useEffect(() => {
    const selectedDevice = Device?.find((item) => item.deviceId === chartid);
    if (selectedDevice) {
      setInform(selectedDevice);
    }
  }, [chartid, Device]);

  useEffect(() => {
    if (!Infrom) return;
    const thingspeakUrl = "https://api.thingspeak.com/channels/2834537/feeds.json?api_key=KXM3US7B3WCO8JKS&results=100";

 

    fetch(thingspeakUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.feeds && data.feeds.length > 0) {
          const feeds = data.feeds;
          const timestamps = feeds.map((feed) =>
            new Date(feed.created_at).toLocaleTimeString()
          );

        

          const fields = [
            { key: "field1", name: "Voltage", color: "#FF0000" },
            { key: "field2", name: "Current", color: "#00FF00" },
            { key: "field3", name: "Power", color: "#0000FF" },
            { key: "field4", name: "Energy", color: "#FF4500" }, // New
            { key: "field5", name: "Frequency", color: "#1E90FF" }, // New
            { key: "field6", name: "Power Factor", color: "#800080" },
            { key: "field7", name: "Temperature", color: "#FFA500" },
            { key: "field8", name: "Vibration", color: "#008080" },
          ];

          let newAlerts = [];

          const chartData = fields.map((field) => {
            const values = feeds.map((feed) => Number(feed[field.key]));
            const latestValue = values[values.length - 1]; // Last updated value

            const deviceParam = Infrom[field.name.toLowerCase()];
            if (deviceParam) {
              const { low, high } = deviceParam;
              if (low !== undefined && high !== undefined) {
                if (latestValue < low) {
                  newAlerts.push(`${field.name} is too LOW: ${latestValue}`);
                } else if (latestValue > high) {
                  newAlerts.push(`${field.name} is too HIGH: ${latestValue}`);
                }
              }
            }

           

            return {
              name: field.name,
              data: values,
              options: {
                chart: { type: "line" },
                xaxis: { categories: timestamps },
                title: { text: `${field.name} Chart`, align: "center" },
                colors: [field.color],
              },
            };
          });

         

          setLiveChartData(chartData);
          setAlerts(newAlerts);
        }
      })
      .catch((err) => console.error("Error fetching ThingSpeak data:", err));
  }, [Infrom]);

  return (
    <div className="chart_device container">
      <h1>Device Details and Live Data</h1>

      {/* Top Section (Device Data + Alerts) */}
      <div className="row d-flex justify-content-between">
        {/* Device Data (Left) */}
        <div className="col-md-6">
          <h2>Device Data</h2>
          {!Infrom ? (
            <p>Loading device data...</p>
          ) : (
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Parameter</th>
                  <th>Value</th>
                  <th>Range</th>
                </tr>
              </thead>
              <tbody>
                {[
                  "voltage",
                  "current",
                  "power",
                  "energy",
                  "frequency",
                  "powerfactor",
                  "tempeature",
                  "vibration",
                ].map((param) => (
                  <tr key={param}>
                    <td>{param.charAt(0).toUpperCase() + param.slice(1)}</td>
                    <td>{Infrom[param]?.value || "N/A"}</td>
                    <td>
                      {Infrom[param]?.low || "N/A"} - {Infrom[param]?.high || "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Alerts (Right) */}
        <div className="col-md-3">
          <h2>Alerts</h2>
          <div style={{ padding: "10px", minHeight: "370px",backgroundColor : "rgb(108, 99, 255)", borderRadius : "10px" }}>
            {alerts.length > 0 ? (
              alerts.map((alert, index) => (
                <div key={index} style={{ color: "black", fontWeight: "bold"}}>
                  <p style={{backgroundColor: 'whitesmoke' }}>{alert}</p>
                </div>
              ))
            ) : (
              <p>No alerts</p>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Section (Charts - Full Width) */}
      <div className="row mt-4">
        <div className="col-12">
          <h2>Live Data Charts</h2>
          <div className="d-flex flex-wrap">
            {liveChartData.map((chart, index) => (
              <div className="col-md-4" key={index} style={{ marginBottom: "20px" }}>
                <h3>{chart.name}</h3>
                <ApexCharts
                  options={chart.options}
                  series={[{ name: chart.name, data: chart.data }]}
                  type='line'
                  height={250}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chartdevice;







