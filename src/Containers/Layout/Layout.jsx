import React from 'react'
import styles from './Layout.module.css'
import Header from '../../Components/Header/Header'
import SideBar from '../../Components/SideBar/SideBar'
import { Outlet } from 'react-router-dom'
import RightSideBar from '../../Components/RightSideBar/RightSideBar'

const Layout = () => {
  return (
    <div>
        <Header />
        <div className={"mainCon"}>
            <SideBar />
            <Outlet />
            <RightSideBar />
        </div>
    </div>
  )
}

export default Layout