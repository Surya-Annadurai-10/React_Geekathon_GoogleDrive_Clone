import React, { useEffect, useState } from "react";
import styles from "./Header.module.css";
import { IoMdImage, IoMdSearch, IoMdVideocam } from "react-icons/io";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { IoArchiveSharp, IoMenu, IoSettingsSharp } from "react-icons/io5";
import { SiGooglegemini } from "react-icons/si";
import { IoApps } from "react-icons/io5";
import { MdClear } from "react-icons/md";
import { useSelector } from "react-redux";
import Notification from "../Notification/Notification";
import Uploading from "../Uploading/Uploading";
import { toast, ToastContainer } from "react-toastify";
import Gemini from "../../Containers/Gemini";
import { AnimatePresence, motion } from "framer-motion";
import { BiSolidFilePdf } from "react-icons/bi";
import { FaFileAudio } from "react-icons/fa6";
import { RiShieldFlashFill } from "react-icons/ri";

const Header = (props) => {
  const userData = useSelector((state) => state.user.userData);
  const showNotification = useSelector((state) => state.user.showNotification);
  const showUploading = useSelector((state) => state.user.showUploading);
  const stateData = useSelector((state) => state.user.files);

  //  console.log(userData.photoURL);
  const [showGemini, setShowGemini] = useState(false);
  const [searchContent, setSearchContent] = useState("");

  const findIcons = (props) => {
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

  const filtered = (ele) => {
    let result = ele.filter((elem) =>
      elem.name.toLowerCase().includes(searchContent)
    );

    // ele.map(e => console.log("e.type" , e.type)
    // )
    return result;

    
    console.log("result", result);
  };

  return (
    <>

     <div className="">

     </div>

      <header className={styles.header}>
      
        <div className={styles.left_header}>
        <IoMenu onClick={() => props.setShowSideBar(!props.showSideBar)} className={styles.menu} />
          <img
            src="https://logodownload.org/wp-content/uploads/2020/04/google-drive-logo-0-1.png"
            alt=""
          />
          <h1>Drive</h1>
        </div>
        <div className={styles.middle_header}>
          <div className={styles.inputBox}>
            <IoMdSearch className={styles.searchBtn} role="button" />
            <input
              onChange={(e) => setSearchContent(e.target.value)}
              value={searchContent}
              type="text"
              placeholder={"Search in Drive"}
            />
            <MdClear onClick={() => setSearchContent("")} className={styles.clearBtn} role="button" />
            {/* <HiAdjustmentsHorizontal className={styles.sortBtn} role="button" /> */}
            {searchContent != "" ? (
              <div className={styles.searchContent}>
                {filtered(stateData).map((ele ,i ) => {
                  return (
                   <a className={styles.linkWrapper} href={ele.imageURL} target="_blank">
                     <div key={`${ele.id}_${i}`} className={styles.nameData}>
                    <div className={styles.nameBox}>
                    {findIcons(ele)}
                      {/* {console.log(ele.type)
                      } */}
                      
                        <p >{ele.name}</p>
                    
                    </div>

                      <div className={styles.dateData}>
                        <h1  style={{ fontSize: "0.9rem", color: "" }}>
                          {ele.lastModifiedDate.substring(4, 15)}
                        </h1>
                      </div>
                    </div>
                   </a>
                  );
                })}
              </div>
            ) : null}
          </div>
        </div>
        <div className={styles.right_header}>
          <AiOutlineQuestionCircle
            className={styles.rightIcons}
            role="button"
          />
          <IoSettingsSharp className={styles.rightIcons} role="button" />
          <SiGooglegemini
            onClick={() => setShowGemini(true)}
            className={styles.rightIcons}
            role="button"
          />
          <IoApps className={styles.rightIcons} role="button" />
          <div className={styles.profile_picture}>
            <img
              src={
                userData.photoURL
                  ? userData.photoURL
                  : "https://tse4.mm.bing.net/th?id=OIP.SAcV4rjQCseubnk32USHigHaHx&pid=Api&P=0&h=180"
              }
              alt=""
            />
          </div>
        </div>
      </header>

      {showNotification ? <ToastContainer /> : null}

      {showUploading ? <Uploading /> : null}

      <AnimatePresence
        initial={{
          scale: 0,
          y: -100,
          opacity: 0,
          duration: 1,
          ease: "easeInOut",
        }}
        aniamte={{
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: "easeInOut",
        }}
        exit={{
          scale: 0,
          y: 100,
          opacity: 0,
          duration: 1,
          ease: "easeInOut",
        }}
      >
        {showGemini ? (
          <div className="w-[100%] h-[100vh] left-0 bottom-0 top-0 right-0 bg-[#0000005a] z-[98] absolute">
            <motion.div
              drag
              dragConstraints={{ left: -100, right: 50, top: -40, bottom: 30 }}
              className="absolute left-[50%] transform -translate-y-[50%] -translate-x-[50%] top-[50%] z-[99] w-[85%] h-[80vh]  "
            >
              <MdClear
                onClick={() => setShowGemini(false)}
                className="absolute text-5xl p-2 top-0  z-[100] text-white right-0 text-2xl"
              />
              <Gemini />
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
    </>
  );
};

export default Header;
