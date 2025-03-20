import React, { useEffect, useRef, useState } from 'react'
import { FaRegCircle } from "react-icons/fa";
import styles from "./TasksCard.module.css"
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
import SubTask from '../Subtask/SubTask';
import { MdCancel } from "react-icons/md";


const TasksCard = (props) => {
 const [showTick , setShowTick] = useState(false);
  const dispatch= useDispatch();
  const [isEditmode , setIsEditMode] = useState(false); 
  const titleRef = useRef(null);
  const detatailsRef = useRef(null);
  const dateRef = useRef(null)
  const [period , setPeriod] = useState("");
  const [showMenu , setShowMenu] = useState(false);
  //  const [showSubTask , setShowSubTask] = useState(false);
  const stateSubTask = useSelector(state => state.user.taskSection[props.setIndex].tasks[props.i].subtasks)
  const stateTasks = useSelector(state => state.user.taskSection[props.setIndex].tasks);
  const [setSubIndex , setSetSubIndex] = useState(0);
  const [showInputBoxes , setShowInputBoxes] = useState(false)
  
   
// console.log("stateSubTask : " , stateSubTask.length);
 


 const handleTickClick = (id,e) =>{
  e.stopPropagation()
   console.log("id:",id);
   dispatch(markAsCompleted({
    index : props.setIndex,
    id : id
   }));
   
 }


//  useEffect(() =>{
  
//    console.log("findIndex :" , findIndex);
   
//  },[])

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
    starred : false,
    subtasks : [...stateSubTask]
  }
 dispatch(addEditedTasksInTasksArray({
  index : props.setIndex,
  value : taskContent
 }))
  setPeriod("");
  detatailsRef.current.value= "";
  titleRef.current.value= "";
  setIsEditMode(false);
 }

 const handleStarred =(id,e) => {
  e.stopPropagation();
   dispatch(addInStarred({
    index : props.setIndex,
    id : id
   }))
 }

 const handleUnstar =(id,e) =>{
  e.stopPropagation();
  dispatch(unStarTheTask({
    index : props.setIndex,
    id : id
   }))
 }
 
 const handleMoveToTop = (id,e) =>{
  e.stopPropagation()
    console.log("id:" , id);
    dispatch(moveToTopInTask({
      id : id,
      index : props.setIndex
    }))
    setShowMenu(false)
    
 }

 const handleAddSubTask = (id,e) =>{
 e.stopPropagation()
    console.log("id:" , id);
    // const insertSubObj =  {
    //   id : v4(),
    //   subtasks : [],
    //   subcompleted : [],
    //   substarred : [],
     
    // }

    // dispatch(addSubTasks({
    //   index : props.setIndex,
    //   value : insertSubObj
    // }))
    setShowInputBoxes(true);  
    props.setShowSubTask(true);
    setShowMenu(false);
    setPeriod("")
 }

 useEffect(() =>{
    if(stateSubTask.length != 0){
      props.setShowSubTask(true);
    }
 } , [stateSubTask.length != 0])
 

 const handleDeleteTask = (id,e) =>{
 e.stopPropagation()
    console.log("id:" , id);

     dispatch(deleteFromTasks({
      id : id,
      index : props.setIndex
     }))

    setShowMenu(false)
 }

 

 const handleSubTaskSubmit = () =>{

 }

 const handleThreeDots = (e,id) =>{
  e.stopPropagation();
  const findIndex = stateTasks.findIndex(ele => ele.id == id);
  console.log("findIndex :", findIndex);
  
  setSetSubIndex(findIndex)
  setShowMenu(true);
 }

 const setShowSubTaskFn =(setShowSubTask) =>{
  setShowSubTask(false);
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
                       {
                         isEditmode ? 
                         <MdCancel onClick={() => setIsEditMode(false)} className={styles.cancelBtn} />: null
                       }
                       <button className={styles.submitBtn}>{isEditmode ? "Edit" : " Submit"}</button>
                  </form> :
                   <div onClick={() =>{ 
                    setIsEditMode(true)
                  
                    }} className={styles.tasksCardCon}>
      <div    >
        {
          showTick ? <IoCheckmarkSharp cursor={"pointer"} className={styles.tick} onClick={(e) => handleTickClick(props.id,e)} onMouseLeave={() => setShowTick(false)}  fontSize={"2rem"}  color={"#2684FC"}/> :  <FaRegCircle cursor={"pointer"}   onMouseEnter={() => setShowTick(true)} fontSize={"1.4rem"} />
        }
      </div>
      <div>
          <h4>{props.title}</h4>
          <p>{props.details}</p>
          <p style={{color : props.period == "Today" ? "#2684FC" : null , border:props.period == "Today" ? "1px solid #2684FC" : null , }} className={styles.periodText}>{props.period}</p>
      </div>
      <div className={styles.icons}>
      <BsThreeDotsVertical onClick={(e) => handleThreeDots(e , props.id) }  cursor={"pointer"} color={"rgb(82, 82, 82)"} fontSize={"1.3rem"}/>
     
      
      {
        props.starred ? <IoMdStar style={{visibility : props.starred ? "visible" : null }} onClick={(e) => handleUnstar(props.id, e)} cursor={"pointer"} fontSize={"1.3rem"} /> :  <IoIosStarOutline onClick={(e) => handleStarred(props.id , e)} cursor={"pointer"} color={"rgb(82, 82, 82)"} fontSize={"1.3rem"}/>
      }
      </div>
      {
        showMenu ? <div onMouseLeave={() => setShowMenu(false)} className={styles.menuCon}>
        <div onClick={(e) => handleMoveToTop(props.id,e)}>
        <BiUpArrowAlt fontSize={"1.4rem"} color={"#353535"} />
         <p>Move to top</p>
        </div>
        <div onClick={(e) => handleAddSubTask(props.id,e)}>
        <MdOutlineSubdirectoryArrowRight  fontSize={"1.4rem"} color={"#353535"}/>
         <p>Add a subtask</p>
        </div>
        <div onClick={(e) => handleDeleteTask(props.id,e)}>
        <RiDeleteBin6Line fontSize={"1.4rem"} color={"#353535"} />
         <p>Delete</p>
        </div>
     </div> : null
      }
  
   
  
  </div>
    }
{
 props.showSubTask ? 
  <SubTask i={props.i} setShowInputBoxes={setShowInputBoxes} showInputBoxes ={showInputBoxes} showSubTask={props.showSubTask} setShowSubTask={props.setShowSubTask} setSubIndex={setSubIndex} setPeriod ={setPeriod}  setIndex ={props.setIndex}  /> 
 : null
}
 
    </>
  )
}

export default TasksCard