import React, { useEffect, useRef, useState } from "react";
import styles from "./MyDriveCard.module.css";
import { IoMdImage, IoMdVideocam } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { RiHardDrive3Line, RiShieldFlashFill } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import { RiUserSharedLine } from "react-icons/ri";
import { LuDownload } from "react-icons/lu";

import { IoIosStarOutline } from "react-icons/io";
import { MdCancel, MdOutlineDone, MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { IoMdStar } from "react-icons/io";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { firestore } from "../../firebase";
import {
  renameInFiles,
  renameInStarred,
  
  spreadDataStarred,
  starredData,
  unstarData,
  updateIsFavInFiles,
} from "../../slices/userSlice";
import { v4 } from "uuid";
import { FaFileAudio } from "react-icons/fa";
import { IoArchiveSharp } from "react-icons/io5";
import { BiSolidFilePdf } from "react-icons/bi";
import { ToastContainer, toast } from 'react-toastify';


const MyDriveCard = (props) => {
  //  console.log("props=>" ,props.obj)

  //    let finalObj = {
  //     ...props.obj,
  //     isFav : true
  //   }

  //   console.log("finalObj:" , finalObj);

  const stateData = useSelector((state) => state.user.userData);
  const stateFiles = useSelector((state) => state.user.files);
  const stateStarred = useSelector((state) => state.user.starred);
  const dispatch = useDispatch();
  const starredDataBase = collection(firestore, "starred");
  // const starred = useSelector(state=> state.user.userData)
  // console.log(stateData);
  const [isStarred, setStarred] = useState(props.isFav);
  const [isStarred2, setStarred2] = useState(false);
  const [fetchStarred, setFetchStarred] = useState(false);
  const [starredBaseData, setStarredBinBaseData] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const inputRef = useRef(null);
  // const toastMessage = useSelector(state => state.user.toastMessage)
  
  // let allowUse = false;

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
  };

  const handleStarred = (id, e) => {
    e.stopPropagation();
    setStarred(!isStarred);
    setStarred2(true);
  };

  useEffect(() => {
    async function name(params) {
      try {
        const getStarredData = await getDocs(starredDataBase);
        // console.log("getStarredData :" , getStarredData);

        const mappedGetStarredData = getStarredData.docs.map((ele) => {
          return { ...ele.data(), baseId: ele.id };
        });

        console.log("mappedGetStarredData:"), mappedGetStarredData;

        setStarredBinBaseData(mappedGetStarredData);
      } catch (error) {
        console.log("Error", error);
      }
    }

    if (fetchStarred) {
      name();
    }
  }, [fetchStarred]);

  useEffect(() => {
    if (starredBaseData) {
      dispatch(spreadDataStarred(starredBaseData));
    }
  }, [starredBaseData]);

  useEffect(() => {
    if (isStarred2) {
      try {
        name();
        async function name(params) {
          if (isStarred) {
            const starredDataRef = collection(firestore, "starred");
            const starredDocRef = doc(firestore, "files", props.id);
            // let baseIdval= v4();
            let propObj = {
              ...props.obj,
              isFav: true,
              baseId: props.id,
            };

            await updateDoc(starredDocRef, propObj);
            
            toast.success( "Starred Successfully !", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              // transition: "easeInOut",
              });
            // dispatch(setToastMessage({
            //   type : "success",
            //   message : "Starred Successfully !"
            // }))
            // alert("Updated in files database Successfully");
            await setDoc(doc(firestore, "starred", props.id), propObj);
            // alert("File Added in Recent database Successfully");
            dispatch(
              starredData({
                ...propObj,
                baseId: props.id,
              })
            );

            setFetchStarred(true);
            let findIndex = stateFiles.findIndex((ele) => ele.id == props.id);
            let findValue = stateFiles.find((ele) => ele.id == props.id);

            let finalObj = {
              ...findValue,
              isFav: true,
            };

            // console.log("finalObj:" , finalObj);

            dispatch(
              updateIsFavInFiles({
                index: findIndex,
                object: finalObj,
              })
            );
            // alert("File Added in Recent store Successfully");
            //   console.log("Inside name async func",propObj);
          }

          if (!isStarred) {
            const deletableIndex = stateStarred.find((ele) => {
              console.log("props", props.id);
              console.log("ele", ele.id);

              return props.id == ele.id;
            });
            console.log("deletableIndex", deletableIndex);

            const starredDataRef = doc(
              firestore,
              "starred",
              deletableIndex.baseId
            );
            const UnstarredDocRefFiles = doc(firestore, "files", props.id);

            await updateDoc(UnstarredDocRefFiles, {
              ...props.obj,
              isFav: false,
            });
            setFetchStarred(false);

            toast.success( "Unstarred Successfully !", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              // transition: "easeInOut",
              });
          //  dispatch(setToastMessage({
          //   type : "success",
          //   message : "Unstarred Successfully !"
          //  }))
            // alert("Updated in files database Successfully");
            await deleteDoc(starredDataRef);
            // alert("File Added in Recent database Successfully");
            let findIndexInStarred = stateStarred.findIndex(
              (ele) => ele.id == props.id
            );
            dispatch(unstarData(findIndexInStarred));

            // let findValueInStarred = stateStarred.find(ele => ele.id == props.id);
            let findIndex = stateFiles.findIndex((ele) => ele.id == props.id);
            let findValue = stateFiles.find((ele) => ele.id == props.id);

            let finalObj = {
              ...findValue,
              isFav: false,
            };

            console.log("finalObj:", finalObj);

            dispatch(
              updateIsFavInFiles({
                index: findIndex,
                object: finalObj,
              })
            );
            // alert("File Added in Starred store Successfully");
            // console.log("Inside name async func",propObj);
            // alert("File Added in Recent store Successfully")
            // console.log("Inside name async func", props.obj);
          }
        }
      } catch (error) {
        alert("Error in updating", error);
      }
    }
  }, [isStarred]);

  const handleClick = () => {
    props.setShowOptions(true);
    props.setDownloadedContent(props.obj);
  };

  const handleRename = (id,e) => {
    e.stopPropagation();
    setIsEditMode(true)
  };

  const findIcons = () => {
    // console.log("props.type =>" , props.type);

    let imageStr = props.type.includes("image");
    let videoStr = props.type.includes("video");
    let pdfStr = props.type.includes("pdf");
    let archivesStr = props.type.includes("archives");
    let AuidoStr = props.type.includes("audio");
    let drawingsStr = props.type.includes("drawing");

    if (imageStr) {
      // console.log(true);
      return <IoMdImage style={{ color: "#EA4335", fontSize: "1.5rem" }} />;
    }

    if (videoStr) {
      // console.log(false);
      return <IoMdVideocam style={{ color: "#EA4335", fontSize: "1.5rem" }} />;
    }

    if (pdfStr) {
      // console.log(false);
      return (
        <BiSolidFilePdf style={{ color: "#EA4335", fontSize: "1.5rem" }} />
      );
    }

    if (archivesStr) {
      // console.log(false);
      return (
        <IoArchiveSharp style={{ color: "#EA4335", fontSize: "1.5rem" }} />
      );
    }

    if (AuidoStr) {
      // console.log(false);
      return <FaFileAudio style={{ color: "#EA4335", fontSize: "1.5rem" }} />;
    }

    if (drawingsStr) {
      // console.log(false);
      return (
        <RiShieldFlashFill style={{ color: "#EA4335", fontSize: "1.5rem" }} />
      );
    }
  };

  useEffect(() => {
    if (isEditMode) {
      inputRef.current.value = props.name;
      inputRef.current.select()
    }
  }, [isEditMode]);

  const handleRenameDone = async(id,e) =>{
    e.stopPropagation()
    const filesDocRef = doc(firestore, "files", props.id);
    const starredDocRef = doc(firestore, "starred", props.id);

    let propObj = {
      ...props.obj,
     name : inputRef.current.value
    };

    console.log("propObj",propObj);
    
    const contains = stateStarred.some(ele => id == ele.id)
console.log("contains" , contains);

if(contains){
  await updateDoc(starredDocRef, propObj);
  dispatch(renameInStarred({
    id : props.id,
    value : propObj
  }))
}

    await updateDoc(filesDocRef, propObj);
        toast.success( "Renamed Successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          // transition: "easeInOut",
          });
    // dispatch(setToastMessage({
    //   type : "success" , 
    //   message : "Renamed Successfully!"
    // }))
    // alert("Updated in files database Successfully");
    // alert("Updated in starred database Successfully");
    
    dispatch(renameInFiles({
      id : props.id,
      value : propObj
    }))
      console.log("props",props.obj.name);
      console.log("id",id);
      setIsEditMode(false);
  }

  return (
    <>
    
      <tr onClick={handleClick} className={styles.cardCon}>
        <td>
         <ToastContainer />
        <div className={styles.nameData}>
              {findIcons()}


              {isEditMode ? (
            <div className={styles.inputCon}>
              <input onClick={(e) => e.stopPropagation()}  ref={inputRef} type="text" />
              <MdOutlineDone style={{fontSize:"1.5rem" , color:"green"}} onClick={(e)=> handleRenameDone(props.id,e)} />
            <MdCancel style={{fontSize:"1.5rem"}} onClick={() => setIsEditMode(!isEditMode)} />
            </div>
          ) : (
            <a onClick={(e) => e.stopPropagation} href={props.imageURL} target="_blank">
                {" "}
                <p>{props.name}</p>
              </a>
          )}
            
              {props.isFav ? (
                <IoMdStar
                  style={{ fill: "#000", fontSize: "1rem", color: "1f1f1f" }}
                />
              ) : null}
            </div>
         
        </td>
        <td className={styles.ownerCon}>
          <div className={styles.profile_picture}>
            <img
              src={
                stateData.photoURL
                  ? stateData.photoURL
                  : "https://tse4.mm.bing.net/th?id=OIP.SAcV4rjQCseubnk32USHigHaHx&pid=Api&P=0&h=180"
              }
              alt=""
            />
          </div>
          <p>me</p>
        </td>
        <td>
          <p style={{ fontSize: "0.9rem", color: "grey" }}>
            {props.lastModifiedDate.substring(4, 15)} me
          </p>
        </td>
        <td>
          <div className={styles.fileSize}>
            <p style={{ fontSize: "1.1rem" }}>{convertBytes(props.size)}</p>
            <div className={styles.optionsCon}>
              {/* <RxCross2 onClick={() =>setShowOptions(false)}  style={{ fontSize: "1rem" ,color:"1f1f1f"}} /> */}

              <RiUserSharedLine style={{ fontSize: "1rem", color: "1f1f1f" }} />
              <a
                href={
                  "https://tse1.mm.bing.net/th?id=OIP.4XB8NF1awQyApnQDDmBmQwHaEo&pid=Api&P=0&h=180"
                }
                download
              >
                {" "}
                <LuDownload style={{ fontSize: "1rem", color: "1f1f1f" }} />
              </a>
              <MdOutlineDriveFileRenameOutline
                onClick={(e) => handleRename(props.id,e)}
                style={{ fontSize: "1rem", color: "1f1f1f" }}
              />
              {props.isFav ? (
                <IoMdStar
                  onClick={(e) => handleStarred(props.id, e)}
                  style={{ fontSize: "1rem", color: "1f1f1f" }}
                />
              ) : (
                <IoIosStarOutline
                  onClick={(e) => handleStarred(props.id, e)}
                  style={{ fontSize: "1rem", color: "1f1f1f" }}
                />
              )}
            </div>
            <BsThreeDotsVertical style={{ fontSize: "1rem" }} />
          </div>
        </td>
        <td>
          <div className={styles.locationOuter}></div>
        </td>
      </tr>
    </>
  );
};

export default MyDriveCard;
