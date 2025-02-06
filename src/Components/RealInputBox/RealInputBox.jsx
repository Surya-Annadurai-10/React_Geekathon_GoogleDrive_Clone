import React, { useEffect, useRef } from 'react'
import styles from "./RealInputBox.module.css"
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { MdCancel } from "react-icons/md";
import { useDispatch } from 'react-redux';
import { addInListNotes } from '../../slices/userSlice';
import { v4 } from 'uuid';

const RealInputBox = (props) => {
     const realInputRef = useRef(null);
     const dispatch = useDispatch();

     useEffect(() =>{
       if(realInputRef.current){
        realInputRef.current.focus();
       }
     },[])

     useEffect(() =>{
         if(props.sendListData){
          let listData;
           if(realInputRef.current.value){
            listData = {
              id : v4(),
              completed : false,
              value : realInputRef.current.value 
            };

            realInputRef.current.value = "";
        
            dispatch(addInListNotes(listData))
           realInputRef.current.focus();
           }
         console.log("listData :" , listData);
        
        props.setSendListData(false);
         }  
     },[props.sendListData])
  return (
   <>
    <div className={styles.realInputCon}>
        <div className={styles.checkBox}>
        <MdOutlineCheckBoxOutlineBlank className={styles.box} />
        </div>
        <MdCancel onClick={() => {
          props.setShowRealInput(false)
          props.setSendListData(true);
        }} className={styles.fieldCancel} />
        <textarea ref={realInputRef} className={styles.textareaBox} type="text" /> 
      </div>
   </>
  )
}

export default RealInputBox