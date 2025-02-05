import React, { useEffect, useRef, useState } from 'react'
import styles from "./ListNotes.module.css"
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdPushPin } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import RealInputBox from '../RealInputBox/RealInputBox';
import { useSelector } from 'react-redux';
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";


const ListNotes = (props) => {
    const listInputRef = useRef(null);
    const [showRealInput , setShowRealInput] = useState(false);
    const stateListNotes = useSelector(state => state.user.listnotes)
   const[sendListData , setSendListData] = useState(false);
   
useEffect(()=>{
    if(listInputRef.current){
      listInputRef.current.focus();
    }
},[])

const handleKeyDown =() =>{
    setShowRealInput(true);
    listInputRef.current.blur();
    listInputRef.current.value = ""
   
}
let innerFunc;

const handleListNotesData= () =>{
  setSendListData(true)

  
}
    return (
        <>
        <div className={styles.listNotesCon}>
          <div className={styles.inputCon}>
          <div className={styles.inputConInner}>
           <input  type="text" placeholder={"Title.."} className={styles.inputBox} />
          </div>
          <div className={styles.iconsDiv}>
           <BsThreeDotsVertical className={styles.threeDotsList} />
           <MdPushPin className={styles.threeDotsList} />
          </div>
          </div>

          <div>
            {
              stateListNotes.map((ele , i) => {
               if(ele != ""){
                return <div className={styles.listNotesSection} key={i}>
                <MdOutlineCheckBoxOutlineBlank className={styles.box} />
                <p className={styles.para}>{ele}</p>
              </div>
               }
              })  
            }
          </div>
          {
            showRealInput && <RealInputBox setSendListData={setSendListData} sendListData={sendListData} setShowRealInput={setShowRealInput} />
         }
          <div className={styles.textareacON}>
          <FaPlus className={styles.plus} />
         
         <input ref={listInputRef} onClick={handleListNotesData}  onKeyDown={handleKeyDown} className={styles.textareaBox} placeholder={"List item.."} />
          </div>
          <button onClick={() => props.setShowListTextArea(false)} className={styles.donebtn}>Done</button>
     </div>
        </>
    )
}

export default ListNotes