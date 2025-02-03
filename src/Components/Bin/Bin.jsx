import styles from "./Bin.module.css";
import React, { useEffect, useState } from "react";

import { FaCaretDown } from "react-icons/fa";
import { MdPhotoSizeSelectActual } from "react-icons/md";
import { BiSolidFilePdf } from "react-icons/bi";
import { MdMovieCreation } from "react-icons/md";
import { IoArchiveSharp } from "react-icons/io5";
import { FaFileAudio } from "react-icons/fa6";
import { RiShieldFlashFill } from "react-icons/ri";
import { MdOutlineMenu } from "react-icons/md";
import { IoMdCheckmark } from "react-icons/io";
import { TbLayoutGrid } from "react-icons/tb";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import Cards from "../Cards/Cards";
import LayoutCon from "../LayoutCon/LayoutCon";
import BoxLayout from "../BoxLayout/BoxLayout";
import { MdRestore } from "react-icons/md";
import { MdOutlineDeleteForever } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { addDoc, collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { firestore, storage } from "../../firebase";
import { deleteObject, ref } from "firebase/storage";
import { addInFiles, removeItemFromBin, spreadData, spreadDataBin, spreadDataStarred } from "../../slices/userSlice";
import BinCard from "../BinCard/BinCard";


const Bin = () => {
  const [showTypeDrop, setShowTypeDrop] = useState(false);
  const [boxLayout, setBoxLayout] = useState(false);
    const [showOptions , setShowOptions] = useState (false);
      const [downloadedContent , setDownloadedContent] = useState({});
    
  
  const dispatch = useDispatch();
  const stateBin = useSelector((state) => state.user.bin);

 
  //   const [imageUpload , setImageUpload] = useState(null);
  //       const filesData = collection(firestore , "files")
  //        //  const fileDataRef = collection(firestore , "files");
  //        const binData = collection(firestore , "bin")
  //        const starredData = collection(firestore , "starred")
  //          const [baseData , setBaseData] = useState(null);
  //          const [BinBaseData , setBinBaseData] = useState(null);
  //            const [starredBaseData , setStarredBinBaseData] = useState(null);
  //            const [getData , setGetData] = useState(false);
   
 
  //            console.log("Diving to fetch data outer");
 
 
  //   useEffect(() =>{
  //    const fetchData = async ()=>{
  //     console.log("Diving to fetch data");
      
  //      try {
  //        const fetchedfiles = await getDocs(filesData)
  //        const filesFromBin = await getDocs(binData)
  //        const filesFromStarred = await getDocs(starredData)
  //        const mappedData = fetchedfiles.docs.map((val) =>{
  //      console.log("val.id :" , val.id);
       
  //      return { ...val.data(),id : val.id }
  //    });
   
  //    const mappedDataBin = filesFromBin.docs.map((val) =>{
  //      console.log("val.id :" , val.id);
       
  //      return { ...val.data(),id : val.id }
  //    });
  //    const mappedDataStarred = filesFromStarred.docs.map((val) =>{
  //      console.log("val.id :" , val.id);
       
  //      return { ...val.data(),id : val.id }
  //    });
  //    setBaseData(mappedData)
  //    setBinBaseData(mappedDataBin)
  //    setStarredBinBaseData(mappedDataStarred)
  //      } catch (error) {
  //        console.log("Error while fetching data:" , error)
  //      }
  //      setGetData(false);
  //  }
     
     
    
  //        fetchData();
       
     
  //   },[])
   
   
     
  //   useEffect(() =>{
    
  //    if(starredBaseData) {
  //     dispatch(spreadDataStarred(starredBaseData));
  //    //  setLoading(false);
  //    };
      
  //   },[starredBaseData])
   
   
   
  //  useEffect(() =>{
   
  //   if(baseData) {
  //    dispatch(spreadData(baseData));
    
  //   };
     
  //  },[baseData])
   
  //  useEffect(() =>{
   
  //    if(BinBaseData) {
  //     dispatch(spreadDataBin(BinBaseData));
     
  //    };
      
  //   },[BinBaseData])
 
 

  const handleDelete = (id) =>{
     console.log(id);

     try {
      name();

      async function name(params) {
        const binDataRef = doc(firestore , "bin",id);
        const binStoreRef = ref(storage , `files/${downloadedContent.name}`)
      await deleteDoc(binDataRef)
      alert("data deleted in bin database")
      await deleteObject(binStoreRef);
      alert("data deleted in bin storage")
        
      const deletedindex = stateBin.findIndex(ele => ele.id == id)
      dispatch(removeItemFromBin(deletedindex))


      }
     } catch (error) {
      console.log("Error : ", error);
      
     }
     
  }


  const handleRestore = (id) =>{
  //  console.log(id);
  try {
    name();

    async function name(params) {
      const restoreInFileData = collection(firestore , "files");
      const deleteInBinData = doc( firestore , "bin" , id);
      await addDoc(restoreInFileData , downloadedContent);
      alert("File added back to files database")
      await deleteDoc(deleteInBinData);
      alert("File deleted in bin database")

      
      const deletedindex = stateBin.findIndex(ele => ele.id == id)
      dispatch(removeItemFromBin(deletedindex));

      dispatch(addInFiles(downloadedContent));


    }
  } catch (error) {
    console.log("Error :" , error);
    
  }
  }

  return (
    <>
      <div className={styles.sharedCon}>
        <div className={styles.headCon}>
          <div>
            <h1>Bin</h1>
          </div>
          <div className={styles.headCon_right}>
         
            <LayoutCon boxLayout={boxLayout} setBoxLayout={setBoxLayout} />
            <IoMdInformationCircleOutline style={{ fontSize: "1.4rem" }} />
          </div>
        </div>


        {
          showOptions ? <div className={styles.optionsCon}>
                  <RxCross2 onClick={() =>setShowOptions(false)}  style={{ fontSize: "1.4rem" ,color:"1f1f1f"}} />
                  <p>1 selected</p>
                  <MdRestore  onClick={() => handleRestore(downloadedContent.id)}  style={{ fontSize: "1.4rem" ,color:"1f1f1f"}}/>
                {/* <a href={"https://tse1.mm.bing.net/th?id=OIP.4XB8NF1awQyApnQDDmBmQwHaEo&pid=Api&P=0&h=180"} download>  <LuDownload   style={{ fontSize: "1.4rem" ,color:"1f1f1f"}}/></a> */}
                  <MdOutlineDeleteForever  onClick={() => handleDelete(downloadedContent.id)}  style={{ fontSize: "1.4rem" ,color:"1f1f1f"}}/>
                  {/* <IoMdLink style={{ fontSize: "1.4rem" ,color:"1f1f1f"}} />
                  <BsThreeDotsVertical  style={{ fontSize: "1.4rem" ,color:"1f1f1f"}}/> */}
                  </div> :
                    <div className={styles.filter_container}>
                      <div className={styles.filter_con}>
                        <div
                          onClick={() => {
                            setShowTypeDrop(!showTypeDrop);
                            if (showTypeDrop) {
                              setShowTypeDrop(!showTypeDrop);
                            }
                          }}
                          className={styles.mydriveFilter}
                        >
                          <p>Type</p>
                          <div>
                            <FaCaretDown />
                          </div>
                        </div>
                        <div className={styles.mydriveFilter}>
                          <p>People</p>
                          <FaCaretDown />
                        </div>

                        <div className={styles.mydriveFilter}>
                          <p>Sources</p>
                          <FaCaretDown />
                        </div>
                      </div>
                      {showTypeDrop ? (
                        <div className={styles.typeDropDown}>
                          <div>
                            <div>
                              <img
                                style={{ width: "18px" }}
                                className={styles.documentsImg}
                                src="https://static.vecteezy.com/system/resources/previews/027/179/375/non_2x/google-docs-icon-logo-symbol-free-png.png"
                                alt="documents"
                              />
                            </div>
                            <p>Documents</p>
                          </div>

                          <div>
                            <div>
                              <img
                                src="https://cdn-icons-png.flaticon.com/512/2965/2965327.png"
                                alt="SpreadSheets"
                              />
                            </div>

                            <p>SpreadSheets</p>
                          </div>

                          <div>
                            <div>
                              <img
                                style={{ width: "26px" }}
                                src="https://webstockreview.net/images/google-slides-png.png"
                                alt="Presentations"
                              />
                            </div>

                            <p>Presentations</p>
                          </div>
                          <div>
                            <div>
                              <img
                                style={{ width: "22px" }}
                                src="https://webstockreview.net/images/google-forms-png-10.png"
                                alt="Forms"
                              />
                            </div>

                            <p>Forms</p>
                          </div>
                          <div>
                            <div>
                              <MdPhotoSizeSelectActual className={styles.typeIcons} />
                            </div>

                            <p>Photos & images</p>
                          </div>
                          <div>
                            <div>
                              <BiSolidFilePdf className={styles.typeIcons} />
                            </div>

                            <p>PDFs</p>
                          </div>
                          <div>
                            <div>
                              <MdMovieCreation className={styles.typeIcons} />
                            </div>

                            <p>Videos</p>
                          </div>
                          <div>
                            <div>
                              <IoArchiveSharp className={styles.typeIcons} />
                            </div>

                            <p>Archives </p>
                          </div>
                          <div>
                            <div>
                              <FaFileAudio className={styles.typeIcons} />
                            </div>

                            <p>Audio</p>
                          </div>
                          <div>
                            <div>
                              <RiShieldFlashFill className={styles.typeIcons} />
                            </div>

                            <p>Drawings</p>
                          </div>
                          <div>
                            <div>
                              <img
                                src="https://vignette.wikia.nocookie.net/logopedia/images/9/9b/Google-Sites-Icon-2016.png/revision/latest?cb=20170613191011"
                                alt="sites"
                              />
                            </div>

                            <p>Sites</p>
                          </div>
                        </div>
                      ) : null}
                    </div>
        }

     

        {stateBin.length == 0 ? (
          <div className={styles.dataCon}>
            <img
              src="https://thumbs.dreamstime.com/b/cleaning-digital-memory-e-mail-remove-spam-woman-deleting-data-move-unnecessary-files-to-trash-bin-girl-holding-envelope-275279015.jpg"
              alt=""
            />
            <h2>Nothing in bin</h2>
            <p>
              Move items that you don't need to the bin. Itmes in the bin will
              be deleted forever after 30 days.
            </p>
            <p>
              {" "}
              <a
                className={styles.learn}
                href="https://support.google.com/drive/answer/10838124?visit_id=638735668929803586-795403184&p=empty_state_computers_web&rd=1"
                target="_blank"
              >
                Learn more
              </a>
            </p>
          </div>
        ) : boxLayout ? (
          <div className={styles.BoxLayoutCon}>
            {/* <BoxLayout /> */}
            {
                stateBin.map((ele) =>{
                  return <BoxLayout setDownloadedContent={setDownloadedContent} setShowOptions={setShowOptions}   key={ele.id} obj={ele} {...ele} />
                  
                })
              }
          </div>
        ) : (
          <div className={styles.tablecon}>
          <div className={styles.table}>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Owner</th>
                <th>Date binned</th>
                <th>File Size</th>
                <th>Original Location</th>
              </tr>
            </thead>
            <tbody>
              {
                stateBin.map((ele , index) =>{
                  return <BinCard  setDownloadedContent={setDownloadedContent} setShowOptions={setShowOptions} key={index} obj= {ele} {...ele} />
                  
                })
              }
            </tbody>
          </table>
        </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Bin;
