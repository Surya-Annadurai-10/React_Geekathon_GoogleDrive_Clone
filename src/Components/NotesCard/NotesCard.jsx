import React, { useRef, useState } from 'react'
import styles from "./NotesCard.module.css"
import { useDispatch, useSelector } from 'react-redux'
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdPushPin } from "react-icons/md";
import { collectInPinned, deleteNotes } from '../../slices/userSlice';

const NotesCard = (props) => {
// console.log(props);
const optionsRef = useRef(null);
const stateNotes = useSelector(state=> state.user.notes);
const dispatch = useDispatch();
const [showOptions , setShowOptions] = useState(false);



const handleDelete =(id) =>{
   const deletableIndex = stateNotes.findIndex(ele => ele.id == id);

console.log(deletableIndex);

      dispatch(deleteNotes(deletableIndex))
}

const handleEdit =(id) =>{
   props.retrieveData({
    id :id,
    title :props.title,
    body : props.body
   })
   props.setShowTextArea(true);
}

const handlePin = (id) =>{
    const pinnedData = {
        id :id,
        title :props.title,
        body : props.body
       }

       dispatch(collectInPinned(pinnedData));
}
   
  return (
   <>
    <div onMouseLeave={() => setShowOptions(false)} className={styles.noteCard}>
      <div className={styles.noteCardHead}>
      <h3>{props.title}</h3>
      <div className={styles.icons}>
              <BsThreeDotsVertical onClick={() => setShowOptions(!showOptions)}  className={styles.threeDots} />
              <MdPushPin onClick={() => handlePin(props.id)} className={styles.pin} />
      </div>
      </div>
        <p>{props.body}</p>
       {
        showOptions ?  <div  className={styles.options}>
        <p onClick={() => handleDelete(props.id)}>Delete</p>
        <p onClick={() => handleEdit(props.id)}>Edit</p>
    </div> : null
       }
    </div>

   
   </>
  )
}

export default NotesCard