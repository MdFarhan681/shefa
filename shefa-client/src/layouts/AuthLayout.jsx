import React from 'react'
import { Outlet } from 'react-router-dom'
import Up from '../pages/Shared/Up/Up'

const AuthLayout = () => {
  return (
    <div>
        <Up></Up>
        <Outlet></Outlet>
      
    </div>
  )
}

export default AuthLayout
