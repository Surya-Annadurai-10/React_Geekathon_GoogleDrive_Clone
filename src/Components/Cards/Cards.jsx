import React from 'react'
import styles from './Cards.module.css'
import { IoMdImage } from "react-icons/io";
import { useSelector } from 'react-redux';
import { RiHardDrive3Line } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";

const Cards = (props) => {
   console.log(props)
    const stateData = useSelector(state=> state.user.userData)
    // console.log(stateData);
    

  return (
    <>
    <tr onClick={() => props.setShowOptions(true)}  className={styles.cardCon}>
        <td>
            <div className={styles.nameData}>
            <IoMdImage style={{color:"#EA4335",fontSize : "1.5rem"}} />
           <a href={props.imageURL} target='_blank'> <p>{props.name}</p></a>
            </div>
        </td>
        <td className={styles.reasoned}>You opened at 22:58</td>
        <td className={styles.ownerCon}>
             <div className={styles.profile_picture}>
                    <img src={ stateData.photoURL ? stateData.photoURL : "https://tse4.mm.bing.net/th?id=OIP.SAcV4rjQCseubnk32USHigHaHx&pid=Api&P=0&h=180"} alt="" />
                   </div>
            <p>me</p>
        </td>
        <td >
       <div className={styles.locationOuter}>
       <div  className={styles.location}>
       <RiHardDrive3Line style={{fontSize:"1.3rem"}} />
       <p>MyDrive</p>
       </div>
       <BsThreeDotsVertical  style={{fontSize:"1.3rem"}} />
       </div>
        </td>
    </tr>
    </>
  )
}

export default Cards