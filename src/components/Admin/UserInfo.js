import React, { useEffect, useState } from 'react'

export const UserInfo = () => {
    const apiurl = process.env.REACT_APP_API_URL;

    const [user,setUser]=useState(null)
    console.log("user collection data", user )


    useEffect(()=>{
        fetch(`${apiurl}/fetch-users`,{
            method:"GET",
            credentials:'include'
          })
          .then(res=>res.json())
          .then(data=>{
            console.log("data:",data)
            if(data.success === true){
              setUser(data.users)
              alert(data.message)
            }
            else{
                alert(data.message)
            }
          })
          .catch(err=>{
            console.log("error fetching in checkauth",err)
          })
      
    },[])

  return (
    <div>
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
              {user && user.length > 0 ? (
                user.map((users, index) => (
                  <tr key={users.deviceId}>
                    <td>{index + 1}</td>
                    <td>{users.Name}</td>
                    <td>{users.userid}</td>
                    <td>{new Date(users.createdAt).toLocaleString()}</td>

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
  )
}
