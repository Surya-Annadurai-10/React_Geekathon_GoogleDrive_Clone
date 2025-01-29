import React from 'react'
import styles from './PopupRight.module.css'
import { MdClear } from "react-icons/md";
// import { FaCaretRight } from "react-icons/fa";
// import { MdOutlineCreateNewFolder } from "react-icons/md";
// import { TbFileUpload } from "react-icons/tb";
// import { MdDriveFolderUpload } from "react-icons/md";

const PopupRight = (props) => {
  return (

    <>
       <div className={styles.PopupRightCon}>
                      <MdClear onClick={() => props.setShowPopupRight(false)} className={styles.clear} />
       </div>


    {/* <div className={styles.myDriveContents}>
                  <div className={styles.topOpt}>
                  <div>
                  <MdOutlineCreateNewFolder className={styles.icons} />
                      <p>New Folder</p>
                    </div>
                    <p style={{fontSize: "0.8rem"}}>Alt+C then F</p>
                  </div>
                  <div className={styles.folders}>
                    <div className={styles.topOpt}>
                      <div>
                        <TbFileUpload className={styles.icons} />
                        <p style={{fontSize: "1rem"}}>File upload</p>
                      </div>
                      <p style={{fontSize: "0.8rem"}}>Alt+C then U</p>
                    </div>
                    <div className={styles.topOpt}>
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
                    <FaCaretRight />
                  </div>
                </div> */}
    </>
  )
}

export default PopupRight