import React from 'react'
import { MdCancel } from "react-icons/md";
import styles from "./ListNotesCard.module.css"
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import {  addInCompletedListNotes, deleteListNote } from '../../slices/userSlice';

const ListNotesCard = ({id , value,setShowRealInput}) => {
    const dispatch = useDispatch();
    const stateListNotes = useSelector(state => state.user.listnotes.incomplete)


    const deleteListNoteFn = (id) =>{
        console.log("List Note id :" , id);
         dispatch(deleteListNote(id))
       }

       const handleCompleted = (id) =>{
            console.log(id);
            let clickedValue = stateListNotes.find(ele => ele.id == id);
            let clickedValueIndex = stateListNotes.findIndex(ele => ele.id == id);
           

            // console.log("compeleteUpdated : " , compeleteUpdated);
            dispatch(addInCompletedListNotes({
                index : clickedValueIndex,
                value : clickedValue
            }))
        
            setShowRealInput(false)
       }

  return (
  <>
    <div className={styles.listNotesSection} >
        <MdOutlineCheckBoxOutlineBlank onClick={() => handleCompleted(id)} className={styles.box} />
        <p className={styles.para}>{value}</p> 
        <MdCancel className={styles.cancelListNote} onClick={() => deleteListNoteFn(id)} />
    </div>
  </>
  )
}

export default ListNotesCard