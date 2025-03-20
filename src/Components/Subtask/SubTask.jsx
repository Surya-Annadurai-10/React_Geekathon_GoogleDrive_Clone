
import React, { useEffect, useRef, useState } from 'react'
import { FaRegCircle } from "react-icons/fa";
import styles from "./SubTask.module.css"
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoIosStarOutline } from "react-icons/io";
import { IoCheckmarkSharp } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { addEditedTasksInTasksArray, addInStarred, addSubTasks, deleteFromTasks, markAsCompleted, moveToTopInTask, unStarTheTask } from '../../slices/userSlice';
import { CgDetailsMore } from "react-icons/cg";
import { MdOutlineRepeat } from "react-icons/md";
// import { FaRegCircle } from "react-icons/fa";
import { MdClear } from "react-icons/md";
import { IoMdStar } from "react-icons/io";
import { BiUpArrowAlt } from "react-icons/bi";
import { MdOutlineSubdirectoryArrowRight } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import TasksCard from '../TasksCard/TasksCard';
import SubTaskCard from '../SubTaskCard/SubTaskCard';
import { v4 } from 'uuid';



const SubTask = (props) => {

    const[isSubTaskEditmode , setIsSubTaskEditMode] = useState(false);
    const subTitleRef = useRef(null);
    const subDetatailsRef = useRef(null);
    const subDateRef = useRef(null)
    const [subPeriod , setSubPeriod] = useState("");
    const dispatch = useDispatch();
    const stateSubTask = useSelector(state => state.user.taskSection[props.setIndex].tasks[props.i].subtasks)
    const stateTasks = useSelector(state => state.user.taskSection[props.setIndex].tasks)
 
//  useEffect(() =>{
//     if(props.showSubTask){
//         setShowInputBoxes(true);
//     }
//  },[props.showSubTask])
 
    const handleSubmit =(e, id) =>{

    e.preventDefault();
    const insertObj ={
        id : v4(),
        title : subTitleRef.current.value,
        details :  subDetatailsRef.current.value,
        subPeriod : subPeriod,
        starred : false
      }
     dispatch(addSubTasks({
        index : props.setIndex , 
        subIndex : props.setSubIndex,
        value : insertObj
     }));

    props.setShowInputBoxes(false)
    // props.setShowSubTask(false);
   setSubPeriod("");
    console.log("InsertObj :" , {
        index : props.setIndex , 
        subIndex : props.setSubIndex,
        value : insertObj
     });

    

  }

  useEffect(() =>{
     if(props.showInputBoxes){
      subTitleRef.current.focus();
     }
  },[ props.showInputBoxes])
 
 
 
 
 
 
    return (
  <>
  
          <div className={styles.subTaskCon}>
        {
        props.showInputBoxes ?  <form onSubmit={(e) => handleSubmit(e, props.id)}  className={styles.TaskinputCon}>
                         <div>
                          <FaRegCircle />
                         </div>
                         <div className={styles.realInputBox}>
                         <div>
                          <input ref={subTitleRef} className={styles.titleBox} type="text"  placeholder={"Title"}/>
                          <div className={styles.detailsCon}>
                          <CgDetailsMore  style={{fontSize:"1.1rem"}}/>
                          <textarea ref={subDetatailsRef}  className={styles.textareaBox} name="" id="" placeholder="Details" />
                          </div>
                         </div>
                         <div className={styles.sessionsCon}>
                         {
                          subPeriod ? <div className={styles.periodContent}>
                            <p style={{color : subPeriod == "Today" ? "#3579D7" : "rgb(59, 59, 59)"}}>{subPeriod}</p>
                            <MdClear onClick={() => setSubPeriod("")} fontSize={"0.9rem"} color="rgb(30, 30, 130)"/>
                          </div> :  <div className={styles.sessions}>
                          <p onClick={() => setSubPeriod("Today")}>Today</p>
                          <p onClick={() => setSubPeriod("Tomorrow")}>Tomorrow</p>
                          <input onChange={(e) => setSubPeriod((new Date(e.target.value) + "").substring(0,10))}  type="date" className={styles.dateInput}/>
                        </div>
                         }
                          <MdOutlineRepeat style={{fontSize:"1.2rem"}} />
                         </div>
                         </div>
                         <button className={styles.submitBtn}>{isSubTaskEditmode ? "Edit" : " Submit"}</button>
                    </form> : null
      }
        <section>
          <div>
            {
               stateSubTask.map((ele, index) =>{
                return <SubTaskCard setIndex={props.setIndex} taskCardIndex={props.i} subTaskCardIndex = {index} setSubIndex={props.setSubIndex} key={ele.id} {...ele} />
               })
            }
          </div>
        </section>
       
    </div>
       
 
  </>
  )
}

export default SubTask