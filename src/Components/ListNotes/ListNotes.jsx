import React, { useEffect, useRef, useState } from 'react'
import styles from "./ListNotes.module.css"
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdPushPin } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import RealInputBox from '../RealInputBox/RealInputBox';
import { useDispatch, useSelector } from 'react-redux';
import { MdCancel } from "react-icons/md";

import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import ListNotesCard from '../ListNotesCard/ListNotesCard';
import { TiInputChecked } from "react-icons/ti";
import { FaAngleDown } from "react-icons/fa6";
import { addListNotesInNotesArray, markAsIncompleteAndShift, replaceEditedListNoteData, resetEditableValueInCompletedAndIncomplete } from '../../slices/userSlice';
import { v4 } from 'uuid';


const ListNotes = (props) => {
 console.log("ListNotes props :" , props);
 
    const listInputRef = useRef(null);
    const [showRealInput , setShowRealInput] = useState(false);
    const[sendListData , setSendListData] = useState(false);
    const dispatch = useDispatch();
    const [showCompletedList , setShowCompletedList] = useState(false);
    
    const stateListNotes = useSelector(state => state.user.listnotes.incomplete)
    const stateListNotesCompleted = useSelector(state => state.user.listnotes.completed)
    const stateListNotesFull = useSelector(state => state.user.listnotes)
    const stateNotes = useSelector(state => state.user.n)    
    const titleRef = useRef(null);

useEffect(()=>{
    if(listInputRef.current){
      listInputRef.current.focus();
    }
},[])

useEffect(() =>{
  if(props.isListNoteEditMode){
      titleRef.current.value = props.listNoteData.title;
      dispatch(resetEditableValueInCompletedAndIncomplete({
        incompleteValue : props.listNoteData.value.incomplete,
        completedValue : props.listNoteData.value.completed
      }))
  }

},[props.isListNoteEditMode])

const handleKeyDown =() =>{
    setShowRealInput(true);
    listInputRef.current.blur();
    listInputRef.current.value = ""
   
}

const rotateArrowMark =() =>{
    setShowCompletedList(!showCompletedList);
}

const markAsIncomplete =(id) =>{
  console.log("id:" , id )
  const findIndexInCompleted = stateListNotesCompleted.findIndex(ele => ele.id == id);
  const findValueInCompleted = stateListNotesCompleted.find(ele => ele.id == id);

 dispatch(markAsIncompleteAndShift({
  index : findIndexInCompleted,
  value : findValueInCompleted
 }))

}

const handleDoneBtn = () =>{
const insertValue = {
  id : props.isListNoteEditMode ? props.listNoteData.id : v4(),
  title : titleRef.current.value,
  value : stateListNotesFull,
  type : "listnotes"
 }

 if(props.isListNoteEditMode){
  dispatch(replaceEditedListNoteData(insertValue))
  props.setIsListNoteEditMode(false)
 }else{
  dispatch(addListNotesInNotesArray(insertValue))
  
 }
 titleRef.current.value = "";
 console.log(stateListNotesFull);
 props.setShowListTextArea(false)
  
}



const handleListNotesData= () =>{
  setSendListData(true)
}
    return (
        <>
        <div className={styles.listNotesCon}>
          <div className={styles.inputCon}>
          <div className={styles.inputConInner}>
           <input ref={titleRef}  type="text" placeholder={"Title.."} className={styles.inputBox} />
          </div>
          <div className={styles.iconsDiv}>
           <BsThreeDotsVertical className={styles.threeDotsList} />
           <MdPushPin className={styles.threeDotsList} />
          </div>
          </div>

          <div>
            {
              stateListNotes.map((ele , i) => {
             
                return <ListNotesCard setShowRealInput={setShowRealInput}  key={ele.id} {...ele} />
               
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

          <div className={styles.completedDiv}>
            {
              stateListNotesCompleted.length > 0 ? <div className={styles.completedListCon}>
                  <div>
                  <FaAngleDown style={{transform: showCompletedList ? "rotate(-90deg)" : "rotate(0deg)"}} onClick={rotateArrowMark}/>
                  </div>
                  {
                    <span>{stateListNotesCompleted.length}</span>
                  }
                <p>Completed Item</p>
              </div> : null
            }
          {
            showCompletedList ? null  : <div className={styles.completedDataContainer}>
            {
                stateListNotesCompleted.map(val =>{
                  return <div style={{color : "#5E5E5E",fontSize: "1.2rem"}} key={val.id} className={styles.completedDataCon}>
                        <TiInputChecked style={{fontSize: "1.5rem"}} onClick={( ) => markAsIncomplete(val.id)} />
                        <p style={{textDecoration : "line-through"}}>{val.value}</p>
                  </div>
                })
              }
            </div> 
          }
          </div>
         <div className={styles.doneBtnCon}>
         <button onClick={handleDoneBtn} className={styles.donebtn}>{props.isListNoteEditMode ? "Edit" : "Done"}</button>
         </div>
     </div>
        </>
    )
}

export default ListNotes