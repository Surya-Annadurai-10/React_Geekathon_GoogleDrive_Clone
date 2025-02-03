import React from 'react'
import { MdClear } from "react-icons/md";
import styles from "./Notes.module.css"
import { IoIosSearch } from "react-icons/io";

const Notes = () => {
  return (
    <>
     <header className={styles.notesCon}>
        <div>
            <p>Keep</p>
            <h3>Notes</h3>
        </div>
        <div>
        <IoIosSearch />
        <MdClear />
        </div>
        <div>

        </div>
     </header>
    </>
  )
}

export default Notes