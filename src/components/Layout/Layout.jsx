import React from 'react'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { Header } from 'src/components'


const Layout = () => {
  return (
    <>
    <Header />
    <Outlet />
    <ToastContainer />
    </>
  )
}

export default Layout