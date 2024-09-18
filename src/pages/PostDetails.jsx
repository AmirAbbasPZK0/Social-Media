import { useEffect } from 'react'
import useAsync from '../hooks/useAsync'
import {useParams} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {useForm} from 'react-hook-form'


const PostDetails = () => {

    const {id} = useParams()

    const {run , data , loading} = useAsync(`api/posts/${id}` , "GET")
    const {run : addComment , loading : commentLoading} = useAsync(`api/comments/${id}` , "POST")
    
    const userId = useSelector(state => state?.user?.data?._id)

    const mainData = data?.data

    console.log(mainData)

    const {register , handleSubmit} = useForm()

    const onSubmit = e => {
        const data = {...e , author : userId}
        addComment(data).then(res => {
            window.location.reload()
        })
    }

    useEffect(()=>{
        run()
    },[])


    if(loading)
        return <div>Loading...</div>

    return (<>
        <div className='p-14 flex items-center flex-col justify-start'>
            <div className='flex items-center flex-row justify-between gap-2'>
                <img className='w-[90px] h-[90px] rounded-full' src={mainData?.author?.profile} alt="" />
                <h1 className='text-[2rem] font-bold'>{mainData?.author?.username}</h1>
            </div>
            <div className='p-4 gap-4 flex items-center justify-center flex-col w-[700px] text-center'>
                <p>{mainData?.description}</p>
                <span className='text-slate-500'>{new Date(mainData?.createdAt).toLocaleString()}</span>
            </div>
            <hr />
            <div className='flex flex-col gap-2'>
                <h3 className='font-semibold text-[40px]'>Comments</h3>
                <ul className='flex flex-col items-start gap-5'>
                    {mainData?.comments?.map((item , index) => (
                        <li key={index} className='flex gap-5 flex-col justify-center items-start'>
                            <h5 className='flex flex-row justify-center items-center gap-3'>
                                <img src={item?.author?.profile} className='w-[50px] h-[50px] rounded-full' alt="" srcset="" /> <span className='font-semibold'>{item?.author?.username}</span>
                            </h5>
                            <p className='text-[20px]'>{item.description}</p>
                            <span className='text-slate-400'>{new Date(item.createdAt).toLocaleString()}</span>
                            <hr />
                        </li>
                    ))}
                </ul>
                <hr />
                <div className='flex flex-col'>
                    <h1 className='text-[30px]'>Add Comment</h1>
                    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col p-2 gap-4' action="">
                        <input {...register("description" , {required : true})} type="text" className='w-[500px] border-2 border-solid-200 p-4 rounded-md'/>
                        <button className='rounded-md bg-blue-500 hover:bg-blue-700 text-white w-[100px] p-2 transition' type='submit'>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    </>);
}
 
export default PostDetails;