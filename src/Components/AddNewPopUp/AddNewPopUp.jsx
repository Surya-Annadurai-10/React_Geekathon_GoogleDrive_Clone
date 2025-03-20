import React, { useEffect, useRef, useState } from 'react'
import styles from './AddNewPopUp.module.css'
import { storage } from '../../firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import {v4} from 'uuid'
import { useDispatch, useSelector } from 'react-redux';
import { addInFiles, setShowNotification, setShowUploading, spreadData, spreadDataBin, spreadDataStarred  } from '../../slices/userSlice';
import { FaCaretRight } from "react-icons/fa"
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { TbFileUpload } from "react-icons/tb";
import { MdDriveFolderUpload } from "react-icons/md";
import JSZip from 'jszip';
import { collection,addDoc, getDocs, setDoc, doc } from 'firebase/firestore';
import { firestore } from '../../firebase';
import Notification from '../Notification/Notification';
import { toast } from 'react-toastify';





const AddNewPopUp = (props) => {
    const dispatch = useDispatch();
   const showNotification = useSelector(state => state.showNotification)
  //  const showUploading = useSelector(state => state.showUploading)
    const [imageUpload , setImageUpload] = useState(null);
     const filesData = collection(firestore , "files")
      //  const fileDataRef = collection(firestore , "files");
      const binData = collection(firestore , "bin")
      const starredData = collection(firestore , "starred")
        const [baseData , setBaseData] = useState(null);
        const [BinBaseData , setBinBaseData] = useState(null);
          const [starredBaseData , setStarredBinBaseData] = useState(null);
          const [getData , setGetData] = useState(false);
          const boxRef = useRef(null);

 const handleFileSubmit = async() =>{
    try {
      const [files] = await window.showOpenFilePicker();
    const file = await files.getFile();
    // console.log("file :" , file);
    boxRef.current.style.display = "none";
    setImageUpload(file);
    // console.log("Image Uploaded in state");
    dispatch(setShowUploading(true));
    

    } catch (error) {
      console.log("Error fetching data from ur system :" , error)
    }
    
 }



 useEffect(() =>{
    async function name(params) {
  // console.log("entering useEffect to uplaod file in the storage")

      try {
          // creating reference where to store in while folder and in what name
          const imageRef = ref(storage , `files/${imageUpload.name}`);
          // uploading the file inside the reference
          const res = await uploadBytes(imageRef , imageUpload);
          // getting the url of the image
          const url = await getDownloadURL(res.ref)
          console.log("url" , url);
          const id =  v4();
           const reduxObj = {
            name : imageUpload.name,
            size: imageUpload.size,
            type : imageUpload.type,
            lastModifiedDate : imageUpload.lastModifiedDate + "",
            lastModified : imageUpload.lastModified,
            imageURL : url,
            isFav : false,
            id :id
           }
          //  console.log(reduxObj);
           dispatch(addInFiles(reduxObj));
           const fileDataRef = collection(firestore , "files");
          //  await addDoc(fileDataRef , reduxObj);
           await setDoc(doc(firestore, "files",id), reduxObj);
            dispatch(setShowUploading(false));
            dispatch(setShowNotification(true));
            toast.success('File Uploaded Successfully !', {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              // transition: Bounce,
              });
      } catch (error) {
        console.log("Error while uploading the file :" , error)
        toast.error('Error while uploading the file', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          // transition: Bounce,
          });
      }

      setGetData(true)
        
    }
    if(imageUpload){
      name();
    }

    // console.log("imageUpload :" , imageUpload);
    
 },[imageUpload]);



 useEffect(() =>{
  const fetchData = async ()=>{
    try {
      const fetchedfiles = await getDocs(filesData)
      const filesFromBin = await getDocs(binData)
      const filesFromStarred = await getDocs(starredData)
      const mappedData = fetchedfiles.docs.map((val) =>{
    // console.log("val.id :" , val.id);
    
    return { ...val.data(),id : val.id }
  });

  const mappedDataBin = filesFromBin.docs.map((val) =>{
    // console.log("val.id :" , val.id);
    
    return { ...val.data(),id : val.id }
  });
  const mappedDataStarred = filesFromStarred.docs.map((val) =>{
    // console.log("val.id :" , val.id);
    
    return { ...val.data(),id : val.id }
  });
  setBaseData(mappedData)
  setBinBaseData(mappedDataBin)
  setStarredBinBaseData(mappedDataStarred)
    } catch (error) {
      console.log("Error while fetching data:" , error)
    }
    setGetData(false);
}
  
  if(getData){
 
      fetchData()
    
  }
 },[getData])


  
 useEffect(() =>{
 
  if(starredBaseData) {
   dispatch(spreadDataStarred(starredBaseData));
  //  setLoading(false);
  };
   
 },[starredBaseData])



useEffect(() =>{

 if(baseData) {
  dispatch(spreadData(baseData));
 
 };
  
},[baseData])

useEffect(() =>{

  if(BinBaseData) {
   dispatch(spreadDataBin(BinBaseData));
   props.setShowNewAdd(false)
  
  };
 },[BinBaseData])

 const handleFolderSubmit = async () =>{
   try{
     const handleFolder = await window.showDirectoryPicker();

     for await (const value of handleFolder.values()){
      if(value.kind == "file"){
        const listFiles = await value.getFile();
        console.log(listFiles);
      }
     }

   }catch (error){
      console.log("error :" , error);
          
   }
 }


 const handleStop = (e) =>{
  props.setShowNewAdd(true)
  e.stopPropagation();
 }
    
  return (
    <>

       <div onClick={() => {props.setShowNewAdd(false)}} className={styles.myDriveWrapper}>
       <div ref={boxRef} onClick={(e) => handleStop(e)}  className={styles.myDriveContents}>
                  {/* <div className={styles.topOpt}>
                  <div >
                  <MdOutlineCreateNewFolder className={styles.icons} />
                      <p>New Folder</p>
                    </div>
                    <p style={{fontSize: "0.8rem"}}>Alt+C then F</p>
                  </div> */}
                  <div className={styles.folders}>
                    <div onClick={handleFileSubmit} className={styles.topOpt}>
                      <div >
                        <TbFileUpload className={styles.icons} />
                        <p style={{fontSize: "1rem"}}>File upload</p>
                      </div>
                      <p style={{fontSize: "0.8rem"}}>Alt+C then U</p>
                    </div>
                    {/* <div onClick={handleFolderSubmit} className={styles.topOpt}>
                      <div>
                        <MdDriveFolderUpload className={styles.icons} />
                        <p style={{fontSize: "1rem"}}>Folder upload</p>
                      </div>
                      <p style={{fontSize: "0.8rem"}}>Alt+C then I</p>
                    </div>
                  </div>
                  <div className={styles.googleCon}>
                    <div>
                      <img
                        src="https://www.freepngimg.com/thumb/google/66255-google-icons-docs-drive-computer-suite.png"
                        alt=""
                      />
                      <p>Google Docs</p>
                    </div>
                    <FaCaretRight />
                  </div>
                  <div className={styles.googleCon}>
                    <div>
                      <img
                        src="https://i0.wp.com/cdn-icons-png.flaticon.com/512/2965/2965327.png"
                        alt=""
                      />
                      <p>Google Sheets</p>
                    </div>
                    <FaCaretRight />
                  </div>
                  <div className={styles.googleCon}>
                    <div>
                      <img
                        src="https://www.freepnglogos.com/uploads/google-slides-logo-png/google-slides-icon-logo-6.png"
                        alt=""
                        />
                      <p>Google Slides</p>
                    </div>
                    <FaCaretRight />
                  </div>
                  <div className={styles.googleCon}>
                    <div>
                      <img
                        src="https://webstockreview.net/images/google-forms-png-10.png"
                        alt=""
                      />
                      <p>Google Forms</p>
                    </div>
                    <FaCaretRight />
                  </div>
                  <div className={styles.googleCon}>
                    <div>
                      <div className={styles.box}></div>
                      <p>More</p>
                    </div>
                    <FaCaretRight /> */}
                  </div>
        </div>
       </div>

       
       {/* <div className={styles.container}>
           <form onSubmit={handleSubmit}>
            <h2>Select the file you want to upload</h2>
            <div className={styles.input_box}>
            <input type="file" onChange={(e) => onUpload(e)}/>
       
            </div>
            <button>Submit</button>
           </form>
        </div> */}
    </>
  )
}

export default AddNewPopUp