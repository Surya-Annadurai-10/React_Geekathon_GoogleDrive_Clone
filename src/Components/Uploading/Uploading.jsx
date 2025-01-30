import React, { useState } from 'react'
import styles from './Uploading.module.css'
import { motion } from 'framer-motion'

const Uploading = () => {
    const [animate , setAnimate] = useState(-220);
    
  return (
    <>
     <div className={styles.uploadingDiv}>
     <motion.div animate={{x :animate }} className={styles.NotificationCon}>
        <div className={styles.para}>
          <img src="" alt="" />
          <p>Uploading...</p>
        </div>
        <div className={styles.outer}>
          <div className={styles.inner}></div>
        </div>
      </motion.div>
     </div>
    </>
  )
}

export default Uploading