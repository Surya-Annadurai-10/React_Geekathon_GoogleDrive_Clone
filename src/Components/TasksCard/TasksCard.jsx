import React from 'react'
import { FaRegCircle } from "react-icons/fa";
import styles from "./TasksCard.module.css"
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoIosStarOutline } from "react-icons/io";

const TasksCard = (props) => {
  return (
    <>
    <div className={styles.tasksCardCon}>
        <div>
           <FaRegCircle fontSize={"1.4rem"} />
        </div>
        <div>
            <h4>{props.title}</h4>
            <p>{props.details}</p>
            <p>{props.period}</p>
        </div>
        <div className={styles.icons}>
        <BsThreeDotsVertical color={"rgb(82, 82, 82)"} fontSize={"1.3rem"}/>
        <IoIosStarOutline color={"rgb(82, 82, 82)"} fontSize={"1.3rem"}/>
        </div>
    </div>
    </>
  )
}

export default TasksCard