import React from 'react'
import styles from './Computers.module.css'
import { IoMdInformationCircleOutline } from "react-icons/io";
import { MdClear } from "react-icons/md";


const Computers = () => {
  return (
    <>
  
      <div className={styles.computersCon}> 
      <div className={styles.compHead}>
      <h1>Computers</h1>
      <IoMdInformationCircleOutline style={{fontSize:"1.4rem"}} />
      </div>
      <div className={styles.blueCon}>
        <div className={styles.infoCon}>
        <IoMdInformationCircleOutline style={{fontSize:"1.4rem",  color:"#0842A0"}} />
        </div>
        <div className={styles.infoContent}>
          <h2>Changes will sync automatically.</h2>
          <p>If you add, edit, move or delete files in folders currently syncing with Google Drive, those changes will also happen on your computer. <a href="https://support.google.com/drive/answer/10838124?visit_id=638735668928139829-627112234&p=computers_tab_syncing&rd=1" target="_blank" rel="noopener noreferrer">Learn more</a></p>
        </div>
  
        <MdClear  className={styles.clearBtn}/>
        
      </div>
      <div className={styles.dataCon}>
        <img src="https://static.vecteezy.com/system/resources/previews/021/515/008/original/data-scientist-job-flat-concept-spot-illustration-editable-2d-cartoon-character-on-white-for-web-design-evaluating-performance-business-analyst-creative-idea-for-website-mobile-app-vector.jpg" alt="" />
        <h2>No Folders Syncing with drive</h2>
        <p>Folders on your computer that you sync with Drive using Drive for desktop will show up</p>
         <p>here. <a className={styles.learn} href="https://support.google.com/drive/answer/10838124?visit_id=638735668929803586-795403184&p=empty_state_computers_web&rd=1" target='_blank'>Learn more</a></p>
      </div>
      </div>
     
  
    </>
  )
}

export default Computers