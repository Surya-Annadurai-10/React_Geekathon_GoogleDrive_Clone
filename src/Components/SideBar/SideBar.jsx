import React, { useState } from "react";
import styles from "./SideBar.module.css";
import { FaPlus } from "react-icons/fa6";
import { GoHome  } from "react-icons/go";
import { RiHardDrive3Line  } from "react-icons/ri";
import { BsLaptop } from "react-icons/bs";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { FaRegClock } from "react-icons/fa6";
import { IoMdStarOutline } from "react-icons/io";
import { RiSpam2Line } from "react-icons/ri";
import { ImBin } from "react-icons/im";
import { IoIosCloudOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import AddNewPopUp from "../AddNewPopUp/AddNewPopUp";

const SideBar = () => {
  const [showNewAdd , setShowNewAdd] = useState(false);

  return (
    <>
      <div className={styles.sidebarCon}>
        <div onClick={() => setShowNewAdd(true)} className={styles.new}>
          <FaPlus className={styles.plus} />
          <h3>New</h3>
        </div>
        <div className={styles.link_con}>
          <Link to={"/home"} className={styles.home}>
            <GoHome  className={styles.home_logo} />
            <p>Home</p>
          </Link>
          <Link to={"/mydrive"} className={styles.home}>
            <RiHardDrive3Line   className={styles.home_logo}/>
            <p>My Drive</p>
          </Link>
          <Link to={"/computers"} className={styles.home}>
            <BsLaptop   className={styles.home_logo}/>
            <p>Computers</p>
          </Link>

        </div>
        <div  className={styles.link_con}>
          <Link to={"/sharedwithme"} className={styles.home}>
            <MdOutlinePeopleAlt className={styles.home_logo} />
            <p>Shared with me</p>
          </Link>
          <Link to={"/recent"} className={styles.home}>
            <FaRegClock  className={styles.home_logo}/>
            <p>Recent</p>
          </Link>
          <Link to={"/starred"} className={styles.home}>
            <IoMdStarOutline   className={styles.home_logo}/>
            <p>Starred</p>
          </Link>
          
        </div>
        <div  className={styles.link_con}>
          <Link to={"/spam"} className={styles.home}>
            <RiSpam2Line  className={styles.home_logo}/>
            <p>Spam</p>
          </Link>
          <Link to={"/bin"} className={styles.home}>
            <ImBin  className={styles.home_logo}/>
            <p>Bin</p>
          </Link>
          <Link to={"/storage"} className={styles.home}>
            <IoIosCloudOutline  className={styles.home_logo}/>
            <p>Storage</p>
          </Link>
          <div className={styles.progressBarCon}>
          <progress className={styles.progressBar} value={"10"} max={"100"}></progress>
          <p>1.06 GB of 15 GB used </p>
        </div>
          <div className={styles.getCon} >
              <button className={styles.get}>Get more storage</button>
          </div>
        </div>
        
        {
          showNewAdd ? <AddNewPopUp showNewAdd = {showNewAdd} setShowNewAdd={setShowNewAdd} /> : null
        }
       
      </div>
    </>
  );
};

export default SideBar;
