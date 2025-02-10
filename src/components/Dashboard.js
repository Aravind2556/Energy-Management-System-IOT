import React, { useContext } from "react";
import { DContext } from "../context/Datacontext";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
  const { Device, Auth } = useContext(DContext);
  console.log("device data",Device)
  const navigate = useNavigate();

  const handledevice = () => {
    if (Auth?.Role === "Admin") {
      navigate("/create-device");
    }
  };

  const handleupdate = (rangeid) => {
    window.location.href=`/Update-device/${rangeid}`
  }

  const handledefect = (chartid) => {
    window.location.href=`/Chart-data/${chartid}`
  }

  const handlepredtive = () => {
    navigate('/VoltagePredictor')
  }
 
  return (
    <div className="Dashboard">
      <div className="container mt-4">
        {/* Header with Create Device button */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2>Dashboard</h2>
          {Auth?.Role === "Admin" && (
            <button className="btn btn-primary" onClick={handledevice}>
              + Create Device
            </button>
          )}
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
                      <button className="btn btn-warning btn-sm mx-1" onClick={handlepredtive}>
                        Predictive
                      </button>
                      <button className="btn btn-danger btn-sm mx-1" onClick={()=>handledefect(device.deviceId)}>
                        Monitor
                      </button>
                      {Auth?.Role === "Admin" && (
                        <button className="btn btn-secondary btn-sm mx-1" onClick={()=>handleupdate(device.deviceId)}>
                          Edit
                        </button>
                      )}
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
