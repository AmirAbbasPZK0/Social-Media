import { useState } from 'react'
import io from 'socket.io-client'
import {useSelector} from 'react-redux'

const socket = io.connect("http://localhost:8000")

const Chat = () => {

    const [messagesList , setMessagesList] = useState([])
    const [message , setMessage] = useState("")
    
    const userData = useSelector(state => state.user.data)

    socket.on("server_message" , data => {
        if(socket.id === data.user_id){
            setMessagesList([...messagesList , {...data , isForYou : true}])
            console.log(messagesList)
        }else{
            setMessagesList([...messagesList , {...data , isForYou : false}])
            console.log(messagesList)
        }
    })

    const sendMessage = () => {
        if(message === ""){
            return false
        }else{
            socket.emit("client_message" , {message , username : userData.username , profile : userData.profile})
        }
        setMessage("")
    }

    return (<>
        <div className='flex flex-end flex-col justify-end w-[100%]'>
            <div className=' items-end w-[100%]'>
                <div className='flex flex-col justify-end absolute items-end w-[60%]'>
                    {messagesList.map(item => {
                        return item.isForYou ? (<>
                            <div className='flex flex-col p-3 m-2 w-[50%] text-start rounded-md bg-blue-400'>
                                <h1>You</h1>
                                <p>{item.message}</p>
                            </div>
                        </>) : (<>
                            <div className='flex flex-col p-3 m-2 w-[50%] text-white text-start rounded-md bg-blue-800'>
                                <h1><img src={item.profile} className='w-[40px] h-[40px] rounded-full' alt="" />
                                {item.username}
                                </h1>
                                <p>{item.message}</p>
                            </div>
                        </>)
                    })}
                </div>
            </div>
            <div className='flex items-end h-[90vh] w-[100%] justify-end' >
                <div className='flex items-end h-[90vh] w-[79%] justify-center bottom-0'>
                    <input value={message} onChange={e => setMessage(e.target.value)} placeholder='Message...' className='border-2  items-start w-[80%] border-slate-500 p-4 rounded-md' type="text" />
                    <button onClick={sendMessage} className='mb-1 rounded-md ml-1 p-4 transition hover:bg-slate-900 bg-slate-500 text-slate-50'>Submit</button>
                </div>
            </div>
        </div>
    </>);
}
 
export default Chat;