import React, { useEffect, useState } from 'react'
import styles from './MyDriveCard.module.css'
import { IoMdImage } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { RiHardDrive3Line } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import { RiUserSharedLine  } from "react-icons/ri";
import { LuDownload } from "react-icons/lu";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoMdLink } from "react-icons/io";
import { IoIosStarOutline } from "react-icons/io";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { IoMdStar } from "react-icons/io";
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { firestore } from '../../firebase';
import { starredData, updateIsFavInFiles } from '../../slices/userSlice';


const MyDriveCard = (props) => {

   console.log("props=>" ,props.obj)
   
//    let finalObj = {
//     ...props.obj,
//     isFav : true
//   }

//   console.log("finalObj:" , finalObj);
  
    const stateData = useSelector(state=> state.user.userData)
    const stateFiles = useSelector(state=> state.user.files)
    const dispatch = useDispatch();
    // const starred = useSelector(state=> state.user.userData)
    // console.log(stateData);
const [isStarred , setStarred] = useState(props.isFav);
const [isStarred2 , setStarred2] = useState(false);
let allowUse = false;



    // const convertDate =(num) =>{
    //     console.log("num =>" , num);
        
    //     let date = new Date(num)+""
    //     let today  = new Date() + ""
    //     console.log("date:",date);
    //     console.log("today:",today);
    //     let splicedDate = date.substring(4,10);
    //     let splicedToday = today.substring(4,10);

    //     if(splicedDate == splicedToday){
    //         return `You binned at ${ date.substring(16 , 21)}`;
    //     }else{
    //          return splicedDate;
    //      }
    
        
    // }

    
      const convertBytes = (sizeBytes) => {
        if (sizeBytes === 0) {
            return "0B";
        }
        
        const sizeUnits = ["B", "KB", "MB", "GB", "TB", "PB"];
        let index = 0;
        
        while (sizeBytes >= 1024 && index < sizeUnits.length - 1) {
            sizeBytes /= 1024.0;
            index++;
        }
        
        return `${sizeBytes.toFixed(2)} ${sizeUnits[index]}`;
    }

    const handleStarred = (id,e) =>{
        e.stopPropagation();
        setStarred(!isStarred);
       setStarred2(true);

    }

 

    useEffect(() =>{
       if(isStarred2){
        try {
            name()
            async function name(params) {
              if(isStarred){
                  const starredDataRef = collection(firestore , "starred");
                  const starredDocRef = doc(firestore , "files" , props.id);
                 let propObj ={
                    ...props.obj,
                    isFav : true
                  }
                 
                 
                  await updateDoc(starredDocRef ,propObj )
    
                  alert("Updated in files database Successfully")
                  await addDoc(starredDataRef , propObj);
                  alert("File Added in Recent database Successfully")
                  dispatch(starredData(propObj));
                  let findIndex = stateFiles.findIndex(ele => ele.id == props.id);
                  let findValue = stateFiles.find(ele => ele.id == props.id);

                  let finalObj = {
                    ...findValue,
                    isFav : true
                  }

                  console.log("finalObj:" , finalObj);
                  

                  dispatch(updateIsFavInFiles({
                   index : findIndex,
                   object : finalObj
                  }))
                  alert("File Added in Recent store Successfully")
                //   console.log("Inside name async func",propObj);
      
              }
    
    
              if(!isStarred){
                const starredDataRef = collection(firestore , "recent");
                const starredDocRef = doc(firestore , "files" , props.id);
                await updateDoc(starredDocRef , {
                  ...props.obj,
                  isFav : false
                })
    
                alert("Updated in files database Successfully")
                await addDoc(starredDataRef , props.obj);
                alert("File Added in Recent database Successfully")
                dispatch(starredData(props.obj));
                let findIndex = stateFiles.findIndex(ele => ele.id == props.id);
                let findValue = stateFiles.find(ele => ele.id == props.id);

                let finalObj = {
                    ...findValue,
                    isFav : false
                  }

                console.log("finalObj:" , finalObj);
                

                dispatch(updateIsFavInFiles({
                 index : findIndex,
                 object : finalObj
                }))
                alert("File Added in Recent store Successfully")
                // console.log("Inside name async func",propObj);
                alert("File Added in Recent store Successfully")
                // console.log("Inside name async func", props.obj);
    
            }
            }
           } catch (error) {
           alert("Error in updating" , error);
           }
       }
    },[isStarred])

    const handleClick = () =>{
      props.setShowOptions(true);    
      props.setDownloadedContent(props.obj);
    }

  return (
    <>
    <tr onClick={handleClick}  className={styles.cardCon}>
        <td>
            <div className={styles.nameData}>
            <IoMdImage style={{color:"#EA4335",fontSize : "1.5rem"}} />
           <a href={props.imageURL} target='_blank'> <p>{props.name}</p></a>
           {
           props.isFav ? <IoMdStar  style={{ fill:"#000",fontSize: "1rem" ,color:"1f1f1f"}} /> : null
           }
            </div>
        </td>
        <td className={styles.ownerCon}>
             <div className={styles.profile_picture}>
                    <img src={ stateData.photoURL ? stateData.photoURL : "https://tse4.mm.bing.net/th?id=OIP.SAcV4rjQCseubnk32USHigHaHx&pid=Api&P=0&h=180"} alt="" />
                   </div>
            <p>me</p>
        </td>
        <td><p style={{fontSize : "0.9rem" , color : "grey"}}>{props.lastModifiedDate.substring(4,15)} me</p></td>
        <td>
           <div className={styles.fileSize}>
           
           <p style={{fontSize : "1.1rem"}}>{convertBytes(props.size)}</p>
           <div className={styles.optionsCon}>
                            {/* <RxCross2 onClick={() =>setShowOptions(false)}  style={{ fontSize: "1rem" ,color:"1f1f1f"}} /> */}
                           
                            <RiUserSharedLine   style={{ fontSize: "1rem" ,color:"1f1f1f"}}/>
                          <a href={"https://tse1.mm.bing.net/th?id=OIP.4XB8NF1awQyApnQDDmBmQwHaEo&pid=Api&P=0&h=180"} download>  <LuDownload   style={{ fontSize: "1rem" ,color:"1f1f1f"}}/></a>
                            <MdOutlineDriveFileRenameOutline  onClick={() => handleDelete(downloadedContent.id)}  style={{ fontSize: "1rem" ,color:"1f1f1f"}}/>
                            {
                                props.isFav ? <IoMdStar onClick={(e) => handleStarred (props.id,e)}  style={{ fontSize: "1rem" ,color:"1f1f1f"}} /> :
                                <IoIosStarOutline onClick={(e) => handleStarred (props.id,e)}  style={{ fontSize: "1rem" ,color:"1f1f1f"}} />
                            }
                           
            </div>
           <BsThreeDotsVertical  style={{fontSize:"1rem"}} />
           </div>
        </td>
        <td >
       <div className={styles.locationOuter}>
      
      
       </div>
        </td>
    </tr>
    </>
  )
}

export default MyDriveCard