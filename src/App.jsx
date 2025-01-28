
import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Layout from './Containers/Layout/Layout'
import Home from './Components/Home/Home'
import MyDrive from './Components/MyDrive/MyDrive'
import Computers from './Components/Computers/Computers'
import SharedWithMe from './Components/SharedWithMe/SharedWithMe'
import Recent from './Components/Recent/Recent'
import Starred from './Components/Starred/Starred'
import Spam from './Components/Spam/Spam'
import Bin from './Components/Bin/Bin'
import Storage from './Components/Storage/Storage'
import Login from './Containers/Login/Login'
import { Provider } from 'react-redux'
import { store } from './store'

function App() {
 
  const router = createBrowserRouter([
    {
      path : "/",
      element : <Login />
    },
    {
      
      element : <Layout />,
      children : [
        {
          path : "/home" ,
          element : <Home />
        },
        {
          path : "/mydrive" ,
          element : <MyDrive />
        },
        {
          path : "/computers" ,
          element : <Computers />
        },
        {
          path : "/sharedwithme" ,
          element : <SharedWithMe />
        },
        {
          path : "/recent" ,
          element : <Recent />
        },
        {
          path : "/starred" ,
          element : <Starred />
        },
        {
          path : "/spam" ,
          element : <Spam />
        },
        {
          path : "/bin" ,
          element : <Bin />
        },
        {
          path : "/storage" ,
          element : <Storage />
        }
      ]
    }
  ])

  return (
   <>
   <Provider store={store}>
      <RouterProvider router={router} />
   </Provider>
   </>
  )
}

export default App
