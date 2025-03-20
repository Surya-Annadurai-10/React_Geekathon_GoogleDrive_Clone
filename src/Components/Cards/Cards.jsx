import React from 'react'
import styles from './Cards.module.css'
import { IoMdImage } from "react-icons/io";
import { useSelector } from 'react-redux';
import { RiHardDrive3Line } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoMdVideocam } from "react-icons/io";
import { FaFileAudio, FaLinesLeaning } from "react-icons/fa6";
import { IoArchiveSharp } from "react-icons/io5";
import { RiShieldFlashFill } from "react-icons/ri";
import { BiSolidFilePdf } from "react-icons/bi";


const Cards = (props) => {
  //  console.log("props=>" , props.obj)
    const stateData = useSelector(state=> state.user.userData)
    // console.log(stateData);


    const handleClick = (e) =>{
      e.stopPropagation()
      props.setShowOptions(true);
      
      props.setDownloadedContent(props.obj);
      // props.setDeleteDataId(props.id);
    }

    const findIcons = () =>{
      // console.log("props.type =>" , props.type);
    
    let imageStr = props.type.includes("image")
    let videoStr = props.type.includes("video")
    let pdfStr = props.type.includes("pdf")
    let archivesStr = props.type.includes("archives")
    let AuidoStr = props.type.includes("audio")
    let drawingsStr = props.type.includes("drawing")
    
    if(imageStr){
      // console.log(true);
      return  <IoMdImage style={{color : "#EA4335", fontSize: "1.5rem"}} />
      
    }
    
    if(videoStr){
      // console.log(false);
      return <IoMdVideocam  style={{color : "#EA4335", fontSize: "1.5rem"}}/>
    }

    if(pdfStr){
      console.log(false);
      return    <BiSolidFilePdf style={{color : "#EA4335", fontSize: "1.5rem"}} />
    }

    if(archivesStr){
      console.log(false);
      return    <IoArchiveSharp  style={{color : "#EA4335", fontSize: "1.5rem"}}/>
    }

    if(AuidoStr){
      console.log(false);
      return    <FaFileAudio style={{color : "#EA4335", fontSize: "1.5rem"}} />
    }

    if(drawingsStr){
      console.log(false);
      return   <RiShieldFlashFill style={{color : "#EA4335", fontSize: "1.5rem"}} />
    }
      
    }

  return (
    <>
    <tr onClick={(e) => handleClick(e)}  className={styles.cardCon}>
        <td>
            <div className={styles.nameData}>
            {
              findIcons() 
            }
           <a onClick={(e) => e.stopPropagation()} href={props.imageURL} download={props.imageURL} target='_blank'> <p>{props.name}</p></a>
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