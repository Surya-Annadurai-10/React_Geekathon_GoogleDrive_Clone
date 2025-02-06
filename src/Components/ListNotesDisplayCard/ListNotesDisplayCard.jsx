import React, { useState } from 'react'
import ListNotesCard from '../ListNotesCard/ListNotesCard';
import styles from "./ListNotesDisplayCard.module.css"
import { FaAngleDown } from "react-icons/fa6";
import { TiInputChecked } from "react-icons/ti";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdPushPin } from "react-icons/md";
import { useDispatch } from 'react-redux';
import { addInPinnedArray, deleteListNotesFromNotesArray } from '../../slices/userSlice';



const ListNotesDisplayCard = (props) => {
    console.log("props:" , props);
    const dispatch = useDispatch();
        const [showCompletedList , setShowCompletedList] = useState(false);
    const [showOptions , setShowOptions] = useState(false);
    
        const rotateArrowMark =() =>{
            setShowCompletedList(!showCompletedList);
        }

        const handleDelete = (id) =>{
            dispatch(deleteListNotesFromNotesArray(id))
            setShowOptions(false)
        }

        const handleEdit = (id) =>{
          console.log(id);
          props.setShowListTextArea(true);
          setShowOptions(false);
          props.fetchListNoteData({
            id : props.id,
            value : props.value,
            title : props.title,
           
          });
        }

        const handlePin = (id) =>{
            console.log("Pinned id: " , id);
            dispatch(addInPinnedArray(id));
        }
    
  return (
  <>
  <div className={styles.cardContainer}>
    <div className={styles.noteCardHead}>
         {
            props.title ? <h3>{props.title}</h3> : <h3>No Title</h3>
         }
           {
                 showOptions ?  <div  className={styles.options}>
                 <p onClick={() => handleDelete(props.id)}>Delete</p>
                 <p onClick={() => handleEdit(props.id)}>Edit</p>
             </div> : null
                }
         
         <div className={styles.icons}>
                 <BsThreeDotsVertical onClick={() => setShowOptions(!showOptions)}  className={styles.threeDots} />
                 <MdPushPin onClick={() => handlePin(props.id)} className={styles.pin} />
         </div>
         </div>
  <div>
  {
     props.value.incomplete.map((ele , i) => {
             
        return <ListNotesCard   key={ele.id} {...ele} />
               
    })  
   }
  </div>

   <div>
     <div className={styles.completedDiv}>
                {
                  props.value.completed.length > 0 ? <div className={styles.completedListCon}>
                      <div>
                      <FaAngleDown style={{transform: showCompletedList ? "rotate(-90deg)" : "rotate(0deg)"}} onClick={rotateArrowMark}/>
                      </div>
                      {
                        <span>{ props.value.completed.length}</span>
                      }
                    <p>Completed Item</p>
                  </div> : null
                }
              {
                showCompletedList ? null  : <div className={styles.completedDataContainer}>
                {
                    props.value.completed.map(val =>{
                      return <div style={{color : "#5E5E5E",fontSize: "1.2rem"}} key={val.id} className={styles.completedDataCon}>
                            <TiInputChecked style={{fontSize: "1.5rem"}} onClick={( ) => markAsIncomplete(val.id)} />
                            <p style={{textDecoration : "line-through"}}>{val.value}</p>
                      </div>
                    })
                  }
                </div> 
              }
              </div>
   </div>
  </div>
  </>
  )
}

export default ListNotesDisplayCard