import React from 'react'
import styles from './PopupRight.module.css'
import { MdClear } from "react-icons/md";
import Notes from '../../Containers/Layout/Notes/Notes';
import Tasks from '../../Containers/Tasks/Tasks';
import Contacts from '../../Containers/Contacts/Contacts';
// import { FaCaretRight } from "react-icons/fa";
// import { MdOutlineCreateNewFolder } from "react-icons/md";
// import { TbFileUpload } from "react-icons/tb";
// import { MdDriveFolderUpload } from "react-icons/md";

const PopupRight = (props) => {
  return (

    <>
       <div className={styles.PopupRightCon}>
      {
        props.showCalender ?  <div className={styles.calenderHead}>
        <h3>Google Calender</h3>
     </div> : null
      }

      {
        props.showNotes ? <Notes /> : null
      }
          <MdClear onClick={() =>{
             props.setShowPopupRight(false)
             props.setShowNotes(false)
             props.setShowCalender(false)
             props.setShowTask(false)
             props.setShowContacts(false)
          }} className={styles.clear} />
        {
          props.showCalender ? <iframe className={styles.calender} src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=Asia%2FKolkata&showPrint=0&src=c3VyeWFhbm5hZHVyYWkxMDQxOTk5QGdtYWlsLmNvbQ&src=ZW4tZ2IuaW5kaWFuI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&src=Y19jbGFzc3Jvb21iNTMxMzAyMUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=Y19jbGFzc3Jvb20yYTllZGExMUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&color=%23039BE5&color=%230B8043&color=%23c26401&color=%230047a8" ></iframe>
          : null
        }  

        {/* {
          props.showNotes ? <Notes /> : null
        } */}

        {
          props.showTask ? <Tasks /> : null
        }

        {
          props.showContacts ? <Contacts /> : null
        }
       
       
       
       </div>


  
    </>
  )
}

export default PopupRight