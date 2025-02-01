import React, { useEffect, useState } from 'react'
import styles from './Uploading.module.css'
import { motion } from 'framer-motion'
import progress from "../../assets/progress.gif"

const Uploading = () => {
    const [animate , setAnimate] = useState(-220);

    useEffect(() =>{
       setTimeout(() =>{
          setAnimate(10);
       },80000)
    },[])
    
  return (
    <>

     <motion.div animate={{ x:animate }} className={styles.NotificationCon}>
        <div className={styles.para}>
          <p>Uploading!...</p>
          <img className={styles.progressBar} src={progress} alt="" />
        </div>
        {/* <div className={styles.outer}>
          <div className={styles.inner}></div>
        </div> */}
      </motion.div>
   
    </>
  )
}

export default Uploading