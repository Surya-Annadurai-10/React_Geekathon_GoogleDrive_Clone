import React from 'react'
import styles from './Spam.module.css'
import { IoMdInformationCircleOutline } from "react-icons/io";
import { MdClear } from "react-icons/md";

const Spam = () => {
  return (
    <>
     <div className={styles.computersCon}> 
          <div className={styles.compHead}>
          <h1>Spam</h1>
          <IoMdInformationCircleOutline style={{fontSize:"1.4rem"}} />
          </div>
          <div className={styles.blueCon}>
            <div className={styles.infoContent}>
              
              <p>Items in spam won't appear anywhere ele in Drive. Items are permanently removed after 30days.</p>
            </div>
            
          </div>
          <div className={styles.dataCon}>
            <img src="https://img.freepik.com/premium-vector/spam-isolated-cartoon-vector-illustrations_107173-59462.jpg" alt="" />
            <h2>Your spam is empty</h2>
            <p>Items in sapm won't appear anywhere in Drive. Items are permanently removed</p>
             <p>after 30 days.</p>
          </div>
          </div>
    </>
  )
}

export default Spam