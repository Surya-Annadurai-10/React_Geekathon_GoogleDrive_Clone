import React from 'react'
import { IoMdImage } from "react-icons/io";
import styles from "./BoxLayout.module.css"
import { BsThreeDotsVertical } from "react-icons/bs";
import { useSelector } from 'react-redux';
import { IoMdVideocam } from "react-icons/io";
import { BiSolidFilePdf } from 'react-icons/bi';
import { IoArchiveSharp } from 'react-icons/io5';
import { FaFileAudio } from 'react-icons/fa';
import { RiShieldFlashFill } from 'react-icons/ri';

const BoxLayout = (props) => {
    // console.log(props.setShowOptions);
    
const stateData = useSelector(state => state.user.userData)
// const stateBin = useSelector (state => state.bin)

const shortName = (name) =>{
    let str = ""
   if(name.length> 18){
      str = name.substring(0,29) + ".."
   }else{
    str = name
   }

   return str;
}

const handleDoubleClick = () =>{
  window.open( props.imageURL , "_blank" )
  
}

const handleShowOptions = (e) =>{
  e.preventDefault();
  props.setShowOptions(true);
  props.setDownloadedContent(props.obj)


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
       return <IoMdVideocm  style={{color : "#EA4335", fontSize: "1.5rem"}}/>
     }
 
     if(pdfStr){
       console.log(false);
       return    <BiSolidFilePdf style={{color : "#EA4335", fontSize: "1.5rem"}} />
     }
 
     if(archivesStr){
       console.log(false);
       return    <IoArchiveSharp style={{color : "#EA4335", fontSize: "1.5rem"}}/>
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

const findImg = () =>{
  // console.log("props.type =>" , props.type);

  let imageStr = props.type.includes("image")
     let videoStr = props.type.includes("video")
     let pdfStr = props.type.includes("pdf")
     let archivesStr = props.type.includes("archives")
     let AuidoStr = props.type.includes("audio")
     let drawingsStr = props.type.includes("drawing")

if(imageStr){
  // console.log(true);
  return  props.imageURL
  
}

if(videoStr){
  // console.log(false);
  return "https://purepng.com/public/uploads/large/purepng.com-video-icon-galaxy-s6symbolsiconssamsungapp-iconsgalaxy-s6-icons-721522597480axbjz.png"
}

if(pdfStr){
    return "https://www.freepngimg.com/thumb/google/66255-google-icons-docs-drive-computer-suite.png"
}
if(archivesStr){
  return "https://tse2.mm.bing.net/th?id=OIP.XH4pPEcFdklVP7_hOsjG2AHaHa&pid=Api&P=0&h=180"
}
if(AuidoStr){
  return "https://tse1.mm.bing.net/th?id=OIP.YffY3lG8146Qe1a6FmorlQHaHa&pid=Api&P=0&h=180"
}
if(drawingsStr){
  return "https://icon-library.com/images/drawing-icon/drawing-icon-17.jpg"
}
  
}

  return (
    
    <>
   <a  className={styles.linkCon} onClick={handleShowOptions} onDoubleClick={handleDoubleClick} href={props.imageURL} target='_blank'>
   <div className={styles.container}>
        <div className={styles.head}>
       <div className={styles.headInner}>
      {
         findIcons()
      }
       <p>{shortName(props.name)}</p>
       </div>
       <BsThreeDotsVertical style={{fontSize: "1.5rem"}}  />
        </div>
        <div className={styles.imgCon}>
            <img className={styles.imageFind} src={findImg()} alt="" />
        </div>
        <div className={styles.bottom}>
           <div className={styles.profile_picture}>
              <img src={stateData.photoURL ? stateData.photoURL : "https://tse4.mm.bing.net/th?id=OIP.SAcV4rjQCseubnk32USHigHaHx&pid=Api&P=0&h=180"} alt="" />
            </div>
            <p>You opened . {props.lastModifiedDate.substring(4,16)}</p>
        </div>
    </div>
   </a>
    </>
  )
}

export default BoxLayout