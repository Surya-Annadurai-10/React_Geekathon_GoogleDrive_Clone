import React, { useEffect, useState } from "react";
import styles from "./Layout.module.css";
import Header from "../../Components/Header/Header";
import SideBar from "../../Components/SideBar/SideBar";
import { Outlet, useNavigate } from "react-router-dom";
import RightSideBar from "../../Components/RightSideBar/RightSideBar";
import PopupRight from "../../Components/PopupRight/PopupRight";
import { useDispatch } from "react-redux";
import { addUser } from "../../slices/userSlice";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../firebase";
import { ToastContainer } from "react-toastify";

const Layout = () => {
  const [showPopupRight, setShowPopupRight] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [imageUpload, setImageUpload] = useState(null);
  const filesData = collection(firestore, "files");
  //  const fileDataRef = collection(firestore , "files");
  const binData = collection(firestore, "bin");
  const starredData = collection(firestore, "starred");
  const [baseData, setBaseData] = useState(null);
  const [BinBaseData, setBinBaseData] = useState(null);
  const [starredBaseData, setStarredBinBaseData] = useState(null);
  const [getData, setGetData] = useState(false);

  //  useEffect(() =>{
  //   const fetchData = async ()=>{
  //     try {
  //       const fetchedfiles = await getDocs(filesData)
  //       const filesFromBin = await getDocs(binData)
  //       const filesFromStarred = await getDocs(starredData)
  //       const mappedData = fetchedfiles.docs.map((val) =>{
  //     console.log("val.id :" , val.id);

  //     return { ...val.data(),id : val.id }
  //   });

  //   const mappedDataBin = filesFromBin.docs.map((val) =>{
  //     console.log("val.id :" , val.id);

  //     return { ...val.data(),id : val.id }
  //   });
  //   const mappedDataStarred = filesFromStarred.docs.map((val) =>{
  //     console.log("val.id :" , val.id);

  //     return { ...val.data(),id : val.id }
  //   });
  //   setBaseData(mappedData)
  //   setBinBaseData(mappedDataBin)
  //   setStarredBinBaseData(mappedDataStarred)
  //     } catch (error) {
  //       console.log("Error while fetching data:" , error)
  //     }
  //     setGetData(false);
  // }

  //   if(getData){

  //       fetchData();

  //   }
  //  },[])

  //  useEffect(() =>{

  //   if(starredBaseData) {
  //    dispatch(spreadDataStarred(starredBaseData));
  //   //  setLoading(false);
  //   };

  //  },[starredBaseData])

  // useEffect(() =>{

  //  if(baseData) {
  //   dispatch(spreadData(baseData));

  //  };

  // },[baseData])

  // useEffect(() =>{

  //   if(BinBaseData) {
  //    dispatch(spreadDataBin(BinBaseData));

  //   };

  //  },[BinBaseData])

  const [showCalender, setShowCalender] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [showTask, setShowTask] = useState(false);
  const [showContacts, setShowContacts] = useState(false);
  const [showSideBar , setShowSideBar] = useState(true);

  useEffect(() => {
    let userDetails = localStorage.getItem("user");

    if (userDetails) {
      userDetails = JSON.parse(userDetails);
      dispatch(addUser(userDetails));
      navigate("/home");
    } else {
      navigate("/");
    }
  }, []);

  return (
    <div className={styles.parentMain}>
      <div className={styles.layoutLeft}>
        <ToastContainer />
        <Header showSideBar={showSideBar} setShowSideBar={setShowSideBar}/>
        <div className={styles.mainCon}>
          <SideBar setShowSideBar={setShowSideBar} showSideBar={showSideBar} />
          <Outlet showSideBar={showSideBar} setShowSideBar={setShowSideBar}/>
          <RightSideBar
            setShowContacts={setShowContacts}
            showContacts={showContacts}
            showCalender={showCalender}
            showNotes={showNotes}
            showTask={showTask}
            setShowCalender={setShowCalender}
            setShowNotes={setShowNotes}
            setShowTask={setShowTask}
            showPopupRight={showPopupRight}
            setShowPopupRight={setShowPopupRight}
          />
        </div>
      </div>
      {showPopupRight ? (
        <PopupRight
          showContacts={showContacts}
          setShowContacts={setShowContacts}
          showCalender={showCalender}
          showNotes={showNotes}
          showTask={showTask}
          setShowCalender={setShowCalender}
          setShowNotes={setShowNotes}
          setShowTask={setShowTask}
          showPopupRight={showPopupRight}
          setShowPopupRight={setShowPopupRight}
        />
      ) : null}
    </div>
  );
};

export default Layout;
