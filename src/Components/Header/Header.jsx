import React from 'react'
import styles from "./Header.module.css"
import { IoMdSearch } from "react-icons/io";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { IoSettingsSharp } from "react-icons/io5";
import { SiGooglegemini } from "react-icons/si";
import { IoApps } from "react-icons/io5";
import { MdClear } from "react-icons/md";

const Header = () => {
  return (
  <>
   <header className={styles.header}>
       <div className={styles.left_header}>
        <img src="https://logodownload.org/wp-content/uploads/2020/04/google-drive-logo-0-1.png" alt="" />
         <h1>Drive</h1>
       </div>
       <div  className={styles.middle_header}>
        <div className={styles.inputBox}>
            <IoMdSearch className={styles.searchBtn} role='button' />
            <input type="text" placeholder={"Search in Drive"} />
            <MdClear className={styles.clearBtn} role='button'/>
            <HiAdjustmentsHorizontal className={styles.sortBtn} role='button' />
        </div>
       </div>
       <div  className={styles.right_header}>
       <AiOutlineQuestionCircle className={styles.rightIcons} role='button'/>
       <IoSettingsSharp className={styles.rightIcons} role='button' />
       <SiGooglegemini className={styles.rightIcons} role='button' />
       <IoApps className={styles.rightIcons} role='button'/>
       <div className={styles.profile_picture}>
        <img src="https://tse4.mm.bing.net/th?id=OIP.SAcV4rjQCseubnk32USHigHaHx&pid=Api&P=0&h=180" alt="" />
       </div>
       </div>
   </header>
  
  </>
  )
}

export default Header