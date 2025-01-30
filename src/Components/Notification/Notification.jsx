import React, { useEffect, useRef, useState } from "react";
import styles from "./Notification.module.css";
import { MdNotificationsActive } from "react-icons/md";
import { motion } from "framer-motion";
// import { useDispatch, useSelector } from "react-redux";
// import { setShowNotification } from "../../slices/userSlice";

const Notification = (props) => {
    const [animate , setAnimate] = useState(-120);
    const innerRef = useRef(null);
    // const dispatch = useDispatch();
    // const stateData = useSelector(state => state.user.showNotification)
   console.log(stateData);
   setTimeout(() =>{
       setAnimate(10);
       props.setShowNotification(false);
   },8000)

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
