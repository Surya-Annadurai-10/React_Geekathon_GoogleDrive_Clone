import React, { useEffect, useRef, useState } from 'react'
import { FaRegCircle } from "react-icons/fa";
import styles from "./TasksCard.module.css"
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoIosStarOutline } from "react-icons/io";
import { IoCheckmarkSharp } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { addEditedTasksInTasksArray, addInStarred, markAsCompleted, unStarTheTask } from '../../slices/userSlice';
import { CgDetailsMore } from "react-icons/cg";
import { MdOutlineRepeat } from "react-icons/md";
// import { FaRegCircle } from "react-icons/fa";
import { MdClear } from "react-icons/md";
import { IoMdStar } from "react-icons/io";


const TasksCard = (props) => {
 const [showTick , setShowTick] = useState(false);
  const dispatch= useDispatch();
  const [isEditmode , setIsEditMode] = useState(false); 
  const titleRef = useRef(null);
  const detatailsRef = useRef(null);
  const dateRef = useRef(null)
  const [period , setPeriod] = useState("");




 const handleTickClick = (id,e) =>{
  e.stopPropagation()
   console.log("id:",id);
   dispatch(markAsCompleted(id));
   
 }

 useEffect(() =>{
    if(isEditmode){
      titleRef.current.value = props.title,
      detatailsRef.current.value = props.details
      setPeriod(props.period);
    }
 },[isEditmode])

 const handleSubmit = (propsId , e) => {
  e.preventDefault();
  const taskContent = {
    id : propsId,
    title : titleRef.current.value,
    details : detatailsRef.current.value,
    period : period,
    starred : false
  }
 dispatch(addEditedTasksInTasksArray(taskContent))
  setPeriod("");
  detatailsRef.current.value= "";
  titleRef.current.value= "";
  setIsEditMode(false);
 }

 const handleStarred =(id,e) => {
  e.stopPropagation();
   dispatch(addInStarred(id))
 }

 const handleUnstar =(id,e) =>{
  e.stopPropagation();
  dispatch(unStarTheTask(id))
 }

  return (
    <>
    {
      isEditmode ?  <form onSubmit={(e) => handleSubmit(props.id,e)}  className={styles.TaskinputCon}>
                       <div>
                        <FaRegCircle />
                       </div>
                       <div className={styles.realInputBox}>
                       <div>
                        <input ref={titleRef} className={styles.titleBox} type="text"  placeholder={"Title"}/>
                        <div className={styles.detailsCon}>
                        <CgDetailsMore  style={{fontSize:"1.4rem"}}/>
                        <textarea ref={detatailsRef}  className={styles.textareaBox} name="" id="" placeholder="Details" />
                        </div>
                       </div>
                       <div className={styles.sessionsCon}>
                       {
                        period ? <div className={styles.periodContent}>
                          <p style={{color : period == "Today" ? "#3579D7" : "rgb(59, 59, 59)"}}>{period}</p>
                          <MdClear onClick={() => setPeriod("")} fontSize={"1.1rem"} color="rgb(30, 30, 130)"/>
                        </div> :  <div className={styles.sessions}>
                        <p onClick={() => setPeriod("Today")}>Today</p>
                        <p onClick={() => setPeriod("Tomorrow")}>Tomorrow</p>
                        <input onChange={(e) => setPeriod((new Date(e.target.value) + "").substring(0,10))}  type="date" className={styles.dateInput}/>
                      </div>
                       }
                        <MdOutlineRepeat style={{fontSize:"1.4rem"}} />
                       </div>
                       </div>
                       <button className={styles.submitBtn}>{isEditmode ? "Edit" : " Submit"}</button>
                  </form> : <div onClick={() => setIsEditMode(true)} className={styles.tasksCardCon}>
      <div    >
        {
          showTick ? <IoCheckmarkSharp cursor={"pointer"} className={styles.tick} onClick={(e) => handleTickClick(props.id,e)} onMouseLeave={() => setShowTick(false)}  fontSize={"2.5rem"}  color={"#2684FC"}/> :  <FaRegCircle cursor={"pointer"}   onMouseEnter={() => setShowTick(true)} fontSize={"1.4rem"} />
        }
      </div>
      <div>
          <h4>{props.title}</h4>
          <p>{props.details}</p>
          <p style={{color : props.period == "Today" ? "#2684FC" : null , border:props.period == "Today" ? "1px solid #2684FC" : null , }} className={styles.periodText}>{props.period}</p>
      </div>
      <div className={styles.icons}>
      <BsThreeDotsVertical  cursor={"pointer"} color={"rgb(82, 82, 82)"} fontSize={"1.3rem"}/>
     
      
      {
        props.starred ? <IoMdStar onClick={(e) => handleUnstar(props.id, e)} cursor={"pointer"} fontSize={"1.3rem"} /> :  <IoIosStarOutline onClick={(e) => handleStarred(props.id , e)} cursor={"pointer"} color={"rgb(82, 82, 82)"} fontSize={"1.3rem"}/>
      }
      </div>
  </div>
    }
    </>
  )
}

export default TasksCard