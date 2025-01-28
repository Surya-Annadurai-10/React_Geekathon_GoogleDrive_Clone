
import styles from './Bin.module.css'
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

const Bin = () => {
    const [showTypeDrop, setShowTypeDrop] = useState(false);
      return (
         <>
              <div className={styles.sharedCon}>
                <div className={styles.headCon}>
                  <div>
                    <h1>Bin</h1>
                  </div>
                  <div className={styles.headCon_right}>
                    <div className={styles.layoutCon}>
                      <div className={styles.layBox}>
                        <IoMdCheckmark style={{ fontSize: "1.4rem", color: "green" }} />
                        <MdOutlineMenu style={{ fontSize: "1.4rem" }} />
                      </div>
                      <div className={styles.layBox}>
                        <IoMdCheckmark style={{ fontSize: "1.4rem", color: "green" }} />
                        <TbLayoutGrid style={{ fontSize: "1.3rem" }} />
                      </div>
                    </div>
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
                 <div className={styles.dataCon}>
                         <img src="https://thumbs.dreamstime.com/b/cleaning-digital-memory-e-mail-remove-spam-woman-deleting-data-move-unnecessary-files-to-trash-bin-girl-holding-envelope-275279015.jpg" alt="" />
                         <h2>Nothing in bin</h2>
                         <p>Move items that you don't need to the bin. Itmes in the bin will be deleted forever after 30 days.</p>
                                <p> <a className={styles.learn} href="https://support.google.com/drive/answer/10838124?visit_id=638735668929803586-795403184&p=empty_state_computers_web&rd=1" target='_blank'>Learn more</a></p>
                       
                       </div>
              </div>
            </>
      )
}

export default Bin