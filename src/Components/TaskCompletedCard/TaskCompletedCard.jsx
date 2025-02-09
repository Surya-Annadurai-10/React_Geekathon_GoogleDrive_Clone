import React, { useState } from 'react'
import { FaRegCircle } from "react-icons/fa";
import styles from "./TaskCompletedCard.module.css"
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoIosStarOutline } from "react-icons/io";
import { IoCheckmarkSharp } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { deleteFromTasksCompleted, markAsCompleted, markAsUncompleted } from '../../slices/userSlice';
import { RiDeleteBin6Fill } from "react-icons/ri";

const TaskCompletedCard = (props) => {
 const [showTick , setShowTick] = useState(false);
 const [showQuotes , setShowQuotes] = useState(false);
  const dispatch= useDispatch();
  
 const handleTickClick = (id) =>{
   console.log("id:",id);
   props.setShowSubTask()
dispatch(markAsUncompleted({
  index : props.setIndex,
  id : id
}));   
 }

 const handleDelete = (id) => {
    dispatch(deleteFromTasksCompleted({
      index : props.setIndex,
      id : id
    }));
 }

  return (
    <>
    <div className={styles.tasksCardCon}>
        <div  className={styles.tickmark}  >
      
            <IoCheckmarkSharp onMouseLeave={() => setShowQuotes(false)} onMouseEnter={() => setShowQuotes(true)} cursor={"pointer"} className={styles.tick} onClick={() => handleTickClick(props.id)}   fontSize={"2rem"}  color={"#2684FC"}/> 
           {
            showQuotes ?   <p className={styles.uncompleted}>Mark uncompleted</p> : null
           }
        </div>
        <div>
            <h4 style={{textDecoration: "line-through"}}>{props.title}</h4>
            <p>{props.details}</p>
            <p style={{color : props.period == "Today" ? "#2684FC" : null , border:props.period == "Today" ? "1px solid #2684FC" : null , }} className={styles.periodText}>{props.period}</p>
        </div>
        <div className={styles.icons}>
        <RiDeleteBin6Fill color="#6E7276" onClick={() => handleDelete(props.id)} fontSize={"1.5rem"} />
        </div>
    </div>
    </>
  )
}

export default TaskCompletedCard