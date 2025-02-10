import React, { useState, useEffect } from "react";

const VoltagePredictor = () => {
  const [voltageData, setVoltageData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [predictedUnits, setPredictedUnits] = useState(null);

  // Fetch API Data from ThingSpeak
  useEffect(() => {
    fetch("https://api.thingspeak.com/channels/2834537/feeds.json?api_key=KXM3US7B3WCO8JKS&results")
      .then(response => response.json())
      .then(data => {
        if (data.feeds) {
          setVoltageData(data.feeds);
        }
      })
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  // Calculate predicted monthly consumption based on average voltage
  const calculateUnits = () => {
    let totalVoltage = 0;
    let count = 0;
    let current = 5; // Assume 5A current

    voltageData.forEach(feed => {
      let date = new Date(feed.created_at);
      let month = date.getMonth() + 1; // Months are 0-based
      let year = date.getFullYear();

      if (month === parseInt(selectedMonth) && year === parseInt(selectedYear)) {
        if (feed.field1) {
          totalVoltage += parseFloat(feed.field1);
          count++;
        }
      }
    });

    if (count === 0) {
      setPredictedUnits("No data available");
      return;
    }

    let avgVoltage = totalVoltage / count;
    let totalUnits = (avgVoltage * current * 24 * 30) / 1000; // kWh calculation

    setPredictedUnits(totalUnits.toFixed(2) + " kWh");
  };

  return (
    <div className=" chart_device container py-4">
      <h1 className="text-center mb-4">Voltage Prediction</h1>

      <div className="row mb-3">
        <div className="col-md-6 mb-2">
          <label htmlFor="monthSelect" className="form-label">Select Month:</label>
          <select
            id="monthSelect"
            className="form-select"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {new Date(2024, i).toLocaleString("default", { month: "long" })}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-6 mb-2">
          <label htmlFor="yearSelect" className="form-label">Select Year:</label>
          <select
            id="yearSelect"
            className="form-select"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            {Array.from({ length: 5 }, (_, i) => (
              <option key={i} value={2025 - i}>
                {2025 - i}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="text-center mb-3">
        <button className="btn btn-primary" onClick={calculateUnits}>
          Predict Consumption
        </button>
      </div>

      {predictedUnits && (
        <div className="alert alert-info text-center" role="alert">
          Predicted Monthly Consumption: {predictedUnits}
        </div>
      )}
    </div>
  );
};

export default VoltagePredictor;
