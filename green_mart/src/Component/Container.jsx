import React from 'react'
import Navigate from './Navigate'
import { Outlet } from 'react-router'
import Footer from './Footer'

function Container() {
  return (
    <div>
      <Navigate/>
    
      <Outlet/>
    </div>
  )
}

export default Container
