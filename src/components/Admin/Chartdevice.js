import React, { useContext, useEffect, useState } from "react";
import ApexCharts from "react-apexcharts";
import { useParams } from "react-router-dom";
import { DContext } from "../../context/Datacontext";
import waringbeep from "../../assets/warning-beep.mp3"; // Beep sound file path
import Loading from "../Loading";

export const Chartdevice = () => {

  const { Device } = useContext(DContext);
  const { chartid } = useParams();
  const [Infrom, setInform] = useState(null);
  const [alerts, setAlerts] = useState(null);
  const [liveChartData, setLiveChartData] = useState(null);
  const [lastProcessedId, setLastProcessedId] = useState(null);
  const [lastFeedTimestamp, setLastFeedTimestamp] = useState(null)



  

  // Load warning beep sound
  const warningBeep = new Audio(waringbeep);

  useEffect(() => {
    const selectedDevice = Device?.find((item) => item.deviceId === chartid);
    if (selectedDevice) {
      setInform(selectedDevice);
    }
  }, [chartid, Device]);

  useEffect(() => {
    if (!Infrom) return;
  
    const channelId = "2834537";
    const apiKey = "KXM3US7B3WCO8JKS";
    const thingspeakUrl = `https://api.thingspeak.com/channels/${channelId}/feeds.json?api_key=${apiKey}&results=100`;

    const fetchData = () => {
      fetch(thingspeakUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.feeds && data.feeds.length > 0) {
          const feeds = data.feeds;
          const latestFeed = feeds[feeds.length - 1]; // Get the latest feed
          setLastFeedTimestamp(latestFeed.created_at)
          const latestFeedId = latestFeed.entry_id; // Unique ID of the latest feed
  
          // If the last processed ID is the same, don't trigger alerts again
          if (lastProcessedId === latestFeedId) return;
  
          setLastProcessedId(latestFeedId); // Update the processed ID
  
          const timestamps = feeds.map((feed) =>
            new Date(feed.created_at).toLocaleTimeString()
          );
  
          const fields = [
            { key: "field1", name: "Voltage", color: "black", type: "line" },
            { key: "field2", name: "Current", color: "red", type: "bar" },
            { key: "field3", name: "Power", color: "#0000FF", type: "area" },
            { key: "field4", name: "Energy", color: "#FF4500", type: "scatter" },
            { key: "field5", name: "Frequency", color: "#1E90FF", type: "heatmap" },
            { key: "field6", name: "Power Factor", color: "#800080", type: "radar" },
            { key: "field7", name: "Temperature", color: "#FFA500", type: "line" },
            { key: "field8", name: "Vibration", color: "#008080", type: "bar" },
          ];
  
          let newAlerts = [];
  
          const chartData = fields
            .map((field) => {
              const values = feeds
                .map((feed) => Number(feed[field.key]))
                .filter((v) => !isNaN(v));
  
              if (values.length === 0) return null;
  
              const latestValue = values[values.length - 1];
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
                type: field.type,
                options: {
                  chart: { type: field.type },
                  xaxis: { categories: timestamps },
                  colors: [field.color],
                },
              };
            })
            .filter(Boolean);

  
          if (newAlerts) {
        
          setAlerts(newAlerts);
            
          }
  
          setLiveChartData(chartData);
        }
      })
      .catch((err) => console.error("Error fetching ThingSpeak data:", err));
    }

    fetchData() 

    setInterval(fetchData, 5000)


  }, [Infrom, lastProcessedId]); // Dependency updated to track latest processed ID

  if(alerts===null || liveChartData===null || lastFeedTimestamp===null){
    return <Loading/>
  }

return (
    <div className="chart_device container">
      <h1>Device Details and Live Data</h1>

      {/* Top Section (Device Data + Alerts) */}
      <div className="row d-flex justify-content-between">
        {/* Device Data (Left) */}
        <div className="col-md-6 bg-primary rounded p-2 my-1 border-box">
          <h2 className="text-light fw-bold">Device Data</h2>
          {!Infrom ? (
            <p>Loading device data...</p>
          ) : (
            <table className="table table-bordered table-rounded m-0">
              <thead>
                <tr className="fw-bold">
                  <th className="text-primary">Parameter</th>
                  <th className="text-primary">Value</th>
                  <th className="text-primary">Range</th>
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
                    <td className="fw-bold">{param.charAt(0).toUpperCase() + param.slice(1)}</td>
                    <td>{Infrom[param]?.value || "N/A"}</td>
                    <td>
                      {Infrom[param]?.low || "N/A"} -{" "}
                      {Infrom[param]?.high || "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Alerts (Right) */}
        <div className="col-md-5 bg-primary rounded p-2 my-1 border-box">
        <div>

          <h2 className="text-light fw-bold">Alerts</h2>
          </div>
          <div
            style={{
              padding: "20px",
              minHeight: "370px",
              backgroundColor: "white",
              borderRadius: "10px",
            }}
          >
          <p className="text-dark text-end">Last live Record at: <span className="fw-bold">{new Date(lastFeedTimestamp).toLocaleString()}</span></p>
            {alerts.length > 0 ? (
              alerts.map((alert, index) => (
                <div key={index} style={{ color: "black" }}>
                  <p className={`${alert.length>0 && alert.includes("LOW") ? "text-danger" : "text-info"} fw-bold m-0 my-1 py-1 px-2 rounded`} style={{ backgroundColor: "#effef5" }}>{alert}</p>
                </div>
              ))
            ) : (
              <p>No alerts</p>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Section (Charts) */}
      <div className="row mt-4 bg-primary rounded flex-wrap d-flex justify-content-center">
        <div className="col-12">
          <h2 className="text-center text-light mt-2 fw-bold">Live Data Charts</h2>
          <div className="d-flex flex-wrap justify-content-center">
            {liveChartData.length === 0 ? (
              <p>No Data Available for Charts</p>
            ) : (
              liveChartData.map((chart, index) => (
                <div
                  className="col-11 col-md-5 col-lg-3 m-2 rounded"
                  key={index}
                  style={{ marginBottom: "20px" , backgroundColor : "#ffffff" }}
                >
                  <h3 className="d-flex justify-content-center">{chart.name}</h3>
                  <ApexCharts 
                    options={chart.options}
                    series={[{ name: chart.name, data: chart.data }]}
                    type={chart.type}
                    height={250}
                    
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chartdevice;











