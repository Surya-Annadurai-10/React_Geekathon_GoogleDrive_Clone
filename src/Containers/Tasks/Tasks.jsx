import React, { useEffect, useRef, useState } from "react";
import styles from "./Tasks.module.css";
import { FaCaretDown } from "react-icons/fa";
import { IoIosStarOutline } from "react-icons/io";
import { TbPlaylistAdd } from "react-icons/tb";
import { IoCheckmarkOutline } from "react-icons/io5";
import { MdAddTask } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import { CgDetailsMore } from "react-icons/cg";
// import { steps } from "framer-motion";
import { MdOutlineRepeat } from "react-icons/md";
import { FaRegCircle } from "react-icons/fa";
import { MdClear } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { addTasks, setTaskCategoryObjInTaskSection } from "../../slices/userSlice";
import { v4 } from "uuid";
import { FaAngleDown } from "react-icons/fa6";
import TasksCard from "../../Components/TasksCard/TasksCard";
import TaskCompletedCard from "../../Components/TaskCompletedCard/TaskCompletedCard";

const Tasks = () => {
  const [setIndex , setSetIndex] = useState(0)
  const [headTask, setHeadTask] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const [showInputBoxes , setShowInputBoxes] = useState(false)
  const titleRef = useRef(null);
  const detatailsRef = useRef(null);
  const dateRef = useRef(null)
  const [period , setPeriod] = useState("");
  const stateTasks = useSelector(state => state.user.taskSection[setIndex].tasks)
  const stateCompleted = useSelector(state => state.user.taskSection[setIndex].completed)
  const [showCompletedList , setShowCompletedList] = useState(false);
  const dispatch = useDispatch();
  const [showCreateCon , setShowCreateCon] = useState(false);
  const createInputRef = useRef(null);
  const stateTaskSection = useSelector(state => state.user.taskSection)

  const handleSubmit = (e) =>{
e.preventDefault()
console.log("------------------------");

    console.log(titleRef.current.value);
    console.log(detatailsRef.current.value);
    // console.log(new Date(dateRef.current.value));
    console.log(period.substring(0,10));
    // console.log(dateRef.current.value);
    const taskContent = {
      id : v4(),
      title : titleRef.current.value,
      details : detatailsRef.current.value,
      period : period,
      starred : false,
      subtasks : []
    }
   dispatch(addTasks({
    index : setIndex,
    value : taskContent
   }))
    setPeriod("");
    detatailsRef.current.value= "";
    titleRef.current.value= "";
    setShowInputBoxes(false);
  }

  // useEffect(() =>{
  //  setHeadTask("My Tasks")
  //  console.log("Inside the setHeadTask useEFFECT");
  //  setSetIndex(0);
  // },[])



  useEffect(() => {
   if(headTask != "" ){
    const insertObj = {
      id : v4(),
      category : headTask,
      tasks : [],
      completed : [],
      starred : [],
      subtasks : []
      
    }

    console.log("Inside the useEFFECT");
    dispatch(setTaskCategoryObjInTaskSection(insertObj))
    
    setShowCreateCon(false);
   }
  },[headTask])

  const handleCreateDone =() =>{
    setHeadTask(createInputRef.current.value);
   
     
  }

  const handleCategoryClick = (id) =>{
      const findIndex = stateTaskSection.findIndex(ele => ele.id == id);
      console.log("findIndex :" , findIndex);
      setSetIndex(findIndex);
  }



  return (
    <>
      <div style={{position: "relative"}}>
        <header className={styles.tasksCon}>
          <h3>Tasks</h3>
          <div
            onClick={() => setShowOptions(true)}
            className={styles.tasksMenu}
          >
            <h2 style={{textTransform : "capitalize"}}>{setIndex ? stateTaskSection[setIndex].category : "My Tasks"}</h2>
            <FaCaretDown color="#fff" />
          </div>
          {showOptions ? (
            <div
             style={{cursor : "pointer"}}
              onMouseLeave={() => setShowOptions(false)}
              className={styles.optionCon}
            >
              <div onClick={() => setShowOptions(false)}>
                <IoIosStarOutline
                  style={{ fontSize: " 1.5rem", color: "#333437" }}
                />
                <p>Starred</p>
              </div>

              <div>

                {
                  stateTaskSection.map(ele => {
                    return  <div key={ele.id} onClick={() =>{
                      setShowOptions(false)
                       handleCategoryClick(ele.id)}}>
                    <IoCheckmarkOutline
                      style={{ fontSize: " 1.5rem", color: "#333437" }}
                    />
                    <p style={{textTransform:"capitalize"}}>{ele.category}</p>
                  </div>
                  })
                }
                {/* <div>
                  <IoCheckmarkOutline
                    style={{ fontSize: " 1.5rem", color: "#333437" }}
                  />
                  <p>My Tasks</p>
                </div>
                <div>
                  <IoCheckmarkOutline
                    style={{ fontSize: " 1.5rem", color: "#333437" }}
                  />
                  <p>Gym Tasks</p>
                </div> */}
              </div>

              <div  onClick={() =>{
                setShowOptions(false)
                 setShowCreateCon(true)}}>
                <TbPlaylistAdd
                  style={{ fontSize: " 1.5rem", color: "#333437" }}
                />
                <p>Create new list</p>
              </div>

              
            </div>
          ) : null}
        </header>

        <main>
          <div style={{cursor:"pointer"}} onClick={() => setShowInputBoxes(true)} className={styles.addTasksCon}>
            <div>
            <MdAddTask style={{fontSize:"1.2rem"}} />
            <p>Add Tasks</p>
            </div>
            <BsThreeDotsVertical className={styles.threedots} />
          </div>

          {
            showInputBoxes ? <form onSubmit={handleSubmit}  className={styles.TaskinputCon}>
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
                 <button className={styles.submitBtn}>Submit</button>
            </form>: null
          }
        </main>

        <section>
          <div>
            {
               stateTasks.map(ele =>{
                return <TasksCard setIndex={setIndex} key={ele.id} {...ele} />
               })
            }
          </div>
        </section>
      </div>
      <div className={styles.completedCon}>
        <div style={{cursor:"pointer"}} className={styles.completedHeader} onClick={() => setShowCompletedList(!showCompletedList)}>
   
           <FaAngleDown style={{transition : "0.3s ease",rotate : showCompletedList ? "-90deg" : "0deg"}} />

          <span>{stateCompleted.length}</span> 
          <h3>Completed</h3>
        </div>
        {
          showCompletedList ? <div >
          {
            stateCompleted.map(ele =>{
              return <TaskCompletedCard setIndex={setIndex} key={ele.id} {...ele} />
            })
          }
        </div> : null
        }
      </div>
      {
        showCreateCon ? <div className={styles.createListBox}>
        <div className={styles.createListCon}>
          <h3>Create new list</h3>
          <input ref={createInputRef} type="text" placeholder="Enter name" />
          <div className={styles.buttonCon}>
          <button onClick={() => setShowCreateCon(false)} className={styles.cancelButton}>Cancel</button>
          <button onClick={handleCreateDone}  className={styles.DoneButton}>Done</button>
          </div>
        </div>
      </div> : null
      }
    </>
  );
};

export default Tasks;
