import React, { useEffect, useRef, useState } from "react";
import styles from "./Notification.module.css";
import { MdNotificationsActive } from "react-icons/md";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { setShowNotification } from "../../slices/userSlice";
// import { setShowNotification } from "../../slices/userSlice";

const Notification = (props) => {
    const [animate , setAnimate] = useState(-220);
    const innerRef = useRef(null);
    const dispatch = useDispatch();

  useEffect(() =>{
   let time =  setTimeout(() =>{
      setAnimate(10);
      dispatch(setShowNotification(false));
  },6000)

  return () => clearTimeout(time);
  },[])

   useEffect(() =>{
    innerRef.current.style.width = "100%"

   },[animate])

   useEffect(() =>{
      innerRef.current.style.width = "0%"
   },[]);
  
    return (
    <>
      <motion.div animate={{x :animate }} className={styles.NotificationCon}>
        <div className={styles.para}>
          <MdNotificationsActive style={{ fontSize: "1.3rem" }} />
          <p>Files Upload Successfully</p>
        </div>
        <div className={styles.outer}>
          <div ref={innerRef} className={styles.inner}></div>
        </div>
      </motion.div>
    </>
  );
};

export default Notification;
