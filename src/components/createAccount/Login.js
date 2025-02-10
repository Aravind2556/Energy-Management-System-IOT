// import React, { useContext, useState } from 'react';
// import Powermange from '../../assets/undraw_metrics_02ml.png';
// import { DContext } from '../../context/Datacontext';

// export const Login = () => {
//   const apiurl = process.env.REACT_APP_API_URL
//   const {setAuth} = useContext(DContext)
//   const [display,setDisplay] = useState(false)
  
//   const [formData, setFormData] = useState({
   
//     email: "",
//     password: "",
    
//   });

//   console.log("form data for create account",formData)

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };





//   const handleLogin = (e) => {
//     e.preventDefault();

//     if(formData){
//       console.log("formData:",formData)
//       fetch(`${apiurl}/Login-User`,{
//         method : 'POST',
//         headers : {
//           "Content-Type": "application/json",
//         },
//         credentials: "include",
//         body: JSON.stringify(formData),
        
//       })
//       .then(res=>res.json())
//       .then(data=>{
//         if(data.success === true){
//           setDisplay(data.message)

//           setAuth(data.user)
//           console.log("Set auth",data.user)
        
         
//         }
//         else{
//           setDisplay(data.message)
          
//         }
//       })
//       .catch(err=>{
//         console.log("Error",err)
//         alert("Catch error")
//       })
//     }
//     else{
//       alert("data value dont decleared")
//     }
//   };


  





//   return (
//     <div>
      

//     <div className="Login container d-flex justify-content-center align-items-center min-vh-100 fixed">
//       <div className="card p-4 shadow-sm" style={{ maxWidth: '400px', width: '100%' }}>
//         <h2 className="text-center mb-4">Login</h2>
//         {/* Image */}
//         <img src={Powermange} alt="Login Illustration" className="img-fluid mb-3" />
//         <form onSubmit={handleLogin}>
//           {/* Email Input */}
//           <div className="form-floating mb-3">
//             <input
//               type="email"
//               className="form-control"
//               id="floatingEmail"
//               placeholder="name@example.com"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//             />
//             <label htmlFor="floatingEmail">Email</label>
//           </div>

//           {/* Password Input */}
//           <div className="form-floating mb-3">
//             <input
//               type="password"
//               className="form-control"
//               id="floatingPassword"
//               placeholder="Password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//             />
//             <label htmlFor="floatingPassword">Password</label>
//           </div>

//           {/* Login Button */}
//           <button type="submit" className="btn btn-primary w-100 mb-3">
//             Login
//           </button>

//           {/* Links */}
//           <div className="d-flex justify-content-between">
//             <a href="#forgot-password" className="text-decoration-none">
//               Forgot Password?
//             </a>
//             <a href="/create-account" className="text-decoration-none">
//               Create Account
//             </a>
//           </div>

//           <div className="d-flex justify-content-center">
//         {
//           display === false ? (
//          <p></p>
//               ) : (
            
//                 display === "Login succfully" ? (  <p className="text-success">{display}</p>) : (<p className="text-danger">{display}</p>)
              
//               )
//         }
     
//       </div>

//         </form>
//       </div>

//     </div>
   

//     </div>
//   );
// };


import React, { useContext, useState } from 'react';
import PowermangeUser from '../../assets/undraw_mobile-user_qc9c.png';
import PowermangeAdmin from '../../assets/undraw_add-notes_9xls.png';
import { DContext } from '../../context/Datacontext';


export const Login = () => {
  const apiurl = process.env.REACT_APP_API_URL;
  const { setAuth } = useContext(DContext);
  const [display, setDisplay] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  console.log("form data for login", formData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    
    const userType = isAdmin ? 'Admin-Login' : 'Login-User';
    fetch(`${apiurl}/${userType}`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(formData),
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setDisplay(data.message);
          setAuth(data.user);
          window.location.reload()
        } else {
          setDisplay(data.message);
        }
      })
      .catch(err => {
        console.log("Error", err);
        alert("Catch error");
      });
  };

  return (
    <div className={`login-container ${isAdmin ? 'admin-mode' : 'user-mode'}`}>
      <div className="login-content">
        <div className={`image-container ${isAdmin ? 'move-left' : 'move-right'}`}>  
          <img src={isAdmin ? PowermangeAdmin : PowermangeUser} alt="Login Illustration" className="login-image" />
        </div>
        
        <div className={`form-container ${isAdmin ? 'move-right' : 'move-left'}`}>  
          <h2 className="text-center mb-4">{isAdmin ? 'Admin Login' : 'User Login'}</h2>
          <form onSubmit={handleLogin}>
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="floatingEmail"
                placeholder="name@example.com"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <label htmlFor="floatingEmail">Email</label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="password"
                className="form-control"
                id="floatingPassword"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <label htmlFor="floatingPassword">Password</label>
            </div>

            <button type="submit" className="btn btn-primary w-100 mb-3">
              Login
            </button>

            <div className="d-flex justify-content-between">
              <a href="#forgot-password" className="text-decoration-none">
                Forgot Password?
              </a>
              <a href="/create-account" className="text-decoration-none">
                Create Account
              </a>
            </div>

            <div className="d-flex justify-content-center">
              {display && (
                display === "Login successfully" ? (
                  <p className="text-success">{display}</p>
                ) : (
                  <p className="text-danger">{display}</p>
                )
              )}
            </div>
          </form>
        </div>
      </div>

      <div className="toggle-buttons">
        <button className="toggle-btn" onClick={() => setIsAdmin(false)}>User</button>
        <button className="toggle-btn" onClick={() => setIsAdmin(true)}>Admin</button>
      </div>
    </div>
  );
};
