import React, { useState } from "react";
import styles from "./MyDrive.module.css";
import { FaCaretDown } from "react-icons/fa";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { TbFileUpload } from "react-icons/tb";
import { MdDriveFolderUpload } from "react-icons/md";
import { FaCaretRight } from "react-icons/fa";
import { PiFolderSimpleBold } from "react-icons/pi";
import { MdPhotoSizeSelectActual } from "react-icons/md";
import { BiSolidFilePdf } from "react-icons/bi";
import { MdMovieCreation } from "react-icons/md";
import { IoArchiveSharp } from "react-icons/io5";
import { FaFileAudio, FaLinesLeaning } from "react-icons/fa6";
import { RiShieldFlashFill } from "react-icons/ri";
import { MdSwitchAccessShortcut } from "react-icons/md";
import { useSelector } from "react-redux";
import Cards from "../Cards/Cards";
import LayoutCon from "../LayoutCon/LayoutCon";
import { BsThreeDotsVertical } from "react-icons/bs";
import Layout from "../../Containers/Layout/Layout";
import BoxLayout from "../BoxLayout/BoxLayout";
import { RxCross2 } from "react-icons/rx";
import { RiUserSharedLine  } from "react-icons/ri";
import { LuDownload } from "react-icons/lu";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoMdLink } from "react-icons/io";
import MyDriveCard from "../MyDriveCard/MyDriveCard";
// import { BsThreeDotsVertical } from "react-icons/bs";

const MyDrive = () => {
  const [showDropDown, setShowDropDown] = useState(false);
  const [showTypeDrop , setShowTypeDrop] = useState(false);
  const [showOptions , setShowOptions] = useState (false);
  const [downloadedContent , setDownloadedContent] = useState({});
  const [boxLayout , setBoxLayout] = useState(false);
  
  const stateData = useSelector(state => state.user.files);
    

  
  return (
   <>
<div className={styles.MyDriveContainer}>
    <div >
      <div className={styles.mydriveCon}>
       <div className={styles.myDriveHeader}>
       <div
          style={{
            backgroundColor: showDropDown ? "rgb(239, 239, 239)" : null,
          }}
          onClick={() => {
            setShowDropDown(!showDropDown)
            if(showTypeDrop){
              setShowTypeDrop(!showTypeDrop)
             }
          }}
          className={styles.mydriveDrop}
        >
          <h2>My Drive</h2>
          <FaCaretDown />
         
         
        </div>
        <LayoutCon setBoxLayout={setBoxLayout} boxLayout={boxLayout} />
       </div>
        {

          showOptions ?
          <div className={styles.optionsCon}>
                  <RxCross2 onClick={() =>setShowOptions(false)}  style={{ fontSize: "1.4rem" ,color:"1f1f1f"}} />
                  <p>1 selected</p>
                  <RiUserSharedLine   style={{ fontSize: "1.4rem" ,color:"1f1f1f"}}/>
                <a href={"https://tse1.mm.bing.net/th?id=OIP.4XB8NF1awQyApnQDDmBmQwHaEo&pid=Api&P=0&h=180"} download>  <LuDownload   style={{ fontSize: "1.4rem" ,color:"1f1f1f"}}/></a>
                  <RiDeleteBin6Line onClick={() => handleDelete(downloadedContent.id)}  style={{ fontSize: "1.4rem" ,color:"1f1f1f"}}/>
                  <IoMdLink style={{ fontSize: "1.4rem" ,color:"1f1f1f"}} />
                  <BsThreeDotsVertical  style={{ fontSize: "1.4rem" ,color:"1f1f1f"}}/>
          </div>
          :
          <div className={styles.filter_con}>
          <div onClick={() =>{
             setShowTypeDrop(!showTypeDrop);
             if(showTypeDrop){
              setShowTypeDrop(!showTypeDrop)
             }
          }} className={styles.mydriveFilter}>
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
        }
        {
          boxLayout ?
          <div className={styles.BoxLayoutCon}>
          {/* <BoxLayout /> */}
          {
              stateData.map((ele) =>{
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
                stateData.map((ele , index) =>{
                  return <MyDriveCard  setDownloadedContent={setDownloadedContent} setShowOptions={setShowOptions} key={index} obj= {ele} {...ele} />
                  
                })
              }
            </tbody>
          </table>
        </div>
          </div> 
        }
      </div>
      {
          showDropDown ?
            <div className={styles.myDriveContents}>
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
            </div>
        : null
      }

{
              showTypeDrop ? 
              <div className={styles.typeDropDown}>
              <div>
                <div>
                  <PiFolderSimpleBold className={styles.folders} />
                </div>
                <p>Folders</p>
              </div>
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
              <div>
                <div>
                  <MdSwitchAccessShortcut className={styles.shortCuts} />
                </div>

                <p>Shortcuts</p>
              </div>
              {/* <div>
              <img src="" alt="" />
              <p>Folders</p>
             </div> */}
            </div>
              : null
            }

       
  
    </div>
</div>
   
   </>
  );
};

export default MyDrive;
