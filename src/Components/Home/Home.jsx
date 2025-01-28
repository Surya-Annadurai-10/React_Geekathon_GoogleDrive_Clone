import React from 'react'
import styles  from './Home.module.css'

const Home = () => {
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