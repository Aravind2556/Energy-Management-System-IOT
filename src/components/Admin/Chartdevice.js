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

  // Select device from the global context using the chartid
  useEffect(() => {
    const selectedDevice = Device?.find((item) => item.deviceId === chartid);
    if (selectedDevice) {
      setInform(selectedDevice);
    }
  }, [chartid, Device]);

  // Use the fixed ThingSpeak channel id (2834537)
  useEffect(() => {
    if (!Infrom) return;
    // Fixed channel id and API key (only this id will be used)
    const channelId = "2834537";
    const apiKey = "KXM3US7B3WCO8JKS";
    const thingspeakUrl = `https://api.thingspeak.com/channels/${channelId}/feeds.json?api_key=${apiKey}&results=100`;

    fetch(thingspeakUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log("ThingSpeak API Response:", data);
        if (data && data.feeds && data.feeds.length > 0) {
          const feeds = data.feeds;
          const timestamps = feeds.map((feed) =>
            new Date(feed.created_at).toLocaleTimeString()
          );

          // Define the fields for charting
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

              if (values.length === 0) {
                console.warn(`No data found for ${field.name}`);
                return null; // Skip chart creation if no data exists.
              }

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
                  title: { text: `${field.name} Chart`, align: "center" },
                  colors: [field.color],
                },
              };
            })
            .filter(Boolean); // Remove null entries

          setLiveChartData(chartData);
          setAlerts(newAlerts);
        }
      })
      .catch((err) =>
        console.error("Error fetching ThingSpeak data:", err)
      );
  }, [Infrom]);

  return (
    <div className="chart_device container">
      <h1>Device Details and Live Data</h1>

      {/* Top Section (Device Data + Alerts) */}
      <div className="row d-flex justify-content-between">
        {/* Device Data (Left) */}
        <div className="col-md-6 bg-primary rounded p-2">
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
        <div className="col-md-3 bg-primary rounded p-2 ">
          <h2 className="text-light fw-bold">Alerts</h2>
          <div
            style={{
              padding: "40px",
              minHeight: "370px",
              backgroundColor: "white",
              borderRadius: "10px",
            }}
          >
            {alerts.length > 0 ? (
              alerts.map((alert, index) => (
                <div key={index} style={{ color: "black" }}>
                  <p style={{ backgroundColor: "whitesmoke" }}>{alert}</p>
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
            {liveChartData.length === 0 ? (
              <p>No Data Available for Charts</p>
            ) : (
              liveChartData.map((chart, index) => (
                <div
                  className="col-md-4"
                  key={index}
                  style={{ marginBottom: "20px" }}
                >
                  <h3>{chart.name}</h3>
                  {chart.data.length === 0 ? (
                    <p>No Data Available</p>
                  ) : (
                    <ApexCharts
                      options={chart.options}
                      series={[{ name: chart.name, data: chart.data }]}
                      type={chart.type}
                      height={250}
                    />
                  )}
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









