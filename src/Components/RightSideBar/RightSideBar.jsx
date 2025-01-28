import React from 'react'
import styles from './RightSideBar.module.css'
import { IoMdAdd } from "react-icons/io";
import { MdChevronLeft } from "react-icons/md";

const RightSideBar = (props) => {
  return (
    <>
      <div className={styles.RightSideBarCon}>
         <div onClick={() => props.setShowPopupRight(true)} className={styles.wrapper}>
         <div className={styles.img_con}>
            <img src="https://logos-world.net/wp-content/uploads/2021/03/Google-Calendar-Logo.png" alt="calender" />
          </div>
         </div>
        <div onClick={() => props.setShowPopupRight(true)} className={styles.wrapper}>
        <div className={styles.keep}>
            <img className={styles.keep} src="https://webstockreview.net/images/google-keep-icon-png-4.png" alt="keep" />
          </div>
        </div>
          <div onClick={() => props.setShowPopupRight(true)} className={styles.wrapper}>
          <div className={styles.tasks}>
            <img className={styles.tasks} src="https://cdn.freelogovectors.net/wp-content/uploads/2023/01/google-tasks-logo-freelogovectors.net_.png" alt="tasks" />
          </div>
          </div>
          <div onClick={() => props.setShowPopupRight(true)} className={styles.wrapper}>
          <div className={styles.contacts}>
            <img className={styles.contacts} src="https://www.marefa.org/w/images/thumb/a/a8/Google_Contacts_icon_(2022).svg/1200px-Google_Contacts_icon_(2022).svg.png" alt="contacts" />
          </div>
          </div>
          <div>
          <IoMdAdd className={styles.add} />
          
          </div>
          <div className={styles.leftIcon}>
          <MdChevronLeft    />
          </div>
      </div>
      
    </>
  )
}

export default RightSideBar