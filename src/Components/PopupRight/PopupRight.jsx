import React from 'react'
import styles from './PopupRight.module.css'
import { MdClear } from "react-icons/md";

const PopupRight = (props) => {
  return (
    <div className={styles.PopupRightCon}>
        <MdClear onClick={() => props.setShowPopupRight(false)} className={styles.clear} />
    </div>
  )
}

export default PopupRight