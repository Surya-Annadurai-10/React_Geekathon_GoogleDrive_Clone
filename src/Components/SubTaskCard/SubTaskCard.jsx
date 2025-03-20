import React, { useEffect, useRef, useState } from 'react'
import { FaRegCircle } from "react-icons/fa";
import styles from "./SubTaskCard.module.css"
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoIosStarOutline } from "react-icons/io";
import { IoCheckmarkSharp } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { addEditedTasksInTasksArray, addInStarred, addSubTaskInStarred, deleteFromTasks, deleteSubTask, markAsCompleted, markSubTaskAsCompleted, moveToTopInTask, replaceEditedTasksInRespectiveSubTaskArray, unIndentSubTask, unStarTheSubTask, unStarTheTask } from '../../slices/userSlice';
import { CgDetailsMore } from "react-icons/cg";
import { MdOutlineRepeat } from "react-icons/md";
// import { FaRegCircle } from "react-icons/fa";
import { MdClear } from "react-icons/md";
import { IoMdStar } from "react-icons/io";
import { BiUpArrowAlt } from "react-icons/bi";
import { MdOutlineSubdirectoryArrowRight } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import SubTask from '../Subtask/SubTask';
import { MdCancel } from "react-icons/md";



const SubTaskCard = (props) => {
 const [showTick , setShowTick] = useState(false);
  const dispatch= useDispatch();
  const [isSubTaskEditmode , setIsSubTaskEditMode] = useState(false); 
  const subTasktitleRef = useRef(null);
  const subTaskDetatailsRef = useRef(null);
  const subTaskDateRef = useRef(null)
  const [subPeriod , setSubPeriod] = useState(props.subPeriod)
  const [showMenu , setShowMenu] = useState(false);
   const [showSubTask , setShowSubTask] = useState(false);
  
  // console.log(props);
  

 const handleTickClick = (id,e) =>{
  e.stopPropagation()
   console.log("id:",id);
   dispatch(markSubTaskAsCompleted({
    index : props.setIndex,
    taskCardIndex : props.taskCardIndex, 
    subTaskCardIndex : props.subTaskCardIndex
   }));
   
 }

 useEffect(() =>{
    if(isSubTaskEditmode){
      subTasktitleRef.current.value = props.title,
   
      subTaskDetatailsRef.current.value = props.details
      setSubPeriod(subPeriod);
      subTasktitleRef.current.select();
      // subTaskDetatailsRef.current.select();

    }
 },[isSubTaskEditmode])

 const handleSubmit = (propsId , e) => {
  e.preventDefault();
  const taskContent = {
    id : propsId,
    title : subTasktitleRef.current.value,
    details : subTaskDetatailsRef.current.value,
    subPeriod : subPeriod,
    starred : false
  }

// console.log("taskContent :" , {
//       index : props.setIndex,
//       taskCardIndex : props.taskCardIndex,
//       subTaskCardIndex : props.subTaskCardIndex,
//     value : taskContent
//    });


console.log("taskContent",taskContent);

    dispatch(replaceEditedTasksInRespectiveSubTaskArray({
      index : props.setIndex,
      taskCardIndex : props.taskCardIndex,
      subTaskCardIndex : props.subTaskCardIndex,
      value : taskContent
     }))

//  setSubPeriod("");
 subTaskDetatailsRef.current.value= "";
 subTasktitleRef.current.value= "";
  setIsSubTaskEditMode(false);
 }

 const handleStarred =(id,e) => {
  e.stopPropagation();
   dispatch(addSubTaskInStarred({
    index : props.setIndex,
    taskCardIndex : props.taskCardIndex, 
    id : id
   }))
 }

 const handleUnstar =(id,e) =>{
  e.stopPropagation();
  dispatch(unStarTheSubTask({
    index : props.setIndex,
    taskCardIndex : props.taskCardIndex, 
    id : id
   }))
 }
 
//  const handleMoveToTop = (id,e) =>{
//   e.stopPropagation()
//     console.log("id:" , id);
//     dispatch(moveToTopInTask({
//       id : id,
//       index : props.setIndex,
//       subIndex : props.setSubIndex
//     }))
//     setShowMenu(false)
    
//  }

 const handleUnindent = (id,e) =>{
 e.stopPropagation()
 dispatch(unIndentSubTask({
  index : props.setIndex,
  taskCardIndex : props.taskCardIndex, 
  id : id
 }))

 console.log("unintend" , {
  index : props.setIndex,
  taskCardIndex : props.taskCardIndex, 
  id : id
 });
    setShowMenu(false)
 
 }

 const handleDeleteTask = (id,e) =>{
 e.stopPropagation()
    console.log("id:" , id);

     dispatch(deleteSubTask({
      id : id,
      index : props.setIndex,
      taskCardIndex : props.taskCardIndex, 
      subTaskCardIndex : props.subTaskCardIndex
     }))

    setShowMenu(false)
 }

 const handleSubTaskSubmit = () =>{

 }

  return (
    <>
    {
      isSubTaskEditmode ?  <form onSubmit={(e) => handleSubmit(props.id,e)}  className={styles.TaskinputCon}>
                       <div>
                        <FaRegCircle />
                       </div>
                       <div className={styles.realInputBox}>
                       <div>
                        <input ref={subTasktitleRef} className={styles.titleBox} type="text"  placeholder={"Title"}/>
                        <div className={styles.detailsCon}>
                        <CgDetailsMore  style={{fontSize:"1.2rem"}}/>
                        <textarea ref={subTaskDetatailsRef}  className={styles.textareaBox} name="" id="" placeholder="Details" />
                        </div>
                       </div>
                       <div className={styles.sessionsCon}>
                       {
                        subPeriod ? <div className={styles.periodContent}>
                          <p style={{color : subPeriod == "Today" ? "#3579D7" : "rgb(59, 59, 59)"}}>{subPeriod}</p>
                          <MdClear onClick={() => setSubPeriod("")} fontSize={"1.1rem"} color="rgb(30, 30, 130)"/>
                        </div> :  <div className={styles.sessions}>
                        <p onClick={() => setSubPeriod("Today")}>Today</p>
                        <p onClick={() => setSubPeriod("Tomorrow")}>Tomorrow</p>
                        <input onChange={(e) => setSubPeriod((new Date(e.target.value) + "").substring(0,10))}  type="date" className={styles.dateInput}/>
                      </div>
                       }
                        <MdOutlineRepeat style={{fontSize:"1.2rem"}} />
                       </div>
                       </div>
                         {
                            isSubTaskEditmode ? 
                                <MdCancel onClick={() => setIsSubTaskEditMode(false)} className={styles.cancelBtn} />: null
                         }
                       <button className={styles.submitBtn}>{isSubTaskEditmode ? "Edit" : " Submit"}</button>
                  </form> :
                   <div onClick={() => {
                    setIsSubTaskEditMode(true)
                    // console.log("setIndex :" , props.setIndex);
                    // console.log("setSubIndex :" , props.index);
                    
                    }} className={styles.tasksCardCon}>
      <div    >
        {
          showTick ? <IoCheckmarkSharp cursor={"pointer"} className={styles.tick} onClick={(e) => handleTickClick(props.id,e)} onMouseLeave={() => setShowTick(false)}  fontSize={"1.5rem"}  color={"#2684FC"}/> :  <FaRegCircle cursor={"pointer"}   onMouseEnter={() => setShowTick(true)} fontSize={"1rem"} />
        }
      </div>
      <div className={styles.contentCon}>
          <h4>{props.title}</h4>
          <p>{props.details}</p>
          <p style={{color :props.subPeriod == "Today" ? "#2684FC" : null , border: props.subPeriod == "Today" ? "1px solid #2684FC" : null , }} className={styles.periodText}>{props.subPeriod}</p>
      </div>
      <div className={styles.icons}>
      <BsThreeDotsVertical onClick={(e) => {
        e.stopPropagation();
        setShowMenu(true)}
        }  cursor={"pointer"} color={"rgb(82, 82, 82)"} fontSize={"1rem"}/>
     
      
      {
        props.starred ? <IoMdStar style={{visibility : props.starred ? "visible" : null }} onClick={(e) => handleUnstar(props.id, e)} cursor={"pointer"} fontSize={"1.1rem"} /> :  <IoIosStarOutline onClick={(e) => handleStarred(props.id , e)} cursor={"pointer"} color={"rgb(82, 82, 82)"} fontSize={"1.1rem"}/>
      }
      </div>
      {
        showMenu ? <div className={styles.menuCon}>
        {/* <div onClick={(e) => handleMoveToTop(props.id,e)}>
        <BiUpArrowAlt fontSize={"1.2rem"} color={"#353535"} />
         <p>Move to top</p>
        </div> */}
        <div onClick={(e) => handleUnindent(props.id,e)}>
        <MdOutlineSubdirectoryArrowRight style={{transform : "rotate(2700deg)"}}  fontSize={"1.2rem"} color={"#353535"}/>
         <p>Unindent</p>
        </div>
        <div onClick={(e) => handleDeleteTask(props.id,e)}>
        <RiDeleteBin6Line fontSize={"1.2rem"} color={"#353535"} />
         <p>Delete</p>
        </div>
     </div> : null
      }
  
   
  
  </div>
    }

      {/* {
        showSubTask ? 
        <SubTask setIndex={props.setIndex}  /> : null 
      } */}
    </>
  )
}

export default SubTaskCard