import { Navigate, Outlet } from 'react-router-dom'
import useAsync from './hooks/useAsync';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginHandler } from './redux/userReducer';
import SlideBar from './components/SliderBar';
import { useDispatch , useSelector} from 'react-redux';
import {tabHandler} from "./redux/tabReducer"


const App = () => {

  const token = JSON.parse(localStorage.getItem("token"))

  const navigate = useNavigate()

  const isOpen = useSelector(state => state.tab.isOpen)

  const dispatch = useDispatch()

  useEffect(()=>{
    if(token){
      fetch(`http://localhost:8000/api/auth/me` , {
        method : "GET",
        headers : {
          "Content-Type" : "application/json",
          "Authorization" : `${token}`
        }
      }).then(res => {
        return res.json()
      }).then(data => {
        dispatch(loginHandler(data))
      })
    }else{
      navigate("/login")
    }
  },[])

  return (<>
    <div>
      <div className='flex items-center'>
        <button className='rounded-md p-3 sticky z-999 bg-slate-600 text-white' onClick={()=>{
          dispatch(tabHandler())
        }}>Open</button>
      </div>
    {isOpen && (
      <SlideBar/>
    )}
    <Outlet/>
    </div>
  </>);
}
 
export default App;