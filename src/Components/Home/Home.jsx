import React, { useEffect, useState } from 'react'
import styles  from './Home.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { firestore } from '../../firebase'
import { collection, getDocs } from 'firebase/firestore'
import {  spreadData } from '../../slices/userSlice'
 import loadingGif from "../../assets/loading.gif"
 import { IoMdCheckmark } from "react-icons/io";
 import { MdOutlineMenu } from "react-icons/md";
 import { TbLayoutGrid } from "react-icons/tb";
 import { FaChevronDown } from "react-icons/fa";
import Cards from '../Cards/Cards'

const Home = () => {
  const [baseData , setBaseData] = useState(null);
  const [loading , setLoading] = useState(true);

  const stateData = useSelector(state => state.user.files);
  const dispatch = useDispatch();
  const filesData = collection(firestore , "files")
  useEffect(() =>{
    
    const fetchData = async ()=>{
      try {
        const fetchedfiles = await getDocs(filesData)
    console.log(fetchedfiles.docs);
    const mappedData = fetchedfiles.docs.map((val) =>{
      return {id : val.id , ...val.data()}
    });
    setBaseData(mappedData)
      } catch (error) {
        console.log("Error while fetching data:" , error)
      }
    }
    fetchData();
   },[]);


  useEffect(() =>{

   if(baseData) {
    // console.log("baseData" , baseData)
    dispatch(spreadData(baseData));
    setLoading(false);
   };
    
  },[baseData])

  return (
   <>
      <div className={styles.homeCon}>
        <h2>Welcome to Drive</h2>

       {
        loading ?  <div className={styles.fetching}>
             <div>
             <img src={loadingGif} alt="loadingGif" />
             <p>Fetching data...</p>
             </div>
        </div> : <>
         <div className={styles.suggestedCon}>
          <div className={styles.suggested}>
          <FaChevronDown />
          <p>Suggested Files</p>
          </div>
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
         </div>
          <div className={styles.table}>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Reason suggested</th>
                  <th>Owner</th>
                  <th>Location</th>
                </tr>
              </thead>
              <tbody>
                {
                  stateData.map((ele) =>{
                    return <Cards key={ele.id} {...ele} />
                    
                  })
                }
              </tbody>
            </table>
          </div>
        </>
       }

        {/* <div className={styles.upload}>
        <img src="https://tse3.mm.bing.net/th?id=OIP.Ju2Cdusxkkaq5S3N77uhNAHaEK&pid=Api&P=0&h=180" alt="upload-Image" />
        <p>Drag your files and folders here or use 'New' button to upload</p>
        
        </div> */}
      </div>
     
   </>
  )
}

export default Home