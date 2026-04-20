import React from 'react'
import Up from '../pages/Shared/Up/Up'
import { Outlet } from 'react-router-dom'

const DashBoardLayout = () => {
  return (
   <div>
    <div className="h-20">
      <Up></Up>
    </div>
    
        
        <Outlet></Outlet>
      
    </div>
  )
}

export default DashBoardLayout
