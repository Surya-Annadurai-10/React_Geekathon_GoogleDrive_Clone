import React, { useState } from 'react'
import styles from './AddNewPopUp.module.css'
import { storage } from '../../firebase';
import { ref, uploadBytes } from 'firebase/storage';
import {v4} from 'uuid'
import { useDispatch } from 'react-redux';
import { addInFiles } from '../../slices/userSlice';

const AddNewPopUp = () => {
    const dispatch = useDispatch();
    const [imageUpload , setImageUpload] = useState(null);

    const onUpload = (e) =>{
      setImageUpload(e.target.files[0]);
        
    }

    const handleSubmit = async(e) =>{
    e.preventDefault();
    console.log(imageUpload);
    const imageRef = ref(storage , `files/${imageUpload.name + v4()}`);
    const res = await uploadBytes(imageRef , imageUpload)
    // dispatch(addInFiles())
     
    }
  return (
    <>
   <div className={styles.container}>
       <form onSubmit={handleSubmit}>
        <h2>Select the file you want to upload</h2>
        <div className={styles.input_box}>
        <input type="file" onChange={(e) => onUpload(e)}/>

        </div>
        <button>Submit</button>
       </form>
        
    </div>
    </>
  )
}

export default AddNewPopUp