import React from 'react'
import Navigate from './Navigate'
import { Outlet } from 'react-router'
import Footer from './Footer'

function Container2() {
  return (
    <div>
      <Footer/>
    
      <Outlet/>
    </div>
  )
}

export default Container2
