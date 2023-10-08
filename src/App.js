import { useEffect, useState } from 'react';
import './App.scss';
import Routes from "./pages/Routes"
function App() {
  const [isApploading , setIsApploading]= useState(true)
  useEffect(()=>{
      setTimeout(()=>{
          setIsApploading(false)
      }, 2000)
  },[])
  if (isApploading) {
    return (
      <div className="loader-container ">
        <span className="loader"></span>
      </div>
    )
  }
  return (
    
    <>
    <Routes/>
    </>
    
  )
}

export default App;
