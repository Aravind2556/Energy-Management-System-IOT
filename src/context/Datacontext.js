import React, { createContext, useEffect, useState } from 'react'

export const DContext = createContext()
function Datacontext(props) {
    const apiurl = process.env.REACT_APP_API_URL;

    const [Auth,setAuth]=useState(null)
    const [User,setUser]=useState(null)
    const [Device,setdevice]=useState(null)
   


    useEffect(()=>{

      if(apiurl){
        fetch(`${apiurl}/checkauth`,{
          method:"GET",
          credentials:'include'
        })
        .then(res=>res.json())
        .then(data=>{
          if(data.success === true){
            setAuth(data.user)
          }
          else{
            setAuth(false)
            console.log(data.messsage)
          }
        })
        .catch(err=>{
          console.log("error fetching in checkauth",err)
        })
      }
    
      },[apiurl])

      useEffect(()=>{
        fetch(`${apiurl}/fetch-user`,{
          method:"GET",
          credentials:'include'
        })
        .then(res=>res.json())
        .then(data=>{
          if(data.success === true){
            setUser(data.user)
            
            
          }
          else{
            console.log(data.messsage)
          }
        })
        .catch(err=>{
          console.log("error fetching to username",err)
        })
  

      },[apiurl])

        useEffect(()=>{
      
          fetch(`${apiurl}/fetch-user-device`,{
            method:"GET",
            credentials:'include'
          })
          .then(res=>res.json())
          .then(data=>{
            if(data.success === true){
              setdevice(data.data)
              
              
              
            }
            else{
              console.log(data.messsage)
            }
          })
          .catch(err=>{
            console.log("error fetching to username",err)
          })
      
        },[apiurl])

    // useEffect(()=>{

    //   fetch(`${apiurl}/fetch-user-device`,{
    //     method:"GET",
    //     credentials:'include'
    //   })
    //   .then(res=>res.json())
    //   .then(data=>{
    //     if(data.success === true){
    //       setdeviceuser(data.data)
          
          
    //     }
    //     else{
    //       console.log(data.messsage)
    //     }
    //   })
    //   .catch(err=>{
    //     console.log("error fetching to username",err)
    //   })
      
    // },[apiurl])



    const data = {Auth,setAuth,User,Device}
return (
   

   
        <DContext.Provider value={data}>
            {props.children}
        </DContext.Provider>
  )
}

export default Datacontext
