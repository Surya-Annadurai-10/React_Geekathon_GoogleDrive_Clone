
import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Layout from './Containers/Layout/Layout'
import Home from './Components/Home/Home'

function App() {
 
  const router = createBrowserRouter([
    {
      element : <Layout />,
      children : [
        {
          path : "/" ,
          element : <Home />
        }
      ]
    }
  ])

  return (
   <>
     <RouterProvider router={router} />
   </>
  )
}

export default App
