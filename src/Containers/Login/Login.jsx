import React from 'react'
import styles from './Login.module.css'
import { signInWithPopup } from 'firebase/auth'
import { auth, googleAuthProvider } from '../../firebase'
import hero from "../../assets/hero.png"
import { useNavigate } from 'react-router-dom'
import {useDispatch} from "react-redux"
import { addUser } from '../../slices/userSlice'

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async() =>{
        try {
            const res = await signInWithPopup(auth,googleAuthProvider);
            console.log(res.user);
            const user = {
                name : res.user.displayName,
                email : res.user.email,
                photoURL : res.user.photoURL,
                uid : res.user.uid
            }
            

           console.log(user);
           dispatch(addUser(user));
           
           navigate("/home")
            
        } catch (error) {
            console.log("ERROR WHILE TRYING TO LOGIN :" ,error)
        }
    }



  return (
    <div className={styles.LoginCon}>
        <header className={styles.loginHead}>
            <div>
               <div className={styles.img_box}>
               <img src="https://www.pngall.com/wp-content/uploads/9/Google-Drive-Logo-Transparent.png" alt="" />
               </div>
                <h2>Drive</h2>
            </div>
            <div>
                <button onClick={handleLogin}>
                    <img src="https://cdn.freebiesupply.com/logos/large/2x/google-g-2015-logo-png-transparent.png" alt="" />
                    <p>Login with Google</p>
                </button>
            </div>
        </header>
        <main className={styles.main}>
            <div className={styles.login_left}>
                <div className={styles.inner}>
                <h1>
                 Easy and secure access to your content
                 </h1>
                 <p>Store, share, and collaborate on files and folders from your mobile device, tablet, or computer</p>
                 <div >
                <button onClick={handleLogin} className={styles.loginBtn}>
                    <img className={styles.google_img} src="https://cdn.freebiesupply.com/logos/large/2x/google-g-2015-logo-png-transparent.png" alt="" />
                    <span>Login with Google</span>
                </button>
            </div>
                </div>
            
            </div>
            <div  className={styles.login_right}>
                <img src="https://gdisk.vercel.app/landing-splash.jpg" alt="" />
            </div>
        </main>
        {/* <button onClick={handleLogin}>Login with Google</button> */}
        {/* <button  onClick={handleLogin}>
             <img src="https://i0.wp.com/nanophorm.com/wp-content/uploads/2018/04/google-logo-icon-PNG-Transparent-Background.png?fit=1000%2C1000&ssl=1" alt="" />
             <p>Login with Google</p>
        </button> */}
    </div>
  )
}

export default Login