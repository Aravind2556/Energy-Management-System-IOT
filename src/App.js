
import React, { useContext, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { Login } from './components/createAccount/Login'

import  Navbar  from './components/Navbar'
import Register from './components/createAccount/Register'


import { Dashboard } from './components/Dashboard'
import { DContext } from './context/Datacontext'

import { Createdevice } from './components/Admin/Createdevice'
import { Updatedata } from './components/Admin/Updatedata'
import { Chartdevice } from './components/Admin/Chartdevice'
import VoltagePredictor from './components/Admin/VoltagePredictor'


export const App = () => {

   const [activeTab, setActiveTab] = useState("all");
   const navigate = useNavigate()
   const {Auth}=useContext(DContext)

  const handlephase = (phase) => {
    if (phase === 'all') {
      setActiveTab('all')
      navigate('/Dashboard')
      
      
    }
    else if (phase === 'phase1') {
      setActiveTab('phase1')
      navigate('/phase1')
      
     
    }
    else if (phase === 'phase2') {
      setActiveTab('phase2')
      navigate('/phase2')
      
      
    }
    else if (phase === 'phase3') {
      setActiveTab('phase3')
      navigate('/phase3')
     
      
    }
  }
  return (
    <div>

     <Navbar/>

    {/* <div className='mt-5 text-center'>
    <a href='/phase1'>Phase 1</a>
     <a href='/phase2'>Phase 2</a>
     <a href='/phase3'>Phase 3</a>
    </div> */}

{
  window.location.pathname === '/' && window.location.pathname === '/login' && window.location.pathname === '/create-account' && (
    <div className="glide d-flex justify-content-center ">
    <div className="tabs position-relative bg-white shadow-sm p-3 rounded-pill d-flex gap-3">
      <div
        style={{
          width: "60px",
          transform:
            activeTab === "all"
              ? "translateX(0)"
              : activeTab === "phase1"
                ? "translateX(100%)"
                : activeTab === "phase2"
                  ? "translateX(200%)"
                  : activeTab === "phase3"
                    ? "translateX(300%)"
                    : "translateX(0)",
        }}
      ></div>

      <button
        className={`btn ${activeTab === "all" ? "btn-primary text-white" : "btn-light"}`}
        onClick={() => handlephase("all")}
      >
        All
      </button>
      <button
        className={`btn ${activeTab === "phase1" ? "btn-primary text-white" : "btn-light"}`}
        onClick={() => handlephase("phase1")}
      >
        Phase 1
      </button>
      <button
        className={`btn ${activeTab === "phase2" ? "btn-primary text-white" : "btn-light"}`}
        onClick={() => handlephase("phase2")}
      >
         Phase 2
      </button>
      <button
        className={`btn ${activeTab === "phase3" ? "btn-primary text-white" : "btn-light"}`}
        onClick={() => handlephase("phase3")}
      >
         Phase 3
      </button>
    </div>
  </div>
  ) 
}
   
    <Routes>
      <Route path='/' element={Auth ? <Dashboard/> : <Login/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/create-account' element={<Register/>}></Route>
      <Route path='/create-device' element={<Createdevice/>}></Route>
      <Route path='/Update-device/:rangeid' element={<Updatedata/>}></Route>
      <Route path='/Chart-data/:chartid' element={<Chartdevice/>}></Route>
      <Route path='/VoltagePredictor' element={<VoltagePredictor/>}></Route>
    </Routes>

    

    </div>
  )
}
