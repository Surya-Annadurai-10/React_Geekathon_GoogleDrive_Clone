import React, { useRef, useState } from 'react'
import styles from "./PinnedCard.module.css"
import { useDispatch, useSelector } from 'react-redux'
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdPushPin } from "react-icons/md";
import { collectInPinned, deleteInPinned, deleteNotes, unPinData } from '../../slices/userSlice';

const PinnedCard = (props) => {
// console.log(props);
const optionsRef = useRef(null);
const stateNotes = useSelector(state=> state.user.notes);
const statePinned = useSelector(state=> state.user.pinned);
const dispatch = useDispatch();
const [showOptions , setShowOptions] = useState(false);



const handleDelete =(id) =>{
   const deletableIndex = statePinned.findIndex(ele => ele.id == id);

console.log(deletableIndex);

      dispatch(deleteInPinned(deletableIndex))
}

const handleEdit =(id) =>{
   props.retrieveData({
    id :id,
    title :props.title,
    body : props.body,
    pinned : true, 
     type : "notes"
   })
   props.setShowTextArea(true);
}

const handleUnPin = (id) =>{
    const pinnedData = {
        id :id,
        title :props.title,
        body : props.body,
        type : "notes"
       }

       dispatch(unPinData(pinnedData));
}
   
  return (
   <>
    <div onMouseLeave={() => setShowOptions(false)} className={styles.noteCard}>
      <div className={styles.noteCardHead}>
      <h3>{props.title}</h3>
      <div className={styles.icons}>
              <BsThreeDotsVertical onClick={() => setShowOptions(!showOptions)}  className={styles.threeDots} />
              <MdPushPin onClick={() => handleUnPin(props.id)} style={{color:"#83B3F3"}} className={styles.pin} />
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

export default PinnedCard