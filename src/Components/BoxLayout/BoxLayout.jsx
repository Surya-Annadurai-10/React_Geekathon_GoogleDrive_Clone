import React from 'react'
import { IoMdImage } from "react-icons/io";
import styles from "./BoxLayout.module.css"
import { BsThreeDotsVertical } from "react-icons/bs";
import { useSelector } from 'react-redux';

const BoxLayout = (props) => {
    // console.log(props);
    
const stateData = useSelector(state => state.user.userData)

const shortName = (name) =>{
    let str = ""
   if(name.length> 18){
      str = name.substring(0,29) + ".."
   }else{
    str = name
   }

   return str;
}

  return (
    
    <>
   <a className={styles.linkCon} href={props.imageURL} target='_blank'>
   <div className={styles.container}>
        <div className={styles.head}>
       <div className={styles.headInner}>
       <IoMdImage style={{color : "#EA4335", fontSize: "1.5rem"}} />
       <p>{shortName(props.name)}</p>
       </div>
       <BsThreeDotsVertical style={{fontSize: "1.5rem"}}  />
        </div>
        <div className={styles.imgCon}>
            <img src={props.imageURL} alt="" />
        </div>
        <div className={styles.bottom}>
           <div className={styles.profile_picture}>
              <img src={ stateData.photoURL ? stateData.photoURL : "https://tse4.mm.bing.net/th?id=OIP.SAcV4rjQCseubnk32USHigHaHx&pid=Api&P=0&h=180"} alt="" />
            </div>
            <p>You opened . {props.
lastModifiedDate.substring(4,16)}</p>
        </div>
    </div>
   </a>
    </>
  )
}

export default BoxLayout