import React from 'react'
import styles from './Cards.module.css'
import { IoMdImage } from "react-icons/io";
import { useSelector } from 'react-redux';

const Cards = (props) => {
   
    const stateData = useSelector(state=> state.user.userData)
    // console.log(stateData);
    

  return (
    <>
    <tr className={styles.cardCon}>
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
        <td>Mydrive</td>
    </tr>
    </>
  )
}

export default Cards