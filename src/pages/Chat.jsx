import { useState } from 'react'
import io from 'socket.io-client'

const socket = io.connect("http://localhost:8000")

const Chat = () => {

    const [messagesList , setMessagesList] = useState([])
    const [message , setMessage] = useState("")

    socket.on("server_message" , data => {
        console.log(data)
    })

    const sendMessage = () => {
        setMessagesList([...messagesList , message])
    }

    return (<>
        <div className='flex flex-end flex-col justify-end w-[100%]'>
            <div className=' items-end w-[100%]'>
                <div className='flex justify-end absolute items-end w-[60%]'>
                    {messagesList.map(item => (
                        <div className='p-3 m-2 w-[50%] rounded-md bg-blue-400'>
                            {item}
                        </div>
                    ))}
                </div>
            </div>
            <div className='flex items-end h-[90vh] w-[100%] justify-end' >
                <div className='flex items-end h-[90vh] w-[79%] justify-center bottom-0'>
                    <input onChange={e => setMessage(e.target.value)} placeholder='Message...' className='border-2  items-start w-[80%] border-slate-500 p-4 rounded-md' type="text" />
                    <button onClick={sendMessage} className='mb-1 rounded-md ml-1 p-4 bg-slate-900 text-slate-50'>Submit</button>
                </div>
            </div>
        </div>
    </>);
}
 
export default Chat;