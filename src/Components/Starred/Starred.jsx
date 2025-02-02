import React, { useState } from "react";

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
import styles from './Starred.module.css'
import LayoutCon from "../LayoutCon/LayoutCon";
import BoxLayout from "../BoxLayout/BoxLayout";
import { useSelector } from "react-redux";
import { RxCross2 } from "react-icons/rx";
import { RiUserSharedLine  } from "react-icons/ri";
import { LuDownload } from "react-icons/lu";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoMdLink } from "react-icons/io";
import { BsThreeDotsVertical } from "react-icons/bs";
import MyDriveCard from "../MyDriveCard/MyDriveCard";

const Starred = () => {
   const [showTypeDrop, setShowTypeDrop] = useState(false);
   const [boxLayout , setBoxLayout] = useState(false);
   const [showOptions , setShowOptions] = useState (false);
   const [downloadedContent , setDownloadedContent] = useState({});
        //  const [boxLayout , setBoxLayout] = useState(false);

   const stateStarred = useSelector(state => state.user.starred);
   console.log("stateStarred:" , stateStarred);
   
     
   return (
      <>
           <div className={styles.sharedCon}>
             <div className={styles.headCon}>
               <div>
                 <h1>Starred</h1>
               </div>
               <div className={styles.headCon_right}>
               <LayoutCon setBoxLayout={setBoxLayout} boxLayout={boxLayout} />
                 <IoMdInformationCircleOutline style={{fontSize:"1.4rem"}} />
               </div>
               
             </div>

             {
              showOptions ? <div className={styles.optionsCon}>
                                <RxCross2 onClick={() =>setShowOptions(false)}  style={{ fontSize: "1.4rem" ,color:"1f1f1f"}} />
                                <p>1 selected</p>
                                <RiUserSharedLine   style={{ fontSize: "1.4rem" ,color:"1f1f1f"}}/>
                              <a href={"https://tse1.mm.bing.net/th?id=OIP.4XB8NF1awQyApnQDDmBmQwHaEo&pid=Api&P=0&h=180"} download>  <LuDownload   style={{ fontSize: "1.4rem" ,color:"1f1f1f"}}/></a>
                                <RiDeleteBin6Line onClick={() => handleDelete(downloadedContent.id)}  style={{ fontSize: "1.4rem" ,color:"1f1f1f"}}/>
                                <IoMdLink style={{ fontSize: "1.4rem" ,color:"1f1f1f"}} />
                                <BsThreeDotsVertical  style={{ fontSize: "1.4rem" ,color:"1f1f1f"}}/>
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
                              <p>Modified</p>
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
              {/* <div className={styles.blueCon}>
                     <div className={styles.infoCon}>
                     <IoMdInformationCircleOutline style={{fontSize:"1.4rem",  color:"#0842A0"}} />
                     </div>
                     <div className={styles.infoContent}>
                       <h3>Better spam filters</h3>
                       <p>Now Drive automatically moves suspicious files shared with you to spam. You can still report spam yourself. <a href="https://support.google.com/drive/answer/10838124?visit_id=638735668928139829-627112234&p=computers_tab_syncing&rd=1" target="_blank" rel="noopener noreferrer">Learn more</a></p>
                     </div>
               
                     <MdClear  className={styles.clearBtn}/>
                     
              </div> */}


              {
                  stateStarred.length!= 0 ?  
                  <div className={styles.starredContainer}>
                   {
                    boxLayout ?
                    <div className={styles.BoxLayoutCon}>
                    {/* <BoxLayout /> */}
                    {
                        stateStarred.map((ele) =>{
                          return <BoxLayout  key={ele.id} showOptions={showOptions} setDownloadedContent={setDownloadedContent} setShowOptions={setShowOptions}  {...ele} obj={ele}/>
                          
                        })
                      }
                  </div>
                    : 
                    <div className={styles.tablecon}>
                    <div className={styles.table}>
                    <table>
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Owner</th>
                          <th>Last modified</th>
                          <th>
                            <div className={styles.fileSizeCon}>
                            <p>File size</p>
                            <BsThreeDotsVertical fontSize={"1rem"} />
                            </div>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          stateStarred.map((ele , index) =>{
                            return <MyDriveCard  setDownloadedContent={setDownloadedContent} setShowOptions={setShowOptions} key={index} obj= {ele} {...ele} />
                            
                          })
                        }
                      </tbody>
                    </table>
                  </div>
                    </div> 
                  }
                  </div> : 
              <div className={styles.dataCon}>
                      <img src="https://static.vecteezy.com/system/resources/previews/013/474/355/non_2x/raised-up-hand-holding-star-vector.jpg" alt="" />
                      <h2>No starred files</h2>
                      <p>Add stars to things that you want to easily find later</p>
              </div>

              }
           </div>
         </>
   )
}

export default Starred