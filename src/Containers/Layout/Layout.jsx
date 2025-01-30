import React, { useEffect, useState } from 'react'
import styles from './Layout.module.css'
import Header from '../../Components/Header/Header'
import SideBar from '../../Components/SideBar/SideBar'
import { Outlet, useNavigate } from 'react-router-dom'
import RightSideBar from '../../Components/RightSideBar/RightSideBar'
import PopupRight from '../../Components/PopupRight/PopupRight'
import { useDispatch } from 'react-redux'
import { addUser } from '../../slices/userSlice'

const Layout = () => {
  const [showPopupRight , setShowPopupRight] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  useEffect(() =>{
    let userDetails = localStorage.getItem("user")

    if(userDetails){
     userDetails = JSON.parse(userDetails);
         dispatch(addUser(userDetails))
          navigate("/home");
    }else{
      navigate("/");
    }
  },[]);

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