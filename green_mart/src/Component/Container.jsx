import React from 'react'
import Navigate from './Navigate'
import { Outlet } from 'react-router'
import Footer from './Footer'

function Container() {
  return (
    <div>
      <Navigate/>
    <div className="mt-20 ">
      <Outlet/>
      </div>
    </div>
  )
}

export default Container
