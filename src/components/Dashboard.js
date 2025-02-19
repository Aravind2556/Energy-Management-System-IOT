import React, { useContext } from "react";
import { DContext } from "../context/Datacontext";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
  const { Device, Auth } = useContext(DContext);
  const navigate = useNavigate();

  const handleDevice = () => {
    if (Auth?.Role === "Admin") {
      navigate("/create-device");
    }
  };

  const handleUpdate = (deviceId) => {
    navigate(`/Update-device/${deviceId}`);
  };

  const handleDefect = (deviceId) => {
    navigate(`/Chart-data/${deviceId}`);
  };

  const handlePredictive = () => {
    navigate("/VoltagePredictor");
  };

  const handleUser = () => {
    navigate('/UserInfo')
  }



  return (
    <div className="Dashboard">
      <div className="container mt-4">
        {/* Header with Create Device button */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2>Dashboard</h2>

          <div className="d-flex flex-wrap justify-content-center gap-2 align-items-center">
            {Auth?.Role === "Admin" && (
              <button className="btn btn-primary" onClick={handleUser}>
                User Info
              </button>
            )}

            {Auth?.Role === "Admin" && (
              <button className="btn btn-primary" onClick={handleDevice}>
                + Create Device
              </button>
            )}
          </div>

          
        </div>

        {/* Device Table */}
        <div className="table-responsive">
          <table className="table table-bordered text-center">
            <thead className="table-dark">
              <tr>
                <th>Sl. No</th>
                <th>Device ID</th>
                <th>User ID</th>
                <th>Time</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {Device && Device.length > 0 ? (
                Device.map((device, index) => (
                  <tr key={device.deviceId}>
                    <td>{index + 1}</td>
                    <td>{device.deviceId}</td>
                    <td>{device.userId}</td>
                    <td>{new Date(device.createdAt).toLocaleString()}</td>
                    <td>
                      <div className="d-flex flex-wrap gap-2 justify-content-center">

                        <div className="bg-dark px-2 rounded border border-dark" role="button" title="Prediction" onClick={handlePredictive}>
                          <i class="bi bi-clipboard-data text-primary"></i>
                        </div>
                        <div className="bg-dark px-2 rounded border border-dark" role="button" title="Monitor" onClick={() => handleDefect(device.deviceId)}>
                          <i class="bi bi-graph-up text-primary"></i>
                        </div>
                        <div className="bg-dark px-2 rounded border border-dark" role="button" title="Edit" onClick={() => handleUpdate(device.deviceId)}>
                          <i class="bi bi-pencil text-primary"></i>
                        </div>                        
               
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No Devices Available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
