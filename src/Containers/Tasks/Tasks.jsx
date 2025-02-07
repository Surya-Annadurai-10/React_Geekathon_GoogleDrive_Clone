import React, { useRef, useState } from "react";
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
import { addTasks } from "../../slices/userSlice";
import { v4 } from "uuid";
import TasksCard from "../../Components/TasksCard/TasksCard";

const Tasks = () => {
  const [headTask, setHeadTask] = useState("My Tasks");
  const [showOptions, setShowOptions] = useState(false);
  const [showInputBoxes , setShowInputBoxes] = useState(true)
  const titleRef = useRef(null);
  const detatailsRef = useRef(null);
  const dateRef = useRef(null)
  const [period , setPeriod] = useState("");
  const stateTasks = useSelector(state => state.user.tasksObj.tasks)

  const dispatch = useDispatch();
  

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
      starred : false
    }
   dispatch(addTasks(taskContent))
    setPeriod("");
    detatailsRef.current.value= "";
    titleRef.current.value= "";
    
  }



  return (
    <>
      <div>
        <header className={styles.tasksCon}>
          <h3>Tasks</h3>
          <div
            onClick={() => setShowOptions(true)}
            className={styles.tasksMenu}
          >
            <h2>{headTask}</h2>
            <FaCaretDown color="#fff" />
          </div>
          {showOptions ? (
            <div
              onMouseLeave={() => setShowOptions(false)}
              className={styles.optionCon}
            >
              <div>
                <IoIosStarOutline
                  style={{ fontSize: " 1.5rem", color: "#333437" }}
                />
                <p>Starred</p>
              </div>

              <div>
                <div>
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
                </div>
              </div>

              <div>
                <TbPlaylistAdd
                  style={{ fontSize: " 1.5rem", color: "#333437" }}
                />
                <p>Create new list</p>
              </div>
            </div>
          ) : null}
        </header>

        <main>
          <div className={styles.addTasksCon}>
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
                return <TasksCard key={ele.id} {...ele} />
               })
            }
          </div>
        </section>
      </div>
    </>
  );
};

export default Tasks;
