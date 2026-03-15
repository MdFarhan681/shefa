import React from 'react'
import { Outlet } from 'react-router-dom'
import Navber from '../pages/Shared/Navber/Navber'
import Footer from '../pages/Shared/Footer/Footer'
import Up from '../pages/Shared/Up/Up'

const RootLayout = () => {
  return (
    <div>
        <Up></Up>
        <Navber></Navber>
        <Outlet></Outlet>
        <Footer></Footer>
      
    </div>
  )
}

export default RootLayout
