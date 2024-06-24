import React from 'react'
import { Outlet } from 'react-router-dom'
import { Footer, Header } from 'src/components'


const Layout = () => {
  return (
    <>
    <Header />
    <Outlet />
    <Footer />
    </>
  )
}

export default Layout