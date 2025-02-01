import React from 'react'
import styles from './BinCard.module.css'
import { IoMdImage } from "react-icons/io";
import { useSelector } from 'react-redux';
import { RiHardDrive3Line } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";

const BinCard = (props) => {
//    console.log("props=>" , props.obj)
    const stateData = useSelector(state=> state.user.userData)
    // console.log(stateData);


    const convertDate =(num) =>{
        console.log("num =>" , num);
        
        let date = new Date(num)+""
        let today  = new Date() + ""
        console.log("date:",date);
        console.log("today:",today);
        let splicedDate = date.substring(4,10);
        let splicedToday = today.substring(4,10);

        if(splicedDate == splicedToday){
            return `You binned at ${ date.substring(16 , 21)}`;
        }else{
             return splicedDate;
         }
    
        
    }

    
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

    const handleClick = () =>{
      props.setShowOptions(true);
      
      props.setDownloadedContent(props.obj);
      // props.setDeleteDataId(props.id);
    }

  return (
    <>
    <tr onClick={handleClick}  className={styles.cardCon}>
        <td>
            <div className={styles.nameData}>
            <IoMdImage style={{color:"#EA4335",fontSize : "1.5rem"}} />
           <a href={props.imageURL} target='_blank'> <p>{props.name}</p></a>
            </div>
        </td>
        <td className={styles.ownerCon}>
             <div className={styles.profile_picture}>
                    <img src={ stateData.photoURL ? stateData.photoURL : "https://tse4.mm.bing.net/th?id=OIP.SAcV4rjQCseubnk32USHigHaHx&pid=Api&P=0&h=180"} alt="" />
                   </div>
            <p>me</p>
        </td>
        <td><p style={{fontSize : "0.9rem" , color : "grey"}}>{convertDate(props.dateBinned)}</p></td>
        <td><p style={{fontSize : "1.1rem"}}>{convertBytes(props.size)}</p></td>
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

export default BinCard