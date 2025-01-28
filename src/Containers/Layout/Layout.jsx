import React, { useState } from 'react'
import styles from './Layout.module.css'
import Header from '../../Components/Header/Header'
import SideBar from '../../Components/SideBar/SideBar'
import { Outlet } from 'react-router-dom'
import RightSideBar from '../../Components/RightSideBar/RightSideBar'
import PopupRight from '../../Components/PopupRight/PopupRight'

const Layout = () => {
  const [showPopupRight , setShowPopupRight] = useState(false);
  return (
    <div className={styles.parentMain}>
       <div className={styles.layoutLeft}>
       <Header />
        <div className={styles.mainCon}>
            <SideBar />
            <Outlet />
            <RightSideBar showPopupRight={showPopupRight} setShowPopupRight = {setShowPopupRight} />
           
        </div>
       </div>
        {
             showPopupRight ?  <PopupRight showPopupRight={showPopupRight} setShowPopupRight = {setShowPopupRight} /> : null
            }
    </div>
  )
}

export default Layout