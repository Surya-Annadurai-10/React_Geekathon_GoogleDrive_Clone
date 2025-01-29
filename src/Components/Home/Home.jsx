import React, { useEffect } from 'react'
import styles  from './Home.module.css'
import { useSelector } from 'react-redux'
import { firestore } from '../../firebase'
import { collection, getDoc } from 'firebase/firestore'
const Home = () => {

  const stateData = useSelector(state => state.files);
  const filesData = collection(firestore , "files")
  // useEffect(() =>{
  //     async 
  // })

  return (
   <>
      <div className={styles.homeCon}>
        <h2>Welcome to Drive</h2>

        <div className={styles.upload}>
        <img src="https://tse3.mm.bing.net/th?id=OIP.Ju2Cdusxkkaq5S3N77uhNAHaEK&pid=Api&P=0&h=180" alt="upload-Image" />
        <p>Drag your files and folders here or use 'New' button to upload</p>
        
      </div>
      </div>
     
   </>
  )
}

export default Home