import React, { useEffect, useRef, useState } from 'react'
import { MdClear } from "react-icons/md";
import styles from "./Notes.module.css"
import { IoIosSearch } from "react-icons/io";
import { MdCancel } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { RxCheckbox } from "react-icons/rx";
import {motion} from "framer-motion"
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdPushPin } from "react-icons/md";
import NotesCard from '../../../Components/NotesCard/NotesCard';
import { useDispatch, useSelector } from 'react-redux';
import { v4 } from 'uuid';
import { collectNotesData, replaceEditedData, replaceEditedDataInPinned } from '../../../slices/userSlice';
import PinnedCard from '../../../Components/PinnedCard/PinnedCard';
import ListNotes from '../../../Components/ListNotes/ListNotes';

const Notes = () => {
  const [showInput , setShowInput] = useState(false);
  const [showListTextArea , setShowListTextArea] = useState(false);
  const [showTextArea , setShowTextArea] = useState(false);
  const stateNotes = useSelector(state => state.user.notes)
  const statePinned = useSelector(state => state.user.pinned)
  const dispatch = useDispatch();
  // const [title , setTitle] = useState("")
  // const [body , setBody] = useState("")
  const titleRef = useRef(null);
  const bodyRef = useRef(null);
 
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedValue , setEditedValue] = useState({})

const retrieveData = (value) =>{
  console.log("value :" , value);
  
  setIsEditMode(true);
  const editVal = {
    ...value
  }
   setEditedValue(editVal)
}
useEffect(() =>{
   if(isEditMode){

    titleRef.current.value = editedValue.title;
    bodyRef.current.value = editedValue.body;
   }
},[isEditMode])


  const handleDoneBtn = () =>{
    const notesData = {
      id : isEditMode ? editedValue.id : v4(),
      title : titleRef.current.value,
      body : bodyRef.current.value, 
    }

    useEffect(() =>{
       if(listInputRef.current && showListTextArea){
        listInputRef.current.value = "this is in useEffect focus"
       }
    },[showListTextArea])

if(editedValue.pinned){
  dispatch(replaceEditedDataInPinned(notesData));
     setIsEditMode(false);
    setShowTextArea(false);
}

if(isEditMode){
    console.log(notesData);
    dispatch(replaceEditedData(notesData));
    setIsEditMode(false);
    setShowTextArea(false);
}else{
  console.log(notesData); 
  dispatch(collectNotesData(notesData));
  setShowTextArea(false);
}
  }

  // const createListTextBox =() =>{
  //   return <div className={styles.listNotesCon}>
  //        <div className={styles.inputCon}>
  //        <div className={styles.inputConInner}>
  //         <input  type="text" placeholder={"Title.."} className={styles.inputBox} />
  //        </div>
  //        <div className={styles.iconsDiv}>
  //         <BsThreeDotsVertical className={styles.threeDotsList} />
  //         <MdPushPin className={styles.threeDotsList} />
  //        </div>
  //        </div>
  //        <div className={styles.textareacON}>
  //        <FaPlus className={styles.plus} />
  //        <input ref={listInputRef} className={styles.textareaBox} placeholder={"List item.."} />
  //        </div>
  //        <button onClick={() => setShowListTextArea(false)} className={styles.donebtn}>Done</button>
  //   </div>
  // }

  const handleListNotes = () =>{
    setShowListTextArea(true);
 

  }
 



  return (
    <>
     {
      showInput ?
  
         <div className={styles.inputHead}>
         <div className={styles.innerInputBox}>
          <input type="text" placeholder="Search.." />
          <MdCancel onClick={() => setShowInput(false)} className={styles.cancel} />
         </div>

        
      </div>

       : <header className={styles.notesCon}>
      <div>
          <p>Keep</p>
          <h3>Notes</h3>
      </div>
      <div>

     
      <IoIosSearch  onClick={() => setShowInput(true)} role='button' className={styles.search} />
  {/* <span className={styles.search_tag}>search</span> */}
      {/* <MdClear className={styles.search}/> */}
      </div>
      <div>

      </div>
   </header>
     }
   {
    showTextArea  ? <div  className={styles.textareaCon}>
     <div className={styles.titleInputSection}>
      <div>
         <input ref={titleRef} type="text" placeholder={"Title.."} />
      </div>
      <div>
        <BsThreeDotsVertical className={styles.threeDots} />
        <MdPushPin className={styles.pin} />
      </div>
     </div>
      <textarea ref={bodyRef} name="" id="" placeholder={"Take a note.."}></textarea>
      {
        isEditMode ? <button onClick={() => {
          setShowTextArea(false)
          setIsEditMode(false);
        }} className={styles.cancelBtn}>Cancel</button> : null
      }
      <button className={styles.button} onClick={handleDoneBtn}>{isEditMode ? "Edit" : "Done"}</button>
    </div> :
    <div>
      {
        showListTextArea ? <ListNotes showListTextArea={showListTextArea} setShowListTextArea={setShowListTextArea} />: <div>
        <div  className={styles.addCon}>
        <div onClick={() => setShowTextArea(true)}>
         <IoMdAdd style={{color : "#FBBC04" , fontSize:"1.8rem"}} />
         <p>Take a note..</p>
         </div>
         <RxCheckbox onClick={handleListNotes} className={styles.check} />
        </div>
     </div>
      }
    </div>
   }

   {
      statePinned.map((ele , i) =>{
        return <PinnedCard  retrieveData={retrieveData} setShowTextArea={setShowTextArea}  key={i}  {...ele} />
      })
   }

   {
      stateNotes.map((ele , i) =>{
        return <NotesCard  retrieveData={retrieveData} setShowTextArea={setShowTextArea}  key={i}  {...ele} />
      })
   }
    </>
  )
}

export default Notes