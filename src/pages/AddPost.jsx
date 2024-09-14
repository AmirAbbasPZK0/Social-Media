import { useSelector } from "react-redux";
import useAsync from "../hooks/useAsync"
import {useForm} from 'react-hook-form'
import { useNavigate } from "react-router-dom";
import { data } from "jquery";

const AddPost = () => {

    const userId = useSelector(state => state?.user?.data?._id)

    const navigate = useNavigate()

    const {register , handleSubmit} = useForm()

    const {run , loading} = useAsync("api/posts" , "POST")

    const onSubmit = e => {
        
        const userData = {...e , author : userId}

        run(userData).then(() => {
            navigate("/")
            window.location.reload()
        })

    }

    return (<>
        <div className="flex items-center justify-center flex-col pt-6 pb-6">
            <div className="flex flex-col items-center justify-center">
                <form onSubmit={handleSubmit(onSubmit)} action="" className="flex items-center gap-4 flex-col pt-2 pb-2 rounded-md w-[400px] justfy-center bg-slate-200">
                    <h1 className='text-[40px]'>Add Post</h1>
                    <label htmlFor="">
                        <h3>Description</h3>
                        <textarea {...register("description" , {required : true})} placeholder='Description' className="p-3 w-[300px] rounded-md border-none" type="text" />
                    </label>
                    <button type='submit' disabled={loading} className="w-[300px] bg-blue-500 text-slate-200 hover:bg-slate-900 hover:text-slate-200 p-2 rounded-md transition">{
                        loading ? "Pending" : "Submit"
                    }</button>
                </form>
            </div>
        </div>
    </>);
}
 
export default AddPost;