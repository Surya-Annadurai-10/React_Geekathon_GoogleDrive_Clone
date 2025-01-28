// import React from 'react'
import React, { useState } from "react";
import styles from './Storage.module.css'
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
import { GoDotFill } from "react-icons/go";

const Storage = () => {
   const [showTypeDrop, setShowTypeDrop] = useState(false);
        return (
           <>
                <div className={styles.sharedCon}>
                  <div className={styles.headCon}>
                    <div>
                      <h1>Bin</h1>
                    </div>
                    <div className={styles.headCon_right}>
                    <button className={styles.clean}>Backups</button>
                      <IoMdInformationCircleOutline style={{fontSize:"1.4rem"}} />
                    </div>
                    
                  </div>
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
                  <div className={styles.StorageData}>
                         <div><h1 className={styles.bytesHead}>0 bytes</h1> <span className={styles.gbColor}>of 15 GB used</span></div>
                         <progress className={styles.progressBar} value={"10"} max={"100"}></progress>
                         <p className={styles.dotCon}> <span><GoDotFill style={{color : "#4285F4",fontSize:"1.2rem"}} /></span>Google Drive</p>
                         <div className={styles.getCon} >
                         <button className={styles.get}>Get more storage</button>
                         <button className={styles.clean}>Clean up space</button>
                          </div>
                  </div>
                   <div className={styles.dataCon}>
                           <img src="https://static.vecteezy.com/system/resources/previews/019/187/881/original/cloud-computing-online-database-web-hosting-people-storing-data-and-processing-data-on-web-server-man-using-computer-upload-and-download-information-on-cloud-storage-vector.jpg" alt="" />
                           <h2>No files are using storage</h2>
                           <p>Items you own will use Drive storage</p>                         
                         </div>
                </div>
              </>
        )
}

export default Storage