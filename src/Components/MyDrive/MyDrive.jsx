import React, { useEffect, useState } from "react";
import styles from "./MyDrive.module.css";
import { FaCaretDown } from "react-icons/fa";
import { MdClear, MdOutlineCreateNewFolder } from "react-icons/md";
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
import { useDispatch, useSelector } from "react-redux";
import Cards from "../Cards/Cards";
import LayoutCon from "../LayoutCon/LayoutCon";
import { BsThreeDotsVertical } from "react-icons/bs";
import Layout from "../../Containers/Layout/Layout";
import BoxLayout from "../BoxLayout/BoxLayout";
import { RxCross2 } from "react-icons/rx";
import { RiUserSharedLine } from "react-icons/ri";
import { LuDownload } from "react-icons/lu";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoMdLink } from "react-icons/io";
import MyDriveCard from "../MyDriveCard/MyDriveCard";
import { toast, ToastContainer } from "react-toastify";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import { setDeletedInBin } from "../../slices/userSlice";
import { firestore, storage } from "../../firebase";
// import { BsThreeDotsVertical } from "react-icons/bs";

const MyDrive = () => {
  const [showDropDown, setShowDropDown] = useState(false);
  const [showTypeDrop, setShowTypeDrop] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [downloadedContent, setDownloadedContent] = useState({});
  const [boxLayout, setBoxLayout] = useState(false);
  const [filter, setFilter] = useState("");
  const dispatch = useDispatch();
  const stateData = useSelector((state) => state.user.files);

  const handleDelete = (id) => {
    console.log("id:", id);

    name();
    async function name() {
      try {
        const deleteDocRef = doc(firestore, "files", id);
        const deleteInFilesDataRef = ref(
          storage,
          `files/${downloadedContent.name}`
        );
        const movedToBinDataRef = ref(storage, `bin/${downloadedContent.name}`);

        const deletedData = {
          dateBinned: new Date().getTime(),
          ...downloadedContent,
        };

        // await addDoc(binData , deletedData);
        await setDoc(doc(firestore, "bin", id), deletedData);
        toast.success("Deleted Successfully !", {
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
        await deleteDoc(deleteDocRef);

        const deletedItem = stateData.find(
          (ele) => ele.id == downloadedContent.id
        );
        const deletedItemId = stateData.findIndex(
          (ele) => ele.id == downloadedContent.id
        );
        // console.log("deletedIndex:",deletedIndex);

        const newDeletedItem = {
          dateBinned: new Date().getTime(),
          ...deletedItem,
        };

        dispatch(
          setDeletedInBin({
            item: newDeletedItem,
            index: deletedItemId,
          })
        );
        setShowOptions(false);
      } catch (error) {
        console.log("Error :", error);
      }
    }
  };


  console.log("downloadedContent", downloadedContent);
  const handleDownload = async(obj) => {
    // Example: Creating a text file dynamically
    // const data = "This is the content of your file.";
    // const blob = new Blob([data], { type: "text/plain" });
    // const url = obj.imageURL;

    // const response = await fetch(obj.imageURL);
    // const blob = await response.blob();
    const res = await getDownloadURL(ref(storage , `files/${downloadedContent.name}`))
    const url = res;

    // const xhr = new XMLHttpRequest();
    // xhr.responseType = 'blob';
    // xhr.onload = (event) => {
    //   const blob = xhr.response;
    // };
    // xhr.open('GET', url);
    // xhr.send();


    const a = document.createElement("a");
    a.href = url;
    a.download = `${downloadedContent.name}`;
    document.body.appendChild(a);
    a.rel = "noopener noreferrer"
    a.target = "_blank"
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    setShowOptions(false)
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(downloadedContent.imageURL);
      setShowOptions(false)
      toast.success("Link Copied !", {
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
    } catch (error) {
      toast.error("Error while Copying!", {
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
    }
  };

  const handleShare = async() =>{
    try {
      await navigator.share({
        title: "Check this out!",
        text: "please view It",
        url: downloadedContent.imageURL,
      })
      setShowOptions(false)
    
    } catch (error) {
      toast.error("Error while Sharing!", {
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
    }
  }


  return (
    <>
      <div className={styles.MyDriveContainer}>
        <div>
          <div className={styles.mydriveCon}>
            <div className={styles.myDriveHeader}>
              <div
                style={{
                  backgroundColor: showDropDown ? "rgb(239, 239, 239)" : null,
                }}
                onClick={() => {
                  setShowDropDown(!showDropDown);
                  if (showTypeDrop) {
                    setShowTypeDrop(!showTypeDrop);
                  }
                }}
                className={styles.mydriveDrop}
              >
                <h2>My Drive</h2>
                <FaCaretDown />
              </div>
              <LayoutCon setBoxLayout={setBoxLayout} boxLayout={boxLayout} />
            </div>
            {showOptions ? (
              <div className={styles.optionsCon}>
                <RxCross2
                  onClick={() => setShowOptions(false)}
                  style={{ fontSize: "1.4rem", color: "1f1f1f" }}
                />
                <p>1 selected</p>
                <RiUserSharedLine onClick={handleShare}  style={{ fontSize: "1.4rem" ,color:"1f1f1f"}}/>
              
                  <LuDownload onClick={handleDownload} style={{ fontSize: "1.4rem", color: "1f1f1f" }} />
               

                <RiDeleteBin6Line
                  onClick={() => handleDelete(downloadedContent.id)}
                  style={{ fontSize: "1.4rem", color: "1f1f1f" }}
                />
                <IoMdLink
                  onClick={handleCopyLink}
                  style={{ fontSize: "1.4rem", color: "1f1f1f" }}
                />
                {/* <BsThreeDotsVertical  style={{ fontSize: "1.4rem" ,color:"1f1f1f"}}/> */}
              </div>
            ) : (
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
                {filter != "" ? (
                  <div className={styles.filterPart}>
                    <p>{filter}</p>
                    <MdClear
                      className={styles.clearIcon}
                      style={{ cursor: "pointer" }}
                      onClick={() => setFilter("")}
                    />
                  </div>
                ) : null}
                {/* <div className={styles.mydriveFilter}>
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
          </div> */}
              </div>
            )}
            {boxLayout ? (
              <div className={styles.BoxLayoutCon}>
                {/* <BoxLayout /> */}
                {stateData
                  .filter((ele) => ele.type.includes(filter))
                  .map((ele) => {
                    return (
                      <BoxLayout
                        key={ele.id}
                        showOptions={showOptions}
                        setDownloadedContent={setDownloadedContent}
                        setShowOptions={setShowOptions}
                        {...ele}
                        obj={ele}
                      />
                    );
                  })}
              </div>
            ) : (
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
                      {stateData
                        .filter((ele) => ele.type.includes(filter))
                        .map((ele, index) => {
                          return (
                            <MyDriveCard
                              setDownloadedContent={setDownloadedContent}
                              setShowOptions={setShowOptions}
                              key={index}
                              obj={ele}
                              {...ele}
                            />
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
          {showDropDown ? (
            <div className={styles.myDriveContents}>
              {/* <div className={styles.topOpt}>
                <div>
                  <MdOutlineCreateNewFolder className={styles.icons} />
                  <p>New Folder</p>
                </div>
                <p style={{fontSize: "0.8rem"}}>Alt+C then F</p>
              </div> */}
              <div className={styles.folders}>
                <div className={styles.topOpt}>
                  <div>
                    <TbFileUpload className={styles.icons} />
                    <p style={{ fontSize: "1rem" }}>File upload</p>
                  </div>
                  <p style={{ fontSize: "0.8rem" }}>Alt+C then U</p>
                </div>
                {/* <div className={styles.topOpt}>
                  <div>
                    <MdDriveFolderUpload className={styles.icons} />
                    <p style={{fontSize: "1rem"}}>Folder upload</p>
                  </div>
                  <p style={{fontSize: "0.8rem"}}>Alt+C then I</p>
                </div> */}
              </div>
              {/* <div className={styles.googleCon}>
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
              </div> */}
            </div>
          ) : null}

          {showTypeDrop ? (
            <div className={styles.typeDropDown}>
              {/* <div>
                <div>
                  <PiFolderSimpleBold className={styles.folders} />
                </div>
                <p>Folders</p>
              </div> */}
              {/* <div>
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
              </div> */}
              <div
                onClick={() => {
                  setFilter("image");
                  setShowTypeDrop(!showTypeDrop);
                }}
              >
                <div>
                  <MdPhotoSizeSelectActual className={styles.typeIcons} />
                </div>

                <p>Photos & images</p>
              </div>
              <div
                onClick={() => {
                  setFilter("pdf");
                  setShowTypeDrop(!showTypeDrop);
                }}
              >
                <div>
                  <BiSolidFilePdf className={styles.typeIcons} />
                </div>

                <p>PDFs</p>
              </div>
              <div
                onClick={() => {
                  setFilter("video");
                  setShowTypeDrop(!showTypeDrop);
                }}
              >
                <div>
                  <MdMovieCreation className={styles.typeIcons} />
                </div>

                <p>Videos</p>
              </div>
              <div
                onClick={() => {
                  setFilter("archive");
                  setShowTypeDrop(!showTypeDrop);
                }}
              >
                <div>
                  <IoArchiveSharp className={styles.typeIcons} />
                </div>

                <p>Archives </p>
              </div>
              <div
                onClick={() => {
                  setFilter("audio");
                  setShowTypeDrop(!showTypeDrop);
                }}
              >
                <div>
                  <FaFileAudio className={styles.typeIcons} />
                </div>

                <p>Audio</p>
              </div>
              <div
                onClick={() => {
                  setFilter("drawing");
                  setShowTypeDrop(!showTypeDrop);
                }}
              >
                <div>
                  <RiShieldFlashFill className={styles.typeIcons} />
                </div>

                <p>Drawings</p>
              </div>
              {/* <div>
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
              </div> */}
              {/* <div>
              <img src="" alt="" />
              <p>Folders</p>
             </div> */}
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default MyDrive;
