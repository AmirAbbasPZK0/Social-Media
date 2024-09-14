import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Home from './pages/Home.jsx'
import {RouterProvider , createBrowserRouter} from "react-router-dom"
import SignUp from './pages/SignUp.jsx'
import LogIn from './pages/LogIn.jsx'
import { Provider } from 'react-redux'
import {store} from "./redux/store.js"
import About from './pages/About.jsx'
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from 'react-toastify'
import EditUser from './pages/EditUser.jsx'
import AddPost from './pages/AddPost.jsx'


const router = createBrowserRouter([
  {
    element : <App/>,
    children : [
      {
        element : <Home/>,
        path : "/"
      },
      {
        element : <About/>,
        path : "/about"
      },
      {
        element : <EditUser/>,
        path : "/edit-user"
      },
      {
        element : <AddPost/>,
        path : "/add-post"
      }
    ],
    
  },
  {
    element : <SignUp/>,
    path : "/signup"
  },
  {
    element : <LogIn/>,
    path : "/login"
  },
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <ToastContainer/>
    <RouterProvider router={router}/>
  </Provider>
)
