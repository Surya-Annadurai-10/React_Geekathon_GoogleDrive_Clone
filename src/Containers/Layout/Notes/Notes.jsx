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
import ListNotesDisplayCard from '../../../Components/ListNotesDisplayCard/ListNotesDisplayCard';
import PinnedListNotesDisplayCard from '../../../Components/PinnedListNotesDisplayCard/PinnedListNotesDisplayCard';
import { BsAndroid2 } from "react-icons/bs";
import { SiIos } from "react-icons/si";
import { MdWeb } from "react-icons/md";
import { IoExtensionPuzzle } from "react-icons/io5";



const Notes = () => {
  const [showInput , setShowInput] = useState(false);
  const [showListTextArea , setShowListTextArea] = useState(false);
  const [showTextArea , setShowTextArea] = useState(false);
  const stateNotes = useSelector(state => state.user.notes)
  const statePinned = useSelector(state => state.user.pinned)
  const dispatch = useDispatch();
  
  const titleRef = useRef(null);
  const bodyRef = useRef(null);
  const [isListNoteEditMode , setIsListNoteEditMode] = useState (false);
 const [listNoteData , setListNoteData] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedValue , setEditedValue] = useState({})
  const [inputValue , setInputValue] = useState ("");
  
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
      type : "notes"
    }

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



  const fetchListNoteData = (val) =>{
    console.log("Val :" , val);
    setListNoteData(val)
    setIsListNoteEditMode(true);
  }

  const handleListNotes = () =>{
    setShowListTextArea(true);
 

  }

  const handleSearch = (value) =>{
  
     console.log("value:" ,value)
     setInputValue(value);
  }

  useEffect(() =>{
    let filtered = stateNotes.filter(ele => ele.title.toLowerCase() == inputValue.toLowerCase());
    console.log("filtered:" , filtered);
    
  },[inputValue]);
 



  return (
    <>
     {
      showInput ?
  
         <div className={styles.inputHead}>
         <div className={styles.innerInputBox}>
          <input onChange={(e) => handleSearch(e.target.value)}  type="text" placeholder="Search by title.." />
          <MdCancel onClick={() =>{
             setShowInput(false);
             setInputValue("");
          }} className={styles.cancel} />
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
        showListTextArea ? <ListNotes listNoteData={listNoteData} isListNoteEditMode={isListNoteEditMode} setIsListNoteEditMode={setIsListNoteEditMode} showListTextArea={showListTextArea} setShowListTextArea={setShowListTextArea} />: <div>
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

 <div>
  {
    stateNotes.length == 0 ?
    <motion.div 
       initial={{
        scale : 0
       }}
       animate={{
        scale : 1
       }}
       transition={{
        // delay : 0.5,
        duration : 0.5
       }}
    className={styles.noNotesCon}>
       <div className={styles.imgCont}>
        <img src="https://pngimg.com/uploads/folder/folder_PNG100450.png" alt="" />
       </div>

       <div className={styles.noNotesYet}>
        <h2>No notes yet</h2>
        <p>Your notes from Google Keep will <br /> appear here.</p>
       </div>
       <div className={styles.iconsSection}>
        <div>
        <BsAndroid2  style={{color : "#FCC524", fontSize: "1.7rem"}} />
        <p>Android Devices</p>
        </div>
        <div>
        <SiIos  style={{color : "#FCC524", fontSize: "1.7rem"}}/>
        <p>iPhone and iPad</p>
        </div>
        <div>
        <MdWeb  style={{color : "#FCC524", fontSize: "1.7rem"}}/>
        <p>Web app</p>
        </div>
        <div>
        <IoExtensionPuzzle style={{color : "#FCC524", fontSize: "1.7rem"}} />
        <p>Chrome extension</p>
        </div>
       </div>


    </motion.div> : 
    <div>
    {
         statePinned.filter(ele => ele.title.toLowerCase().includes( inputValue.toLowerCase())).map((ele , i) =>{
          if(ele.type == "notes"){
           return <PinnedCard  retrieveData={retrieveData} setShowTextArea={setShowTextArea}  key={i}  {...ele} />
          }else if(ele.type == "listnotes"){
           return <PinnedListNotesDisplayCard fetchListNoteData={fetchListNoteData} setIsListNoteEditMode={setIsListNoteEditMode} setShowListTextArea={setShowListTextArea} key={ele.id} {...ele} />
          }
         })
      }
   
      {
          stateNotes.filter(ele => ele.title.toLowerCase().includes( inputValue.toLowerCase())).map((ele , i) =>{
          if(ele.type == "notes"){
           return <NotesCard  retrieveData={retrieveData} setShowTextArea={setShowTextArea}  key={i}  {...ele} />
          }else if(ele.value.type == "listnotes"){
           return <ListNotesDisplayCard fetchListNoteData={fetchListNoteData} setIsListNoteEditMode={setIsListNoteEditMode} setShowListTextArea={setShowListTextArea} key={ele.id} {...ele} />
          }
         })
      }
    </div>
  }
 </div>
    </>
  )
}

export default Notes