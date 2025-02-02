import React, { useEffect, useState } from 'react'
import styles  from './Home.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { firestore } from '../../firebase'
import { collection, getDocs,deleteDoc, addDoc, doc } from 'firebase/firestore'
import { storage } from '../../firebase'
import { deleteObject, ref, uploadBytes } from 'firebase/storage'
import {  setDeletedInBin, spreadData, spreadDataBin } from '../../slices/userSlice'
 import loadingGif from "../../assets/loading.gif"
 import { IoMdCheckmark } from "react-icons/io";
 import { MdOutlineMenu } from "react-icons/md";
 import { TbLayoutGrid } from "react-icons/tb";
 import { FaChevronDown } from "react-icons/fa";
import Cards from '../Cards/Cards'
import BoxLayout from '../BoxLayout/BoxLayout'
import { FaChevronUp } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { RiUserSharedLine  } from "react-icons/ri";
import { LuDownload } from "react-icons/lu";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoMdLink } from "react-icons/io";
import { BsThreeDotsVertical } from "react-icons/bs";
import LayoutCon from '../LayoutCon/LayoutCon'



const Home = () => {
  const [baseData , setBaseData] = useState(null);
  const [BinBaseData , setBinBaseData] = useState(null);
  const [starredBaseData , setStarredBinBaseData] = useState(null);
  const [loading , setLoading] = useState(true);
  const [boxLayout , setBoxLayout] = useState(false);
  const [showOptions , setShowOptions] = useState (false);
  const [downloadedContent , setDownloadedContent] = useState({});
  // const [deletedDataId , setDeleteDataId] = useState("");

  const stateData = useSelector(state => state.user.files);
  const dispatch = useDispatch();
  const filesData = collection(firestore , "files")
  const binData = collection(firestore , "bin")
  const starredData = collection(firestore , "starred")
  useEffect(() =>{
    
    const fetchData = async ()=>{
      try {
        const fetchedfiles = await getDocs(filesData)
        const filesFromBin = await getDocs(binData)
        const filesFromStarred = await getDocs(starredData)
    // console.log(fetchedfiles.docs);
    const mappedData = fetchedfiles.docs.map((val) =>{
      console.log("val.id :" , val.id);
      
      return { ...val.data(),id : val.id }
    });

    const mappedDataBin = filesFromBin.docs.map((val) =>{
      console.log("val.id :" , val.id);
      
      return { ...val.data(),id : val.id }
    });

    const mappedDataStarred = filesFromStarred.docs.map((val) =>{
      console.log("val.id :" , val.id);
      
      return { ...val.data(),id : val.id }
    });
    setBaseData(mappedData)
    setBinBaseData(mappedDataBin)
    setStarredBinBaseData(mappedDataStarred)
      } catch (error) {
        console.log("Error while fetching data:" , error)
      }
    }
    fetchData();
   },[]);



   const handleDelete = (id) =>{
    name(id)
  async function name(id) {
    try {
      const deleteDocRef = doc(firestore,"files" , id) 
      const deleteInFilesDataRef = ref(storage , `files/${downloadedContent.name}`);
      const movedToBinDataRef = ref(storage , `bin/${downloadedContent.name}`);
 
    const deletedData = {
      dateBinned : new Date().getTime(),
      ...downloadedContent
      
    }
    
      await addDoc(binData , deletedData);
      alert ("File moved to bin successfully");
      await  deleteDoc(deleteDocRef);
     alert("File deleted in files database successfully");

      const deletedItem = stateData.find((ele) => ele.id == downloadedContent.id)
      const deletedItemId = stateData.findIndex((ele) => ele.id == downloadedContent.id)
      // console.log("deletedIndex:",deletedIndex);

      const newDeletedItem = {
        dateBinned : new Date ().getTime(),
        ...deletedItem 
      }
    
      dispatch(setDeletedInBin({
        item : newDeletedItem,
        index : deletedItemId
      }))
      setShowOptions(false)
       
     } catch (error) {
      console.log("Error :",error);
      
     }
  }
       

     
   }


  useEffect(() =>{

   if(baseData) {
    dispatch(spreadData(baseData));
    setLoading(false);
   };
    
  },[baseData])

  useEffect(() =>{

    if(BinBaseData) {
     dispatch(spreadDataBin(BinBaseData));
     setLoading(false);
    };
     
   },[BinBaseData])

  return (
   <>
      <div className={styles.homeCon}>
        <h2>Welcome to Drive</h2>

       {
        loading ?  <div className={styles.fetching}>
             <div>
             <img src={loadingGif} alt="loadingGif" />
             <p>Fetching data...</p>
             </div>
        </div> : <>
      {
        showOptions ?<div className={styles.optionsCon}>
        <RxCross2 onClick={() =>setShowOptions(false)}  style={{ fontSize: "1.4rem" ,color:"1f1f1f"}} />
        <p>1 selected</p>
        <RiUserSharedLine   style={{ fontSize: "1.4rem" ,color:"1f1f1f"}}/>
      <a href={"https://tse1.mm.bing.net/th?id=OIP.4XB8NF1awQyApnQDDmBmQwHaEo&pid=Api&P=0&h=180"} download>  <LuDownload   style={{ fontSize: "1.4rem" ,color:"1f1f1f"}}/></a>
        <RiDeleteBin6Line onClick={() => handleDelete(downloadedContent.id)}  style={{ fontSize: "1.4rem" ,color:"1f1f1f"}}/>
        <IoMdLink style={{ fontSize: "1.4rem" ,color:"1f1f1f"}} />
        <BsThreeDotsVertical  style={{ fontSize: "1.4rem" ,color:"1f1f1f"}}/>
        </div>
        
        :  <div className={styles["suggested"]}>
        <FaChevronUp   />
       
           <p>Suggested Folders</p>
        
          </div>
      }
         <div className={styles.suggestedCon}>
          <div className={styles.suggested}>
          <FaChevronDown />
       
           <p>Suggested Files</p>
        
          </div>
          <LayoutCon setBoxLayout={setBoxLayout} boxLayout={boxLayout} />
         </div>
         {
          boxLayout ?
          <div className={styles.BoxLayoutCon}>
            {/* <BoxLayout /> */}
            {
                stateData.map((ele) =>{
                  return <BoxLayout  key={ele.id} showOptions={showOptions} setDownloadedContent={setDownloadedContent} setShowOptions={setShowOptions}  {...ele} obj={ele}/>
                  
                })
              }
          </div> :  
          <div className={styles.tablecon}>
          <div className={styles.table}>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Reason suggested</th>
                <th>Owner</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              {
                stateData.map((ele , index) =>{
                  return <Cards  setDownloadedContent={setDownloadedContent} setShowOptions={setShowOptions} key={index} obj= {ele} {...ele} />
                  
                })
              }
            </tbody>
          </table>
        </div>
          </div>
         }
        </>
       }

        {/* <div className={styles.upload}>
        <img src="https://tse3.mm.bing.net/th?id=OIP.Ju2Cdusxkkaq5S3N77uhNAHaEK&pid=Api&P=0&h=180" alt="upload-Image" />
        <p>Drag your files and folders here or use 'New' button to upload</p>
        
        </div> */}
      </div>
     
   </>
  )
}

export default Home